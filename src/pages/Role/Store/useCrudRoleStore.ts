import { useToast } from '@/composables/useToast';
import IPromise from '@/interfaces/Axios/IPromise';
import type IFormRole from "@/pages/Role/Interfaces/IRoleForm";
import type IRoleList from "@/pages/Role/Interfaces/IRoleList";
import axiosIns from '@/plugins/axios';
import { usePreloadStore } from '@/stores/usePreloadStore';
import { defineStore } from 'pinia';
const toast = useToast()

export const useCrudRoleStore = defineStore('useCrudRoleStore', {
  state: () => ({
    loading: true as boolean,
    action: "list" as string,
    typeAction: "list" as string,
    roleData: {} as IFormRole,
    keyList: 0 as number,
    roles: [] as Array<IRoleList>,
    totalData: 0 as number,
    totalPage: 0 as number,
    currentPage: 1 as number,
    lastPage: 0 as number,
    arrayMenus: [] as Array<object>,
    formulario: {
      name: "",
      description: "",
      pageInitial: "",
      permissions: []
    } as IFormRole,
  }),
  getters: {
  },
  actions: {
    clearFormulario() {
      this.roleData = <IFormRole>{
        name: "",
        description: "",
      }
      this.formulario = <IFormRole>{
        id: null,
        name: "",
        description: "",
        pageInitial: "",
        permissions: []
      }
      this.resetArrayMenus()
    },

    async fetchAll(params: object): Promise<void> {
      this.loading = true
      await axiosIns
        .post("/role-list", params)
        .then((result) => {
          this.loading = false
          this.roles = result.data.roles;
          this.totalData = result.data.totalData;
          this.totalPage = result.data.totalPage;
          this.currentPage = result.data.currentPage;
          this.lastPage = result.data.lastPage
        })
        .catch(async (error) => {
          this.loading = false
          console.log(await error);
        });
    },

    async fetchDataForm(): Promise<void> {
      const preload = usePreloadStore()
      preload.isLoading = true
      await axiosIns
        .get("/role-dataForm")
        .then((result) => {
          preload.isLoading = false
          this.arrayMenus = result.data.menus;
        })
        .catch(async (error) => {
          preload.isLoading = false
          console.log(await error);
        });
    },

    async fetchSave(): Promise<IPromise> {
      const preload = usePreloadStore()
      preload.isLoading = true
      return await axiosIns
        .post("/role-create", this.formulario)
        .then((result) => {
          preload.isLoading = false
          if (result.data.code === 200)
            toast.toast("Éxito", result.data.message, "success");
          else
            toast.toast("Error", result.data.message, "danger");

          return { message: result.data.message, code: result.data.code, errors: result.data?.errors };
        })
        .catch(async (error) => {
          preload.isLoading = false
          console.log(await error);
          if (error.response.state === 500)
            toast.toast("Error", error.response.data.message, "danger");

          return { errors: error.response.data.errors, code: error.response.data.code, message: error.response.data.message };
        });

    },

    async fetchDelete(id: number): Promise<number> {
      const preload = usePreloadStore()
      preload.isLoading = true
      const response = await axiosIns
        .delete(`/role-delete/${id}`)
        .then((result) => {
          preload.isLoading = false
          if (result.data.code === 200) {
            toast.toast("Éxito", result.data.message, "success");
          }

          if (result.data.code === 500)
            toast.toast("Error", result.data.message, "danger");

          return result.data.code;
        })
        .catch(async (error) => {
          preload.isLoading = false
          console.log(await error);
          if (error.response.state === 500)
            toast.toast("Error", error.response.data.message, "danger");

          return error.response.state;
        });

      return await response;
    },

    resetArrayMenus() {
      for (let index = 0; index < this.arrayMenus.length; index++) {
        for (let j = 0; j < this.arrayMenus[index].permissions.length; j++) {
          this.arrayMenus[index].permissions[j].estado = null;
        }
      }
    },
    loadCheckPermissions() {
      for (let index = 0; index < this.arrayMenus.length; index++) {
        for (let j = 0; j < this.arrayMenus[index].permissions.length; j++) {
          for (let z = 0; z < this.formulario.permissions.length; z++) {
            if (this.formulario.permissions.includes(this.arrayMenus[index].permissions[j].id)) {
              this.arrayMenus[index].permissions[j].estado = "Activo";
            }
          }
        }
      }
    },
    async fetchInfo(id: number): Promise<void> {
      const preload = usePreloadStore()
      preload.isLoading = true
      await axiosIns
        .get(`/role-info/${id}`)
        .then(async (result) => {
          preload.isLoading = false
          this.formulario = await result.data.data;
          this.roleData.id = id
          this.loadCheckPermissions()
        })
        .catch(async (error) => {
          preload.isLoading = false
          console.log(await error);
        });

    }
  },
})

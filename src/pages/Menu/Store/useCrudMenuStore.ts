import { useToast } from "@/composables/useToast";
import IMenuForm from "@/interfaces/Admin/Menu/IMenuForm";
import IMenuList from "@/interfaces/Admin/Menu/IMenuList";
import IPromise from "@/interfaces/Axios/IPromise";
import axiosIns from "@/plugins/axios";
import { usePreloadStore } from "@/stores/usePreloadStore";
import { defineStore } from "pinia";
const toast = useToast();

export const useCrudMenuStore = defineStore("useCrudMenuStore", {
  state: () => ({
    loading: true as boolean,
    action: "list" as string,
    typeAction: "list" as string,
    menuData: {} as IMenuForm,
    keyList: 0 as number,
    menus: [] as Array<IMenuList>,
    totalData: 0 as number,
    totalPage: 0 as number,
    currentPage: 1 as number,
    lastPage: 0 as number,
    formulario: {
      title: "",
      to: "",
      icon: "",
      requiredPermission: "",
    } as IMenuForm,
  }),
  getters: {},
  actions: {
    clearFormulario() {
      this.formulario = <IMenuForm>{
        title: "",
        to: "",
        icon: "",
        requiredPermission: "",
      };
    },
    clonarForm() {
      for (const key in this.formulario) {
        this.menuData[key] = this.formulario[key];
      }
    },
    async fetchAll(params: object): Promise<void> {
      this.loading = true;
      await axiosIns
        .post("/menu-list", params)
        .then((result) => {
          this.loading = false;
          this.menus = result.data.menu;
          this.totalData = result.data.totalData;
          this.totalPage = result.data.totalPage;
          this.currentPage = result.data.currentPage;
          this.lastPage = result.data.lastPage
        })
        .catch(async (error) => {
          this.loading = false;
          console.log(await error);
        });
    },

    async fetchSave(): Promise<IPromise> {
      const preload = usePreloadStore();
      preload.isLoading = true;
      return await axiosIns
        .post("/menu-create", this.formulario)
        .then((result) => {
          preload.isLoading = false;
          if (result.data.code === 200) {
            this.clonarForm();
            this.clearFormulario();
            toast.toast("Éxito", result.data.message, "success");
          }
          else
            toast.toast("Error", result.data.message, "danger");
          return { message: result.data.message, code: result.data.code, errors: result.data.errors };
        })
        .catch(async (error) => {
          preload.isLoading = false;
          if (error.response.status === 500)
            toast.toast("Error", error.response.data.message, "danger");
          console.log(await error);
          return { errors: error.response.data.errors, code: error.response.data.code, message: error.response.data.message };
        });
    },

    async fetchDelete(id: number): Promise<void> {
      const preload = usePreloadStore();
      preload.isLoading = true;
      await axiosIns
        .delete("/menu-delete/" + id)
        .then((result) => {
          preload.isLoading = false;
          toast.toast("Éxito", result.data.message, "success");
        })
        .catch(async (error) => {
          preload.isLoading = false;
          console.log(await error);
        });
    },

    async fetchInfo(id: number): Promise<void> {
      const preload = usePreloadStore();
      if (id !== this.menuData.id) {
        preload.isLoading = true;
        await axiosIns
          .get(`/menu-info/${id}`)
          .then(async (result) => {
            preload.isLoading = false;
            this.menuData.id = id;
            this.formulario = await result.data.data;
            this.clonarForm();
          })
          .catch(async (error) => {
            preload.isLoading = false;
            console.log(await error);
          });
      } else {
        for (const key in this.menuData) {
          this.formulario[key] = this.menuData[key];
        }
      }
    },
  },
});

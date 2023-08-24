import { useToast } from "@/composables/useToast";
import IPromise from "@/interfaces/Axios/IPromise";
import IForm from "@/pages/DynamicMenuPage/Interfaces/IForm";
import IList from "@/pages/DynamicMenuPage/Interfaces/IList";
import axiosIns from "@/plugins/axios";
import { usePreloadStore } from "@/stores/usePreloadStore";
import { defineStore } from "pinia";
import Swal from "sweetalert2";
const toast = useToast();

export const useCrudDynamicMenuPageStore = defineStore("useCrudDynamicMenuPageStore", {
  state: () => ({
    loading: true as boolean,
    typeAction: "list" as string,
    action: "list" as string,
    menuData: {} as IForm,
    keyList: 0 as number,
    menus: [] as Array<IList>,
    totalData: 0 as number,
    totalPage: 0 as number,
    currentPage: 1 as number,
    lastPage: 0 as number,
    formulario: {
      title: null,
      icon: null,
      principal: false,
      father_id: null,
    } as IForm,
  }),
  getters: {},
  actions: {
    clearFormulario() {
      this.formulario = <IForm>{
        title: null,
        icon: null,
        principal: false,
        father_id: null,
      };
    },
    async fetchAll(params: object): Promise<void> {
      this.loading = true;
      await axiosIns
        .post("/dynamicMenuPage-list", params)
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
        .post("/dynamicMenuPage-create", this.formulario)
        .then((result) => {
          preload.isLoading = false;
          if (result.data.code === 200) {
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
        .delete("/dynamicMenuPage-delete/" + id)
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
      preload.isLoading = true;
      await axiosIns
        .get(`/dynamicMenuPage-info/${id}`)
        .then(async (result) => {
          preload.isLoading = false;
          this.menuData.id = id;
          this.formulario = await result.data.data;
        })
        .catch(async (error) => {
          preload.isLoading = false;
          console.log(await error);
        });

    },
    async principal(): Promise<object> {
      return await axiosIns
        .get(`/dynamicMenuPage-principal`)
        .then(async (result) => {
          return await result.data;
        })
        .catch(async (error) => {
          console.log(await error);
        });

    },

    changeState(objeto: object, estado: number) {
      const preload = usePreloadStore()
      let t = "";
      estado == 0 ? (t = "activar") : (t = "inactivar");
      Swal.fire({
        title: "¿Está seguro de " + t + " el Registro seleccionado?",
        showDenyButton: true,
        confirmButtonText: "Si",
        denyButtonText: `No`,
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          preload.isLoading = true
          axiosIns.post("/dynamicMenuPage-changeState", objeto)
            .then((res) => {
              preload.isLoading = false
              if (res.data.code == 200) {
                toast.toast("Éxito", res.data.msg, "success");
              }
              if (res.data.code == 500) {
                toast.toast("Éxito", res.data.msg, "danger");
              }
            });
        } else {
          t == 'activar' ? objeto.state = 0 : objeto.state = 1;
        }

      });
    },
  },
});

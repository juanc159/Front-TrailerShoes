import { defineStore } from "pinia";

import axiosIns from "@/plugins/axios";

import { useToast } from "@/composables/useToast";
import type IAuth from "@/interfaces/Authentication/IAuth";
import type ILogin from "@/interfaces/Authentication/ILogin";
import type IRegister from "@/interfaces/Authentication/IRegister";
import IPromise from "@/interfaces/Axios/IPromise";
import { usePreloadStore } from '@/stores/usePreloadStore';
import IUserForm from "@/pages/User/Interfaces/IUserForm";

const toast = useToast();

export const useAuthenticationStore = defineStore("useAuthenticationStore", {
  state: () => ({
    isAuthenticate: false as boolean,
    token: "" as string,
    user: {} as IAuth,
    menu: [],
    company: [],
    permissions: [],
    identityTypes: [] as Array<object>,
  }),
  persist: true,
  getters: {
    getMenuData: (state) => {
      /****  Filtrar menu USUARIOS Y ROLES ***********/
      return state.menu;
    },
  },
  actions: {
    async logout(): Promise<void> {
      this.$reset();
    },
    async login(formulario: ILogin): Promise<IPromise> {
      const preload = usePreloadStore()
      preload.isLoading = true
      return await axiosIns
        .post("/login", formulario)
        .then((result) => {
          preload.isLoading = false
          this.isAuthenticate = true;
          this.user = result.data.user;
          this.menu = result.data.menu;
          this.company = result.data.aCompany;
          this.permissions = result.data.permissions;
          this.token = result.data.token;

          toast.toast("Éxito", result.data.message, "success");

          return { message: result.data.message, code: result.data.code };
        })
        .catch((error) => {
          preload.isLoading = false
          console.log(error);
          this.$reset();
          toast.toast("Error", error.response.data.message, "danger");
          return { errors: error.response.data.errors, code: error.response.data.code, message: error.response.data.message };
        });
    },


    async fetchDataForm(): Promise<void> {
      const preload = usePreloadStore()
      preload.isLoading = true
      await axiosIns
        .post("/dataForm")
        .then((result) => {
          preload.isLoading = false
          this.identityTypes = result.data.identityTypes;
        })
        .catch(async (error) => {
          preload.isLoading = false
          console.log(await error);
        });
    },

    async register(formulario: IRegister): Promise<IPromise> {
      const preload = usePreloadStore()
      preload.isLoading = true
      return await axiosIns
        .post("/register", formulario)
        .then((result) => {
          preload.isLoading = false
          if (result.data.code === 200)
            toast.toast("Éxito", result.data.message, "success");
          else
            toast.toast("Error", result.data.message, "danger");

          return { message: result.data.message, code: result.data.code };
        })
        .catch(async (error) => {
          preload.isLoading = false
          if (error.response.status === 500)
            toast.toast("Error", error.response.data.message, "danger");
          console.log(await error);

          return { errors: error.response.data.errors, code: error.response.data.code, message: error.response.data.message };
        });
    },
    async fetchUserAuthenticated(): Promise<void> {
      const preload = usePreloadStore()
      preload.isLoading = true
      return await axiosIns.get('/get-user')
        .then((result) => {
          preload.isLoading = false
          this.user = result.data.user
        })
        .catch(async (error) => {
          preload.isLoading = false
          console.log(await error);
        });
    },
  },
});

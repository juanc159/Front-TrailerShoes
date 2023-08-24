import { useToast } from '@/composables/useToast';
import IPromise from '@/interfaces/Axios/IPromise';
import type IUserForm from '@/pages/User/Interfaces/IUserForm';
import type IUserList from '@/pages/User/Interfaces/IUserList';
import axiosIns from '@/plugins/axios';
import { usePreloadStore } from '@/stores/usePreloadStore';
import { defineStore } from 'pinia';
import Swal from 'sweetalert2';

const toast = useToast()

export const useCrudUserStore = defineStore('useCrudUserStore', {
  state: () => ({
    loading: true as boolean,
    formulario: {
      id: null,
      email: '',
      name: '',
      lastName: '',
      role_id: null,
      identity_type_id: null,
      charge_id: null,
      idNumber: '',
      password: null,

      expeditionDate: null,
      birthDate: null,
      gender_id: null,
      weight: null,
      height: null,
      civil_status_id: null,
      phone: null,
      cellphone: null,
      address: null,
      have_son: null,
      nameContact: null,
      relationshipContact: null,
      phoneContact: null,
      cellphoneContact: null,
      emailContact: null,
    } as IUserForm,
    action: "list" as string,
    typeAction: "list" as string,
    userData: {} as IUserForm,
    keyList: 0 as number,
    users: [] as Array<IUserList>,
    totalData: 0 as number,
    totalPage: 0 as number,
    currentPage: 1 as number,
    lastPage: 0 as number,
    genders: [] as Array<object>,
    civilStatus: [] as Array<object>,
    arrayRoles: [] as Array<object>,
    countRoles: 0 as number,
    identityTypes: [] as Array<object>,
    charges_arrayInfo: [] as Array<object>,
    charges_countLinks: 0 as number,
  }),
  getters: {
  },
  actions: {
    clearFormulario() {
      this.formulario = <IUserForm>{
        id: null,
        email: '',
        name: '',
        lastName: '',
        role_id: null,
        identity_type_id: null,
        charge_id: null,
        idNumber: '',
        expeditionDate: null,
        birthDate: null,
        gender_id: null,
        weight: null,
        height: null,
        civil_status_id: null,
        phone: null,
        cellphone: null,
        address: null,
        have_son: null,
        nameContact: null,
        relationshipContact: null,
        phoneContact: null,
        cellphoneContact: null,
        emailContact: null,
      }
    },

    async fetchAll(params: object): Promise<void> {
      this.loading = true
      await axiosIns.post(
        '/user-list',
        params,
      ).then(result => {
        this.loading = false
        this.users = result.data.user
        this.totalData = result.data.totalData
        this.totalPage = result.data.totalPage
        this.currentPage = result.data.currentPage
        this.lastPage = result.data.lastPage
      }).catch(async error => {
        this.loading = false
        console.log(await error)
      })
    },
    async fetchSave(): Promise<IPromise> {
      const preload = usePreloadStore()
      const formData = new FormData()

      for (const key in this.formulario)
        formData.append(key, this.formulario[key])

      preload.isLoading = true
      return await axiosIns.post(
        '/user-create',
        formData,
      ).then(result => {
        preload.isLoading = false
        if (result.data.code === 200) {
          this.formulario = result.data.data
          toast.toast('Éxito', result.data.message, 'success')
        }
        else
          toast.toast('Error', result.data.message, 'danger')

        return { code: result.data.code, message: result.data.message, errors: result.data.errors };
      }).catch(async error => {
        preload.isLoading = false
        if (error.response.status === 500)
          toast.toast('Error', error.response.data.message, 'danger')
        console.log(await error)
        return { errors: error.response.data.errors, code: error.response.data.code, message: error.response.data.message };
      })
    },


    async fetchDataForm(): Promise<void> {
      const preload = usePreloadStore()
      preload.isLoading = true
      await axiosIns
        .post("/user-dataForm")
        .then((result) => {
          preload.isLoading = false
          this.identityTypes = result.data.identityTypes;
          this.arrayRoles = result.data.roles;
          this.countRoles = result.data.roles.length;

          this.charges_arrayInfo = result.data.charges_arrayInfo;
          this.charges_countLinks = result.data.charges_countLinks;
          this.genders = result.data.genders;
          this.civilStatus = result.data.civilStatus;
        })
        .catch(async (error) => {
          preload.isLoading = false
          console.log(await error);
        });
    },


    async fetchDelete(id: number): Promise<void> {
      const preload = usePreloadStore()
      preload.isLoading = true
      await axiosIns.delete(
        '/user-delete/' + id
      ).then(result => {
        preload.isLoading = false
        toast.toast('Éxito', result.data.message, 'success')

      }).catch(async error => {
        preload.isLoading = false
        console.log(await error)
      })
    },

    async fetchInfo(id: number): Promise<void> {
      const preload = usePreloadStore()
      preload.isLoading = true
      await axiosIns.get(
        `/user-info/${id}`,
      ).then(async result => {
        console.log('RESULT', result)
        preload.isLoading = false
        this.formulario = await result.data.data
        this.userData.id = id
      }).catch(async error => {
        preload.isLoading = false
        console.log(await error)
      })
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
          axiosIns.post("/user-changeState", objeto)
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

    async fetchSelectCharges(params: object): Promise<void> {
      this.loading = true
      await axiosIns.post(
        '/charge-select2InfiniteList', params
      ).then(async result => {
        this.loading = false
        this.charges_arrayInfo = await result.data.charges_arrayInfo
        this.charges_countLinks = await result.data.charges_countLinks
      }).catch(async error => {
        this.loading = false
        console.log(await error)
      })
    },
  },
})

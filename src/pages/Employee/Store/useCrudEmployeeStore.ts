import { useToast } from '@/composables/useToast'
import IPromise from '@/interfaces/Axios/IPromise'
import type IForm from '@/pages/Employee/Interfaces/IForm'
import type IList from '@/pages/Employee/Interfaces/IList'
import axiosIns from '@/plugins/axios'
import { usePreloadStore } from '@/stores/usePreloadStore'
import { defineStore } from 'pinia'

const toast = useToast()

export const useCrudEmployeeStore = defineStore('useCrudEmployeeStore', {
  state: () => ({
    loading: true as boolean,
    action: "list" as string,
    typeAction: "list" as string,
    employeeData: {} as IForm,
    keyList: 0 as number,
    employees: [] as Array<IList>,
    totalData: 0 as number,
    totalPage: 0 as number,
    currentPage: 1 as number,
    lastPage: 0 as number,
    formulario: {
      id: null,
      name: '',
    } as IForm,
  }),
  getters: {
  },
  actions: {
    clearFormulario() {
      this.formulario = <IForm>{
        id: null,
        name: '',
      }
    },
    async fetchAll(params: object): Promise<void> {
      this.loading = true
      await axiosIns.post(
        '/employee-list',
        params,
      ).then(result => {
        this.loading = false
        this.employees = result.data.employees
        this.totalData = result.data.totalData
        this.totalPage = result.data.totalPage
        this.currentPage = result.data.currentPage
        this.lastPage = result.data.lastPage
      }).catch(error => {
        this.loading = false
        console.log("error", error)
      })
    },


    async fetchSave(): Promise<IPromise> {
      const preload = usePreloadStore()
      preload.isLoading = true
      return await axiosIns.post(
        '/employee-create',
        this.formulario,
      ).then(result => {
        preload.isLoading = false
        if (result.data.code === 200) {
          toast.toast('Éxito', result.data.message, 'success')
        } else
          toast.toast('Error', result.data.message, 'danger')

        return { message: result.data.message, code: result.data.code, errors: result.data.errors };
      }).catch(async error => {
        preload.isLoading = false
        if (error.response.status === 500)
          toast.toast('Error', error.response.data.message, 'danger')
        console.log(await error)
        return { errors: error.response.data.errors, code: error.response.data.code, message: error.response.data.message };
      })
    },

    async fetchDelete(id: number): Promise<void> {
      const preload = usePreloadStore()
      preload.isLoading = true
      await axiosIns.delete(
        '/employee-delete/' + id
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
        `/employee-info/${id}`,
      ).then(async result => {
        preload.isLoading = false
        this.employeeData.id = id
        this.formulario = await result.data.data
      }).catch(async error => {
        preload.isLoading = false
        console.log(await error)
      })

    },
  },
})

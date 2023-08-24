import { defineStore } from 'pinia'
import axiosIns from '@/plugins/axios'
import { useToast } from '@/composables/useToast'
// --- --- --- store --- --- ---
import { usePreloadStore } from '@/stores/usePreloadStore'
import { useAuthenticationStore } from '@/stores/useAuthenticationStore'
// --- --- END store --- --- ---
// --- --- --- Interfaces --- --- ---
import IPromise from '@/interfaces/Axios/IPromise'
import type ICompaniesList from '@/pages/Companies/Interfaces/ICompaniesList'
import type ICompaniesForm from '@/pages/Companies/Interfaces/ICompaniesForm'
// --- --- END Interfaces --- --- ---

const toast = useToast()

export const useCompaniesStore = defineStore('useCompaniesStore', {
  state: () => ({
    loading: true as boolean,
    action: "list" as string,
    typeAction: "list" as string,
    companyData: {} as ICompaniesForm,
    keyList: 0 as number,
    dataList: [] as Array<ICompaniesList>,
    // Pagination
    totalData: 0 as number,
    totalPage: 0 as number,
    currentPage: 1 as number,
    lastPage: 0 as number,
    formulario: {
      id: null,
      name: '',
      image_icon: null,
      image_logo: null,
      image_cover: null,
    } as ICompaniesForm,
  }),
  getters: {
  },
  actions: {
    clearFormulario() {
      this.formulario = <ICompaniesForm>{
        id: null,
        name: '',
      }
    },
    async fetchAll(params: object): Promise<void> {
      this.loading = true
      await axiosIns.post('/company-list', params,).then(result => {
        this.loading = false
        this.dataList = result.data.dataList
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
      const authenticationStore = useAuthenticationStore()
      preload.isLoading = true
      const formData = new FormData()
      for( const key in this.formulario ){
        formData.append(key, this.formulario[key])
      }
      return await axiosIns.post('/company-create',formData,).then(result => {
        preload.isLoading = false
        if (result.data.code === 200) {
          toast.toast('Éxito', result.data.message, 'success')
          authenticationStore.company = result.data.aCompany;
          document.title = 'CMS - '+result.data.aCompany.name
          const icon = document.querySelector('link[rel="icon"]')
          icon.href = result.data.aCompany.image_icon
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
        '/charge-delete/' + id
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
      const authenticationStore = useAuthenticationStore()
      preload.isLoading = true
      await axiosIns.get(
        `/company-info/${id}`,
      ).then(async result => {
        preload.isLoading = false
        this.companyData.id = id
        authenticationStore.company = result.data.data
        document.title = 'CMS - '+result.data.data.name
        const icon = document.querySelector('link[rel="icon"]')
        icon.href = result.data.data.image_icon
        this.formulario = await result.data.data
      }).catch(async error => {
        preload.isLoading = false
        console.log(await error)
      })

    },
  },
})

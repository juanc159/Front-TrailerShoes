import { useToast } from '@/composables/useToast'
import IPromise from '@/interfaces/Axios/IPromise'
import type ISocialNetworkForm from '@/pages/SocialNetwork/Interfaces/ISocialNetworkForm'
import type ISocialNetworkList from '@/pages/SocialNetwork/Interfaces/ISocialNetworkList'
import axiosIns from '@/plugins/axios'
import { usePreloadStore } from '@/stores/usePreloadStore'
import { defineStore } from 'pinia'

const toast = useToast()

export const useCrudSocialNetworkStore = defineStore('useCrudSocialNetworkStore', {
  state: () => ({
    loading: true as boolean,
    typeAction: "list" as string,
    action: "list" as string,
    socialNetworkData: {} as ISocialNetworkForm,
    keyList: 0 as number,
    socialNetworks: [] as Array<ISocialNetworkList>,
    totalData: 0 as number,
    totalPage: 0 as number,
    currentPage: 1 as number,
    lastPage: 0 as number,
    formulario: {
      id: null,
      name: null,
      url: null,
      path: null,
    } as ISocialNetworkForm,
  }),
  getters: {
  },
  actions: {
    clearFormulario() {
      this.formulario = <ISocialNetworkForm>{
        id: null,
        name: null,
        url: null,
        path: null,
      }
    },
    async fetchAll(params: object): Promise<void> {
      this.loading = true
      await axiosIns.post(
        '/socialNetwork-list',
        params,
      ).then(result => {
        this.loading = false
        this.socialNetworks = result.data.socialNetworks
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

      const formData = new FormData()
      for (const key in this.formulario)
        formData.append(key, this.formulario[key])

      return await axiosIns.post(
        '/socialNetwork-create',
        formData,
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
        '/socialNetwork-delete/' + id
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
        `/socialNetwork-info/${id}`,
      ).then(async result => {
        preload.isLoading = false
        this.socialNetworkData.id = id
        this.formulario = await result.data.data
      }).catch(async error => {
        preload.isLoading = false
        console.log(await error)
      })

    },
  },
})

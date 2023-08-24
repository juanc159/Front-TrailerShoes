import { useToast } from '@/composables/useToast'
import IPromise from '@/interfaces/Axios/IPromise'
import type IRequirementTypeForm from '@/pages/RequirementType/Interfaces/IRequirementTypeForm'
import type IRequirementTypeList from '@/pages/RequirementType/Interfaces/IRequirementTypeList'
import axiosIns from '@/plugins/axios'
import { usePreloadStore } from '@/stores/usePreloadStore'
import { defineStore } from 'pinia'

const toast = useToast()

export const useCrudRequirementTypeStore = defineStore('useCrudRequirementTypeStore', {
  state: () => ({
    loading: true as boolean,
    action: "list" as string,
    typeAction: "list" as string,
    requirementTypeData: {} as IRequirementTypeForm,
    keyList: 0 as number,
    requirementTypes: [] as Array<IRequirementTypeList>,
    totalData: 0 as number,
    totalPage: 0 as number,
    currentPage: 1 as number,
    lastPage: 0 as number,
    formulario: {
      id: null,
      name: null,
      internal: null,
      external: null,
      arrayCharges: [],
      arrayInputs: [],

    } as IRequirementTypeForm,

    charges_arrayInfo: [] as Array<object>,
    charges_countLinks: 0 as number
  }),
  getters: {
  },
  actions: {
    clearFormulario() {
      this.formulario = <IRequirementTypeForm>{
        id: null,
        name: null,
        internal: null,
        external: null,
        arrayCharges: [],
        arrayInputs: [],
      }
    },
    async fetchAll(params: object): Promise<void> {
      this.loading = true
      await axiosIns.post(
        '/requirementType-list',
        params,
      ).then(result => {
        this.loading = false
        this.requirementTypes = result.data.requirementTypes
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
        '/requirementType-create',
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
        '/requirementType-delete/' + id
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
        `/requirementType-info/${id}`,
      ).then(async result => {
        preload.isLoading = false
        this.requirementTypeData.id = id
        this.formulario = await result.data.data
      }).catch(async error => {
        preload.isLoading = false
        console.log(await error)
      })
    },
    async fetchDataForm(): Promise<void> {
      const preload = usePreloadStore()
      preload.isLoading = true
      await axiosIns.post(
        '/requirementType-dataForm',
      ).then(async result => {
        preload.isLoading = false
        this.charges_arrayInfo = await result.data.charges_arrayInfo
        this.charges_countLinks = await result.data.charges_countLinks
      }).catch(async error => {
        preload.isLoading = false
        console.log(await error)
      })
    },

    async fetchSelectCharges(params: object): Promise<void> {
      this.loading = true
      await axiosIns.post(
        '/charge-select2InfiniteList', params,
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

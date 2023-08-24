import { useToast } from '@/composables/useToast'
import IPromise from '@/interfaces/Axios/IPromise'
import type ISurveyForm from '@/pages/Survey/Interfaces/ISurveyForm'
import type ISurveyList from '@/pages/Survey/Interfaces/ISurveyList'
import axiosIns from '@/plugins/axios'
import { usePreloadStore } from '@/stores/usePreloadStore'
import { defineStore } from 'pinia'

const toast = useToast()

export const useCrudSurveyStore = defineStore('useCrudSurveyStore', {
  state: () => ({
    loading: true as boolean,
    typeAction: "list" as string,
    action: "list" as string,
    surveyData: {} as ISurveyForm,
    keyList: 0 as number,
    surveys: [] as Array<ISurveyList>,
    totalData: 0 as number,
    totalPage: 0 as number,
    currentPage: 1 as number,
    lastPage: 0 as number,
    formulario: {
      id: null,
      name: null,
      startDate: null,
      endDate: null,
      arrayQuestions: [],
      answerSeveralTimes: 0,
    } as ISurveyForm,
    dataReport: [] as Array<object>,
    headers: [] as Array<object>,
    modalReportView: false as boolean
  }),
  getters: {
  },
  actions: {
    clearFormulario() {
      this.formulario = <ISurveyForm>{
        id: null,
        name: null,
        startDate: null,
        endDate: null,
        arrayQuestions: [],
        answerSeveralTimes: null,
      }
    },
    async fetchAll(params: object): Promise<void> {
      this.loading = true
      await axiosIns.post(
        '/survey-list',
        params,
      ).then(result => {
        this.loading = false
        this.charges = result.data.charges
        this.surveys = result.data.surveys
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
        '/survey-create',
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
        '/survey-delete/' + id
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
        `/survey-info/${id}`,
      ).then(async result => {
        preload.isLoading = false
        this.surveyData.id = id
        this.formulario = await result.data.data
      }).catch(async error => {
        preload.isLoading = false
        console.log(await error)
      })
    },

    async fetchInfoReport(id: number): Promise<void> {
      const preload = usePreloadStore()
      preload.isLoading = true
      await axiosIns.get(
        `/survey-infoReport/${id}`,
      ).then(async result => {
        preload.isLoading = false
        this.dataReport = await result.data.dataReport
        this.headers = await result.data.headers
      }).catch(async error => {
        preload.isLoading = false
        console.log(await error)
      })
    },

    async sendEmails(form: object): Promise<IPromise> {
      return await axiosIns.post(
        '/survey-sendMail',
        form,
      ).then(result => {
        if (result.data.code === 200) {
          toast.toast('Éxito', result.data.message, 'success')
        } else
          toast.toast('Error', result.data.message, 'danger')

        return { message: result.data.message, code: result.data.code, errors: result.data.errors };
      }).catch(async error => {
        if (error.response.status === 500)
          toast.toast('Error', error.response.data.message, 'danger')
        console.log(await error)
        return { errors: error.response.data.errors, code: error.response.data.code, message: error.response.data.message };
      })
    },
    async getInfoToAnswer(id: number, email: string): Promise<IPromise> {
      return await axiosIns.get(
        '/survey-getInfoToAnswer/' + id + '/' + email,
      ).then(result => {
        if (result.data.code === 200) {
          toast.toast('Éxito', result.data.message, 'success')
        }

        return { message: result.data.message, code: result.data.code, data: result.data.survey, errors: result.data.errors };
      }).catch(async error => {
        if (error.response.status === 500)
          toast.toast('Error', error.response.data.message, 'danger')
        console.log(await error)
        return { errors: error.response.data.errors, code: error.response.data.code, message: error.response.data.message };
      })
    },


    async saveAnswer(form: object): Promise<IPromise> {
      const preload = usePreloadStore()
      preload.isLoading = true
      return await axiosIns.post(
        '/survey-saveAnswer',
        form
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
  },
})

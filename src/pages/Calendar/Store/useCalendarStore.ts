import { useToast } from '@/composables/useToast'
import IPromise from '@/interfaces/Axios/IPromise'
import axiosIns from '@/plugins/axios'
import { defineStore } from 'pinia'

const toast = useToast()

export const useCalendarStore = defineStore('useCalendarStore', {
  state: () => ({
    token: "" as string,
    events: [] as Array<object>,
    calendarTypes: [] as Array<object>,
    charges: [] as Array<object>,
    loading: {
      form: false,
      calendar: false,
      guestsInformation: false,
      answerInvitation: false,
    }
  }),
  persist: true,
  getters: {
  },
  actions: {
    async fetchAll(params: object = {}): Promise<void> {
      this.loading.calendar = true
      await axiosIns.post(
        '/event-list',
        params,
      ).then(result => {
        this.loading.calendar = false
        this.events = result.data.events
        this.calendarTypes = result.data.calendarTypes
        this.charges = result.data.charges

      }).catch(error => {
        this.loading.calendar = false
        console.log("error", error)
      })
    },


    async fetchSave(form: object): Promise<IPromise> {
      return await axiosIns.post(
        '/event-create', form
      ).then(result => {
        if (result.data.code === 200) {
          toast.toast('Éxito', result.data.message, 'success')
        } else
          toast.toast('Error', result.data.message, 'danger')

        return { message: result.data.message, code: result.data.code, data: result.data.data, errors: result.data.errors };
      }).catch(async error => {
        if (error.response.status === 500)
          toast.toast('Error', error.response.data.message, 'danger')
        console.log(await error)
        return { errors: error.response.data.errors, code: error.response.data.code, message: error.response.data.message };
      })
    },

    async fetchDelete(id: number): Promise<void> {
      await axiosIns.delete(
        '/event-delete/' + id
      ).then(result => {
        toast.toast('Éxito', result.data.message, 'success')

      }).catch(async error => {
        console.log(await error)
      })
    },

    async fetchGuestsInformation(params: object): Promise<IPromise> {
      this.loading.guestsInformation = true
      return await axiosIns.post(
        '/event-guestsInformation/', params
      ).then(result => {
        this.loading.guestsInformation = false

        return {
          code: result.data.code,
          message: result.data.message,
          data: result.data
        };

      }).catch(async error => {
        this.loading.guestsInformation = false
        console.log(await error)
        return { errors: error.response.data.errors, code: error.response.data.code, message: error.response.data.message };

      })
    },
    async fetchAnswerInvitation(params: object): Promise<IPromise> {
      this.loading.answerInvitation = true
      return await axiosIns.post(
        '/event-guest-answerInvitation', params
      ).then(result => {
        this.loading.answerInvitation = false

        return {
          code: result.data.code,
          message: result.data.message,
          data: result.data
        };

      }).catch(async error => {
        this.loading.answerInvitation = false
        console.log(await error)
        return { errors: error.response.data.errors, code: error.response.data.code, message: error.response.data.message };

      })
    },
  }
})

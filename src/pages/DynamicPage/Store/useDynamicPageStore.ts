import { useToast } from '@/composables/useToast'
import type IPromise from '@/interfaces/Axios/IPromise'
import type IForm from '@/pages/DynamicPage/Interfaces/IForm'
import axiosIns from '@/plugins/axios'
import { usePreloadStore } from '@/stores/usePreloadStore'
import { defineStore } from 'pinia'
import Swal from 'sweetalert2'

const toast = useToast()

export const useDynamicPageStore = defineStore('useDynamicPageStore', {
  persist: true,
  state: () => ({
    action: "list" as string,
    typeAction: "list" as string,
    isLoading: false as boolean,
    form: {
      metaData: null,
    } as IForm,
    arraySections: [{
      id: 1,
      order: 1,
      name: 'Secction 1',
      arrayRows: [{
        id: 1,
        order: 1,
        name: 'Fila 1',
        columns: [
          {
            id: 1,
            order: 1,
            classCol: '12',
            contentText: null,
            contentImage: null,
            contentSlider: [],
            keySlider: 1,
            contentPopUps: null,
            contentForm: null,
            contentSocialNetwork: null,
            contentCalendar: null,
          },
        ],
      }] as Array<object>,
    }] as Array<object>,
    dynamicMenuPageList: [] as Array<object>,
    events: [] as Array<object>,
    calendarTypes: [] as Array<object>,
    arrayForms: [] as Array<object>,
    forms: [] as Array<object>,
    formsRequerimentsInternal: [] as Array<object>,
    socialNetworks: [] as Array<object>,

    rowSelected: null as null | number,
    sectionSelected: null as null | number,
    columnsSelected: null as null | number,

    // MODULE TEXT
    modalModuleText: false as boolean,
    editModuleText: false as boolean,
    keyComponentModuleText: 1 as number,

    // MODULE IMAGE
    keyComponentModuleImage: 1 as number,
    editModuleImage: false as boolean,
    typeModuleImage: null as null | string,
    modalModuleImage: false as boolean,

    // MODULE SLIDER
    keyComponentModuleSlider: 1 as number,
    editModuleSlider: false as boolean,
    modalModuleSlider: false as boolean,

    // MODULE POP UPS
    keyComponentModulePopUps: 1 as number,
    editModulePopUps: false as boolean,
    modalModulePopUps: false as boolean,

    // MODULE FORM
    keyComponentModuleForm: 1 as number,
    editModuleForm: false as boolean,
    modalModuleForm: false as boolean,

    // MODULE SOCIAL NETWORK
    keyComponentModuleSocialNetwork: 1 as number,
    editModuleSocialNetwork: false as boolean,
    modalModuleSocialNetwork: false as boolean,

    // MODULE CALENDAR
    keyComponentModuleCalendar: 1 as number,
    editModuleCalendar: false as boolean,
    modalModuleCalendar: false as boolean,

    row: {} as object,
    column: null as null | number,

  }),
  getters: {

  },
  actions: {
    clearForm() {
      this.form = <IForm>{
        metaData: null,
      }
    },

    // Secciones
    addSection() {
      const length = this.arraySections.length

      // se ordena segun orden para sacar el ultimo y obtener su id
      const arrayOrder = this.arraySections.sort((a, b) => a.order - b.order)
      const id = arrayOrder[arrayOrder.length - 1].id + 1
      const num = length + 1

      this.sectionSelected = length

      this.arraySections.push({
        id,
        order: num,
        name: `Secction ${id}`,
        arrayRows: [],
      })

      this.addRow({ classCol: '12', cantColumns: 1 })
    },

    deleteSection(index: number) {
      if (index != 0 || this.arraySections.length != 1) {
        Swal.fire({
          title: '¿Desea eliminar la sección?',
          showDenyButton: true,
          showCancelButton: false,
          confirmButtonText: 'Si',
          denyButtonText: 'No',
        }).then(result => {
          if (result.isConfirmed) {
            this.arraySections.splice(index, 1)
          }
          else if (result.isDenied) {
          }
        })
      }
      else {
        toast.toast('Información', 'No puede eliminar la unica sección existente', 'info')
      }
    },

    // rows

    addRow(data: object) {
      const length = this.arraySections[this.sectionSelected].arrayRows.length
      const order = length + 1

      let id = 1
      if (this.arraySections[this.sectionSelected].arrayRows.length > 0)
        id = this.arraySections[this.sectionSelected].arrayRows[this.arraySections[this.sectionSelected].arrayRows.length - 1].id + 1

      const arrayColumns = []
      for (let index = 0; index < data.cantColumns; index++) {
        arrayColumns.push({
          id: index + 1,
          order: index + 1,
          classCol: data.classCol,
          contentText: null,
          contentImage: null,
          contentSlider: [],
          keySlider: 1,
          contentPopUps: null,
        })
      }

      this.arraySections[this.sectionSelected].arrayRows.push({
        id,
        order,
        columns: arrayColumns,
        name: `Fila ${id}`,
      })
    },

    deleteRow() {
      if (this.rowSelected != 0 || this.arraySections[this.sectionSelected].arrayRows.length != 1) {
        Swal.fire({
          title: '¿Desea eliminar la sección?',
          showDenyButton: true,
          showCancelButton: false,
          confirmButtonText: 'Si',
          denyButtonText: 'No',
        }).then(async result => {
          if (result.isConfirmed) {
            this.arraySections[this.sectionSelected].arrayRows.splice(this.rowSelected, 1)
          }
          else if (result.isDenied) {
          }
        })
      }
      else {
        toast.toast('Información', 'No puede eliminar la unica fila existente', 'info')
      }
    },

    async fetchPreview(params: object): Promise<void> {
      await axiosIns
        .post('/dynamicMenuPage-preview', params)
        .then(result => {
          this.dynamicMenuPageList = result.data.dynamicMenuPageList
          this.events = result.data.events
          this.calendarTypes = result.data.calendarTypes
        })
        .catch(async error => {
          console.log(await error)
        })
    },

    async fetchSave(): Promise<IPromise> {
      const preload = usePreloadStore()

      preload.isLoading = true

      return await axiosIns
        .post('/dynamicMenuPage-pageCreate', this.form)
        .then(result => {
          preload.isLoading = false
          if (result.data.code === 200)
            toast.toast('Éxito', result.data.message, 'success')

          else
            toast.toast('Error', result.data.message, 'danger')

          return { message: result.data.message, code: result.data.code, errors: result.data.errors }
        })
        .catch(async error => {
          preload.isLoading = false
          if (error.response.status === 500)
            toast.toast('Error', error.response.data.message, 'danger')
          console.log(await error)

          return { errors: error.response.data.errors, code: error.response.data.code, message: error.response.data.message }
        })
    },

    async fetchInfoPage(id: number): Promise<void> {
      const preload = usePreloadStore()

      preload.isLoading = true
      await axiosIns
        .get(`/dynamicMenuPage-infoPage/${id}`)
        .then(async result => {
          preload.isLoading = false
          this.arraySections = JSON.parse(result.data.data.metaData)
          this.form.id = result.data.data.id
          this.forms = result.data.forms
          this.formsRequerimentsInternal = result.data.formsRequerimentsInternal

          this.socialNetworks = result.data.socialNetworks
        })
        .catch(async error => {
          preload.isLoading = false
          console.log(await error)
        })
    },


    async fetchAnswer(form: object): Promise<IPromise> {
      const preload = usePreloadStore()

      preload.isLoading = true

      const formData = new FormData()
      formData.append('form_id', form.value)
      formData.append('requirement_type_id', form.requirement_type_id)

      formData.append('cant_inputs', form.arrayInputs.length)
      form.arrayInputs.forEach((element, key) => {

        formData.append('input_id' + key, element.id)
        formData.append('input_type_id' + key, element.type_input)
        formData.append('input_answer' + key, element.answer ?? null)
      });

      return await axiosIns
        .post('/form-saveAnswer', formData)
        .then(result => {
          preload.isLoading = false
          if (result.data.code === 200)
            toast.toast('Éxito', result.data.message, 'success')
          else
            toast.toast('Error', result.data.message, 'danger')

          return { message: result.data.message, code: result.data.code, errors: result.data.errors }
        })
        .catch(async error => {
          preload.isLoading = false
          if (error.response.status === 500)
            toast.toast('Error', error.response.data.message, 'danger')
          console.log(await error)

          return { errors: error.response.data.errors, code: error.response.data.code, message: error.response.data.message }
        })
    },
  },
})

import { useToast } from '@/composables/useToast'
import IPromise from '@/interfaces/Axios/IPromise'
import type IForm from '@/pages/Requirement/Interfaces/IForm'
import type IRequirementForm from '@/pages/Requirement/Interfaces/IRequirementForm'
import type IRequirementList from '@/pages/Requirement/Interfaces/IRequirementList'
import axiosIns from '@/plugins/axios'
import { useAuthenticationStore } from '@/stores/useAuthenticationStore'
import { usePreloadStore } from '@/stores/usePreloadStore'
import { defineStore } from 'pinia'

const toast = useToast()

export const useRequirementStore = defineStore('useRequirementStore', {
  state: () => ({
    loading: {
      table: false,
      selectRequirementTypes: false,
    },
    disabled: false as boolean,
    typeAction: "list" as string,
    action: "list" as string,
    requirementData: {} as IRequirementForm,
    keyList: 0 as number,
    requirements: [] as Array<IRequirementList>,
    dataTraceability: [] as Array<object>,
    totalData: 0 as number,
    totalPage: 0 as number,
    currentPage: 1 as number,
    lastPage: 0 as number,
    formulario: {
      id: null,
      requirement_type_id: null,
      user_id: null,
      formData: null,
    } as IForm,
    formularioManage: {
      id: null,
      observation: '',
      files: [],
    } as IRequirementForm,

    charges: [] as Array<object>,
    arrayAction: ['Devolver', 'Continuar'] as Array<string>,
    requirementTypes_arrayInfo: [] as Array<object>,
    requirementTypes_countLinks: 0 as number,
  }),
  getters: {
  },
  actions: {
    clearFormulario() {
      this.disabled = false
      this.formulario = <IForm>{
        id: null,
        requirement_type_id: null,
        user_id: null,
        formData: null,
      }
    },
    clearFormularioManage() {
      this.formularioManage = <IRequirementForm>{
        id: null,
        observation: '',
        files: [],
      }
    },
    async fetchAll(params: object): Promise<void> {
      this.loading.table = true
      await axiosIns.post(
        '/requirement-list',
        params,
      ).then(result => {
        this.loading.table = false
        this.requirements = result.data.requirements
        this.totalData = result.data.totalData
        this.totalPage = result.data.totalPage
        this.currentPage = result.data.currentPage
        this.lastPage = result.data.lastPage
      }).catch(error => {
        this.loading.table = false
        console.log("error", error)
      })
    },

    async fetchManageSave(form: object = {}): Promise<IPromise> {
      const preload = usePreloadStore()
      preload.isLoading = true

      const formData = new FormData();

      formData.append("requirement_id", String(this.requirementData.id));
      formData.append("observation", String(this.formularioManage.observation));
      formData.append("countFiles", String(this.formularioManage.files.length));

      this.formularioManage.files.forEach((element, key) => {
        formData.append("file" + key, element.file);
        formData.append("file_id" + key, String(element.id));
        formData.append("file_name" + key, String(element.name));
        formData.append("file_delete" + key, String(element.delete));
      });

      formData.append("action", String(form.action));
      formData.append("where", String(form.where));
      formData.append("archive_final", form.archive_final);

      return await axiosIns.post(
        '/requirement-manageCreate',
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


    async fetchInfo(id: number): Promise<void> {
      const preload = usePreloadStore()
      preload.isLoading = true
      await axiosIns.get(
        `/requirement-info/${id}`,
      ).then(async result => {
        preload.isLoading = false
        this.formulario = await result.data.data
        this.disabled = true
      }).catch(async error => {
        preload.isLoading = false
        console.log(await error)
      })
    },

    async fetchDelete(id: number): Promise<void> {
      const preload = usePreloadStore()
      preload.isLoading = true
      await axiosIns.delete(
        '/requirement-delete/' + id
      ).then(result => {
        preload.isLoading = false
        toast.toast('Éxito', result.data.message, 'success')

      }).catch(async error => {
        preload.isLoading = false
        console.log(await error)
      })
    },


    async fetchManageDataForm(params: object): Promise<void> {
      const preload = usePreloadStore()
      preload.isLoading = true
      await axiosIns.post(
        '/requirement-manageDataForm', params,
      ).then(async result => {
        preload.isLoading = false
        this.clearFormularioManage()
        this.requirementData = await result.data.requirement
        this.dataTraceability = this.requirementData.manages
        this.charges = await result.data.charges

        const authenticationStore = useAuthenticationStore()
        const searchIndex = this.charges.findIndex(ele => ele.id == authenticationStore.user.charge_id);
        if (searchIndex == 0) {
          this.arrayAction.splice(0, 1)
        }
      }).catch(async error => {
        preload.isLoading = false
        console.log(await error)
      })
    },





    async fetchDataForm(): Promise<void> {
      const preload = usePreloadStore()
      preload.isLoading = true
      await axiosIns.get(
        '/requirement-dataForm',
      ).then(async result => {
        preload.isLoading = false
        this.requirementTypes_arrayInfo = await result.data.requirementTypes_arrayInfo
        this.requirementTypes_countLinks = await result.data.requirementTypes_countLinks
      }).catch(async error => {
        preload.isLoading = false
        console.log(await error)
      })
    },
    async fetchSave(): Promise<IPromise> {
      const preload = usePreloadStore()
      preload.isLoading = true

      const formData = new FormData()
      formData.append('id', this.formulario.id)
      formData.append('requirement_type_id', this.formulario.requirement_type_id)
      formData.append('user_id', this.formulario.user_id)

      formData.append('cant_inputs', this.formulario.formData.arrayInputs.length)
      this.formulario.formData.arrayInputs.forEach((element, key) => {
        formData.append('input_id' + key, element.id)
        formData.append('input_type_id' + key, element.type_input)
        formData.append('input_answer' + key, element.answer)
      });

      return await axiosIns.post(
        '/requirement-create',
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


    async fetchSelectRequirementTypes(params: object): Promise<void> {
      this.loading.selectRequirementTypes = true
      await axiosIns.post(
        '/requirementType-select2', params
      ).then(async result => {
        this.loading.selectRequirementTypes = false
        this.requirementTypes_arrayInfo = await result.data.requirementTypes_arrayInfo
        this.requirementTypes_countLinks = await result.data.requirementTypes_countLinks
      }).catch(async error => {
        this.loading.selectRequirementTypes = false
        console.log(await error)
      })
    },

  },
})

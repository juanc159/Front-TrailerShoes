<script lang="ts" setup  >
import { requiredValidator } from '@/@core/utils/validators';
import { useImageUpload } from '@/composables/useImageUpload';
import InfoRequeriment from '@/pages/Requirement/Components/InfoRequeriment.vue';
import { useRequirementStore } from '@/pages/Requirement/Store/useRequirementStore';
import { useAuthenticationStore } from '@/stores/useAuthenticationStore';
import type { VForm } from 'vuetify/components';

import { VDataTable } from 'vuetify/labs/VDataTable';
const authenticationStore = useAuthenticationStore()
const requirementStore = useRequirementStore()
const { formularioManage, charges, arrayAction, dataTraceability, requirementData } = storeToRefs(requirementStore)
const errors = ref<Array<string>>([])
const formValidation = ref<VForm>()
const formFileValidation = ref<VForm>()
const formExecuteValidation = ref<VForm>()
const archive = ref(useImageUpload());
const archiveFinal = ref(useImageUpload());
const form = ref({})
const chargesExecute = ref([])
const changeScreen = async (typeAction: string) => {
  requirementStore.typeAction = typeAction
  if (typeAction != 'back')
    requirementStore.keyList++
}

const submitForm = async (action: string = 'save') => {
  const validation = await formValidation.value?.validate()
  if (validation?.valid) {
    const data = await requirementStore.fetchManageSave()
    if (data.code === 200) {
      await formValidation.value?.resetValidation()
      errors.value = []
      requirementStore.clearFormularioManage()
      if (action == 'saveAndBack') {
        changeScreen("list");
      }
    }
    if (data.code === 422) errors.value = data.errors ?? []; //muestra error del back
  }
}
const submitFormExecute = async () => {
  const validation = await formValidation.value?.validate()
  if (validation?.valid) {
    const validationExecute = await formExecuteValidation.value?.validate()
    if (validationExecute?.valid) {

      form.value.archive_final = null
      if (archiveFinal.value.imageFile) {
        form.value.archive_final = archiveFinal.value.imageFile
      }

      const data = await requirementStore.fetchManageSave(form.value)
      if (data.code === 200) {
        await formValidation.value?.resetValidation()
        errors.value = []
        requirementStore.clearFormularioManage()
        changeScreen("list");
      }
    }
    if (data.code === 422) errors.value = data.errors ?? []; //muestra error del back
  }
}

//files
const headers = [
  { title: 'Nombre', key: 'name' },
  { title: 'Acciones', sortable: false, key: 'actions' }
]

const arrayFiles = computed(() => {
  return formularioManage.value.files.filter(ele => ele.delete != "delete")
})

const clearFormFile = () => {
  archive.value.clearData()

}
const addFile = async () => {
  const validation = await formFileValidation.value?.validate()
  if (validation?.valid) {
    formularioManage.value.files.push({
      file: archive.value.imageFile,
      name: archive.value.name,
      delete: null,
      id: null,
    })
    clearFormFile()
  }
}
const deleteFile = (pos: number) => {
  if (formularioManage.value.files[pos].id) {
    formularioManage.value.files[pos].delete = "delete"
  } else {
    formularioManage.value.files.splice(pos, 1)
  }
}

const showWhere = ref<boolean>(true)
const btnNameExecute = ref<string>("Guardar y Ejecutar")
const selectAction = (type: string) => {
  showWhere.value = true
  const searchIndex = charges.value.findIndex(ele => ele.id == authenticationStore.user.charge_id);
  const searchLast = charges.value[charges.value.length - 1];


  form.value.action = type
  if (type == 'Devolver') {
    form.value.where = null
    chargesExecute.value = charges.value.filter((ele, key) => key < searchIndex);
  }
  if (type == 'Continuar') {
    if (searchLast.id == authenticationStore.user.charge_id) {
      btnNameExecute.value = "Guardar y Finalizar"
      showWhere.value = false
      form.value.action = "Finalizar"
    }
    form.value.where = null
    const number = searchIndex + 1
    chargesExecute.value = charges.value.filter((ele, key) => key == number);
  }
}

const headersTraceability = [
  { title: 'Cargo', key: 'charge_name' },
  { title: 'Usuario', key: 'user_name' },
  { title: 'Observación', key: 'observation' },
  { title: 'Archivos', key: 'files' },
  { title: 'Fecha', key: 'date' },
]

const clearFirst = () => {
  form.value.action = null
  btnNameExecute.value = "Guardar y Ejecutar"

}
</script>

<template>
  <div>
    <VRow>
      <VCol cols="12" class="d-flex justify-content-end">
        <VBtn color="secondary" @click="changeScreen('back')">
          Atras
        </VBtn>
      </VCol>
    </VRow>

    <VRow v-if="requirementData">
      <VCol cols="12">
        <InfoRequeriment></InfoRequeriment>
      </VCol>
    </VRow>
    <VForm ref="formValidation" lazy-validation v-if="requirementData?.state?.id != 3">
      <VRow>
        <VCol cols="12">
          <VTextarea v-model="formularioManage.observation" label="Observaciones" :rules="[requiredValidator]" />
        </VCol>
      </VRow>
    </VForm>
    <VForm ref="formFileValidation" lazy-validation v-if="requirementData?.state?.id != 3">
      <VRow>
        <VCol cols="12" sm="4">
          <VFileInput @change="archive.handleImageSelected" :rules="[requiredValidator]" :key="archive.key"></VFileInput>
        </VCol>
        <VCol cols="12" sm="4">
          <VTextField clearable v-model="archive.name" :rules="[requiredValidator]" label="Nombre" />
        </VCol>
        <VCol cols="12" sm="4">
          <VBtn color="primary" icon size="35" @click="addFile()">
            <VIcon icon="tabler-plus"></VIcon>
            <v-tooltip activator="parent" location="top">Agregar Archivo</v-tooltip>
          </VBtn>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <VDataTable :headers="headers" items-per-page="999" :items="arrayFiles">
            <template #item.actions="{ item, index }">
              <VBtn size="x-small" color="error" variant="text" icon @click="deleteFile(index)">
                <VIcon size="22" icon="tabler-trash" />
                <v-tooltip activator="parent" location="top">Borrar</v-tooltip>
              </VBtn>
            </template>
            <template #bottom>
            </template>
          </VDataTable>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12 d-flex justify-content-center">
          <VBtn color="primary" @click="submitForm('saveAndBack')">Guardar y salir</VBtn>
        </VCol>
      </VRow>
    </VForm>
    <VForm ref="formExecuteValidation" lazy-validation v-if="requirementData?.state?.id != 3">
      <VRow>
        <VCol cols="12" sm="4">
          <VSelect :rules="[requiredValidator]" clearable label="Que hacer" @click:clear="clearFirst()"
            @update:model-value="selectAction($event)" :items="arrayAction"></VSelect>
        </VCol>
        <VCol cols="12" sm="4" v-if="showWhere">
          <VSelect :rules="[requiredValidator]" clearable label="A donde" item-value="id" item-title="name"
            :items="chargesExecute" v-model="form.where">
          </VSelect>
        </VCol>
        <VCol cols="12" sm="4" v-if="form.action == 'Finalizar'">
          <VFileInput @change="archiveFinal.handleImageSelected" @click:clear="archiveFinal.clearData"
            :rules="[requiredValidator]" :key="archiveFinal.key">
          </VFileInput>
        </VCol>
        <VCol cols="12" sm="4">
          <VBtn color="primary" @click="submitFormExecute()">{{ btnNameExecute }}</VBtn>
        </VCol>
      </VRow>
    </VForm>

    <VRow class="mt-5">
      <VCol>
        <h3>Trazabilidad</h3>
        <VDataTable :headers="headersTraceability" :items="dataTraceability" :items-per-page="99999999">
          <template #item.files="{ item }">
            <div class="d-flex flex-column my-2" v-for="(file, indexF) in item.raw.files" :key="indexF">
              <a class="my-2" :href="file.path" target="_blank" :download="file.name">
                <VChip color="primary" style="cursor: pointer;">
                  <VIcon start size="16" icon="tabler-download" />
                  {{ file.name }}
                </VChip>
              </a>
            </div>
          </template>
          <template #bottom>
          </template>
        </VDataTable>
      </VCol>
    </VRow>
  </div>
</template>

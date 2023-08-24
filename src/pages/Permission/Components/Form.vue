<script lang="ts" setup>

import { useCrudPermissionStore } from '@/pages/Permission/Store/useCrudPermissionStore';
import { requiredValidator } from '@validators';
import type { VForm } from 'vuetify/components';
const storePermission = useCrudPermissionStore()
const { action, formulario } = storeToRefs(storePermission)
const errors = ref<Array<string> | undefined>([])

const formValidation = ref<VForm>()

const changeScreen = async (typeAction: string) => {
  storePermission.typeAction = typeAction
  await formValidation.value?.resetValidation()
  errors.value = []
  if (typeAction != 'back')
    storePermission.keyList++
}

const submitForm = async () => {
  const validation = await formValidation.value?.validate()
  if (validation?.valid) {
    const data = await storePermission.fetchSave()
    if (data.code === 200) changeScreen("list");
    if (data.code === 422) errors.value = data.errors; //muestra error del back
  }
}

onMounted(async () => {
  await storePermission.fetchDataForm();
})

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

    <HeaderAlertView sub-title="Permiso" :action="action" :validate-crud="true" :btn-back="true"
      @changeScreenBack="changeScreen"
    />

    <VContainer class="bg-vwhite" fluid>
      <VForm ref="formValidation" lazy-validation>
        <VRow>
          <VCol cols="12" md="6">
            <VSelect :items="storePermission.arrayMenus" item-title="title" item-value="id"
              :rules="[requiredValidator]" v-model="formulario.menu_id"
              :error-messages="errors.menu_id"
              @update:model-value="errors.menu_id = ''">
              <template #label>
                Grupo&nbsp;<b class="text-warning">*</b>
              </template>
            </VSelect>
          </VCol>
          <VCol cols="12" md="6">
            <VTextField v-model="formulario.name"
              :rules="[requiredValidator]" :error-messages="errors.name"
              @keypress="errors.name = ''">
              <template #label>
                Nombre&nbsp;<b class="text-warning">*</b>
              </template>
            </VTextField>
          </VCol>
          <VCol cols="12">
            <VTextField v-model="formulario.description"
              :rules="[requiredValidator]" :error-messages="errors.description"
              @keypress="errors.description = ''">
                <template #label>
                  Descripción&nbsp;<b class="text-warning">*</b>
                </template>
            </VTextField>
          </VCol>
        </VRow>
        <VDivider class="border-opacity-75 my-4" color="csecundary" :thickness="3" />
        <VRow class="pt-0">
          <VCol cols="12" class="text-center">
            <VTooltip text="Guardar" location="top">
              <template v-slot:activator="{ props }">
                <VBtn class="ms-1" color="light" rounded="lg" v-bind="props" @click="submitForm()">
                  Guardar&nbsp;<VIcon size="large" color="success" icon="mdi-content-save-outline" />
                </VBtn>
              </template>
            </VTooltip>
          </VCol>
        </VRow>
      </VForm>
    </VContainer>
  </div>
</template>

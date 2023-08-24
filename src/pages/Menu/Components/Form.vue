<script lang="ts" setup  >

import type { VForm } from 'vuetify/components'
import { requiredValidator } from '@validators'
// --- --- --- Store --- --- ---
import { useCrudMenuStore } from '@/pages/Menu/Store/useCrudMenuStore'
const storeMenu = useCrudMenuStore()
const { action, formulario } = storeToRefs(storeMenu)
// --- --- END Store --- --- ---


const errors = ref<Array<string>>([]);
const formValidation = ref<VForm>();

const changeScreen = async (typeAction: string) => {
  await formValidation.value?.resetValidation();
  storeMenu.typeAction = typeAction
  if (typeAction != 'back')
    storeMenu.keyList++
}

const submitForm = async () => {
  const validation = await formValidation.value?.validate();
  if (validation?.valid) {
    const data = await storeMenu.fetchSave()
    if (data.code === 200) changeScreen('save')
    if (data.code === 422) errors.value = data.errors; //muestra error del back
  }
} 
</script>

<template>
  <div>

    <HeaderAlertView sub-title="Menú" :action="action" :btn-back="true"
      :validate-crud="true" @changeScreenBack="changeScreen"
    />

    <VContainer class="bg-vwhite" fluid>
      <VForm ref="formValidation" lazy-validation>
        <VRow>
          <VCol cols="12" md="6">
            <VTextField v-model="formulario.title"
              :rules="[requiredValidator]"
              :error-messages="errors.title"
              @keypress="errors.title = ''">
              <template #label>
                Título&nbsp;<b class="text-warning">*</b>
              </template>
            </VTextField>
          </VCol>
          <VCol cols="12" md="6">
            <VTextField v-model="formulario.to"
              :rules="[requiredValidator]"
              :error-messages="errors.to"
              @keypress="errors.to = ''">
              <template #label>
                Redireccionar a&nbsp;<b class="text-warning">*</b>
              </template>
            </VTextField>
          </VCol>
          <VCol cols="12" md="6">
            <VTextField v-model="formulario.icon"
              :rules="[requiredValidator]"
              :error-messages="errors.icon"
              @keypress="errors.icon = ''">
              <template #label>
                Icono&nbsp;<b class="text-warning">*</b>
              </template>
            </VTextField>
          </VCol>
          <VCol cols="12" md="6">
            <VTextField v-model="formulario.requiredPermission"
              :rules="[requiredValidator]"
              :error-messages="errors.requiredPermission"
              @keypress="errors.requiredPermission = ''">
              <template #label>
                Permiso requerido&nbsp;<b class="text-warning">*</b>
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

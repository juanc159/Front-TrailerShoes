<script lang="ts" setup  >
import { requiredValidator } from '@validators';
import type { VForm } from 'vuetify/components';
// --- --- --- Store --- --- ---
import { useCrudStyleStore } from '@/pages/Style/Store/useCrudStyleStore';
const storeStyle = useCrudStyleStore()
const { action, formulario, charges } = storeToRefs(storeStyle)

// --- --- END Store --- --- ---

const errors = ref<Array<string>>([])

const formValidation = ref<VForm>()

const changeScreen = async (typeAction: string) => {
  storeStyle.typeAction = typeAction
  await formValidation.value?.resetValidation()
  errors.value = []
  if (typeAction != 'back')
    storeStyle.keyList++
}

const submitForm = async () => {
  const validation = await formValidation.value?.validate()
  if (validation?.valid) {
    const data = await storeStyle.fetchSave()
    if (data.code === 200) changeScreen("list");
    if (data.code === 422) errors.value = data.errors ?? []; //muestra error del back
  }
}

onMounted(async () => {
  await storeStyle.fetchDataForm()
})
</script>

<template>
  <div>

    <HeaderAlertView sub-title="Estilo" :action="action" :validate-crud="true" :btn-back="true"
      @changeScreenBack="changeScreen" />

    <VContainer class="bg-vwhite" fluid>
      <VForm ref="formValidation" lazy-validation>
        <VRow>
          <VCol cols="12" sm="4">
            <VTextField clearable v-model="formulario.name" :rules="[requiredValidator]" :error-messages="errors.name"
              @keypress="errors.name = ''">
              <template #label>
                Nombre&nbsp;<b class="text-warning">*</b>
              </template>
            </VTextField>
          </VCol>
          <VCol cols="12" sm="4">
            <VTextField clearable v-model="formulario.price" :rules="[requiredValidator]" :error-messages="errors.price"
              @keypress="errors.price = ''">
              <template #label>
                Precio&nbsp;<b class="text-warning">*</b>
              </template>
            </VTextField>
          </VCol>
          <VCol cols="12" sm="4">
            <VSelect :items="charges" v-model="formulario.charge_id" :rules="[requiredValidator]" label="Cargo"></VSelect>
          </VCol>
        </VRow>
        <VDivider class="border-opacity-75 my-4" color="csecundary" :thickness="3" />
        <VRow class="pt-0">
          <VCol cols="12" class="text-center">
            <VTooltip text="Guardar" location="top">
              <template v-slot:activator="{ props }">
                <VBtn class="ms-1" color="light" rounded="lg" v-bind="props" @click="submitForm()">
                  Guardar&nbsp;
                  <VIcon size="large" color="success" icon="mdi-content-save-outline" />
                </VBtn>
              </template>
            </VTooltip>
          </VCol>
        </VRow>
      </VForm>
    </VContainer>
  </div>
</template>

<script lang="ts" setup  >
import { requiredValidator } from '@validators';
import type { VForm } from 'vuetify/components';
// --- --- --- Store --- --- ---
import { useCrudEmployeeStore } from '@/pages/Employee/Store/useCrudEmployeeStore';
const storeEmployee = useCrudEmployeeStore()
const { action, formulario, charges } = storeToRefs(storeEmployee)

// --- --- END Store --- --- ---

const errors = ref<Array<string>>([])

const formValidation = ref<VForm>()

const changeScreen = async (typeAction: string) => {
  storeEmployee.typeAction = typeAction
  await formValidation.value?.resetValidation()
  errors.value = []
  if (typeAction != 'back')
    storeEmployee.keyList++
}

const submitForm = async () => {
  const validation = await formValidation.value?.validate()
  if (validation?.valid) {
    const data = await storeEmployee.fetchSave()
    if (data.code === 200) changeScreen("list");
    if (data.code === 422) errors.value = data.errors ?? []; //muestra error del back
  }
}

onMounted(async () => {
  await storeEmployee.fetchDataForm();
});

</script>

<template>
  <div>

    <HeaderAlertView sub-title="Cargo" :action="action" :validate-crud="true" :btn-back="true"
      @changeScreenBack="changeScreen" />

    <VContainer class="bg-vwhite" fluid>
      <VForm ref="formValidation" lazy-validation>
        <VRow>
          <VCol cols="4">
            <VTextField clearable v-model="formulario.name" :rules="[requiredValidator]" :error-messages="errors.name"
              @keypress="errors.name = ''">
              <template #label>
                Nombre&nbsp;<b class="text-warning">*</b>
              </template>
            </VTextField>
          </VCol>
          <VCol cols="4">
            <VTextField clearable v-model="formulario.last_name" :rules="[requiredValidator]"
              :error-messages="errors.last_name" @keypress="errors.last_name = ''">
              <template #label>
                Apellido&nbsp;<b class="text-warning">*</b>
              </template>
            </VTextField>
          </VCol>
          <VCol cols="4">
            <VTextField clearable v-model="formulario.number_identification" :rules="[requiredValidator]"
              :error-messages="errors.number_identification" @keypress="errors.number_identification = ''">
              <template #label>
                Documento&nbsp;<b class="text-warning">*</b>
              </template>
            </VTextField>
          </VCol>
          <VCol cols="4">
            <VSelect v-model="formulario.charge_id" :items="charges" item-title="label" item-value="value" persistent-hint
              label="Cargo *" :rules="[requiredValidator]" :error-messages="errors.charge_id"
              @keypress="errors.charge_id = ''" />
          </VCol>
          <VCol cols="4">
            <VTextField clearable v-model="formulario.phone" :rules="[requiredValidator]" :error-messages="errors.phone"
              @keypress="errors.phone = ''">
              <template #label>
                Celular&nbsp;<b class="text-warning">*</b>
              </template>
            </VTextField>
          </VCol>
          <VCol cols="4">
            <VTextField clearable v-model="formulario.indicator" :rules="[requiredValidator]"
              :error-messages="errors.indicator" @keypress="errors.indicator = ''">
              <template #label>
                Indicador&nbsp;<b class="text-warning">*</b>
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

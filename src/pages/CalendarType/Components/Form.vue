<script lang="ts" setup  >

//Stores
import { useCrudCalendarTypeStore } from '@/pages/CalendarType/Store/useCrudCalendarTypeStore';
const storeCalendarType = useCrudCalendarTypeStore()
const { action, formulario } = storeToRefs(storeCalendarType)


import { requiredValidator } from '@validators';
import type { VForm } from 'vuetify/components';
const errors = ref<Array<string>>([])

const formValidation = ref<VForm>()

const changeScreen = async (typeAction: string) => {
  storeCalendarType.typeAction = typeAction
  await formValidation.value?.resetValidation()
  errors.value = []
  if (typeAction != 'back')
    storeCalendarType.keyList++
}

const submitForm = async () => {
  const validation = await formValidation.value?.validate()
  if (validation?.valid) {
    const data = await storeCalendarType.fetchSave()
    if (data.code === 200) changeScreen("list");
    if (data.code === 422) errors.value = data.errors ?? []; //muestra error del back
  }
}

</script>

<template>
  <div>
    <HeaderAlertView sub-title="Tipo de calendario" :action="action" :validate-crud="true" :btn-back="true"
      @changeScreenBack="changeScreen('back')" />
    <VCard>
      <VCardText>
        <VForm ref="formValidation" lazy-validation>
          <VRow>
            <VCol cols="12" sm="6">
              <VTextField clearable v-model="formulario.name" :rules="[requiredValidator]" :error-messages="errors.name"
                @keypress="errors.name = ''">
                <template #label>
                  Nombre&nbsp;<b class="text-warning">*</b>
                </template>
              </VTextField>
            </VCol>
            <VCol cols="12" sm="6">
              <VTextField clearable type="color" v-model="formulario.color" :rules="[requiredValidator]"
                :error-messages="errors.color" @keypress="errors.color = ''">
                <template #label>
                  Color&nbsp;<b class="text-warning">*</b>
                </template>
              </VTextField>
            </VCol>
          </VRow>
          <!--Guardar-->
          <VDivider class="border-opacity-75 my-4" color="cprimary" :thickness="3" />
          <VRow class="pt-0">
            <VCol class="text-center" cols="12">
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

      </VCardText>

    </VCard>
  </div>
</template>

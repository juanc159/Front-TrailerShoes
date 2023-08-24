<script lang="ts" setup  >

import { useCrudDynamicMenuPageStore } from '@/pages/DynamicMenuPage/Store/useCrudDynamicMenuPageStore';
import { requiredValidator } from '@validators';
import type { VForm } from 'vuetify/components';

const storeDynamicMenuPage = useCrudDynamicMenuPageStore()
const { action, formulario, menus } = storeToRefs(storeDynamicMenuPage)
const arrayPrincipal = ref([{ value: true, title: 'Si' }, { value: false, title: 'No' }])


const iconsMdi: Array<string> = [
  'tabler-chevron-up',
  'tabler-check',
  'tabler-x',
  'tabler-circle-check',
  'tabler-info-circle',
  'tabler-alert-circle',
  'tabler-x',
  'tabler-chevron-left',
  'tabler-chevron-right',
  'custom-checked-checkbox',
  'custom-unchecked-checkbox',
  'custom-indeterminate-checkbox',
  'tabler-circle',
  'tabler-arrow-up',
  'tabler-chevron-down',
  'tabler-menu-2',
  'tabler-caret-down',
  'tabler-chevron-down',
  'custom-checked-radio',
  'custom-unchecked-radio',
  'tabler-pencil',
  'custom-star-empty',
  'custom-star-fill',
  'custom-star-half',
  'tabler-refresh',
  'tabler-player-skip-back',
  'tabler-player-skip-forward',
  'tabler-arrows-move-vertical',
  'tabler-paperclip',
  'tabler-plus',
  'tabler-minus',
  'tabler-arrow-up',
  'tabler-arrow-down',
]

const errors = ref<Array<string>>([]);
const formValidation = ref<VForm>();

const changeScreen = async (typeAction: string) => {
  await formValidation.value?.resetValidation();
  storeDynamicMenuPage.typeAction = typeAction
  if (typeAction != 'back')
    storeDynamicMenuPage.keyList++
}

const submitForm = async () => {
  const validation = await formValidation.value?.validate();
  if (validation?.valid) {
    const data = await storeDynamicMenuPage.fetchSave()
    if (data.code === 200) changeScreen('save')
    if (data.code === 422) errors.value = data.errors ?? []; //muestra error del back
  }
} 
</script>

<template>
  <div>
    <HeaderAlertView sub-title="Menú dinámico páginas" :action="action" :validate-crud="true" :btn-back="true"
      @changeScreenBack="changeScreen('back')" />
    <VCard>
      <VCardText>
        <VForm ref="formValidation" lazy-validation>
          <VRow>
            <VCol cols="12" sm="6">
              <VTextField clearable v-model="formulario.title" :error-messages="errors.title"
                @keypress="errors.title = ''" :rules="[requiredValidator]">
                <template #label>
                  Título&nbsp;<b class="text-warning">*</b>
                </template>
              </VTextField>
            </VCol>
            <VCol cols="12" sm="6">
              <!-- <VTextField clearable v-model="formulario.icon" :error-messages="errors.icon" @keypress="errors.icon = ''"
                :rules="[requiredValidator]">
              </VTextField> -->
              <VSelect :items="iconsMdi" clearable v-model="formulario.icon" :error-messages="errors.icon" label="Icono"
                @update:model-value="errors.icon = ''" :rules="[requiredValidator]">
                <template #label>
                  Icono&nbsp;<b class="text-warning">*</b>
                </template>
              </VSelect>
            </VCol>
            <VCol cols="12" sm="6">
              <VSelect clearable :items="menus" item-value="id" item-title="title" v-model="formulario.father_id">
                <template #label>
                  Padre&nbsp;<b class="text-warning">*</b>
                </template>
              </VSelect>
            </VCol>
            <VCol cols="12" sm="6">
              <VSelect :items="arrayPrincipal" v-model="formulario.principal" label="¿Ruta Principal?">
              </VSelect>
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

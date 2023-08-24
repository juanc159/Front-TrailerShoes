<script lang="ts" setup>

import { requiredValidator } from '@validators'
import type { VForm } from 'vuetify/components'
import { useImageUpload } from '@/composables/useImageUpload'
// --- --- --- Store --- --- ---
import { useCompaniesStore } from '@/pages/Companies/Store/useCompaniesStore'
const companiesStore = useCompaniesStore()
const { action, formulario } = storeToRefs(companiesStore)
// Authentication
import { useAuthenticationStore } from '@/stores/useAuthenticationStore'
const authenticationStore = useAuthenticationStore()
const { company: authCompany } = storeToRefs(authenticationStore)
// --- --- END Store --- --- ---

// Files -> images
const imageIcon = ref(useImageUpload()), imageLogo = ref(useImageUpload()), imageCover = ref(useImageUpload())
const aExtImage = ['jpg', 'jpeg', 'png', 'gif']
imageIcon.value.allowedExtensions = aExtImage
imageLogo.value.allowedExtensions = aExtImage
imageCover.value.allowedExtensions = aExtImage


const errors = ref<Array<string>>([])
const formValidation = ref<VForm>()

const changeScreen = async (typeAction: string) => {
  companiesStore.typeAction = typeAction
  await formValidation.value?.resetValidation()
  errors.value = []
  if( typeAction != 'back' )
    companiesStore.keyList++
}

const submitForm = async () => {
  if( imageIcon.value.imageFile ) formulario.value.image_icon = imageIcon.value.imageFile
  if( imageLogo.value.imageFile ) formulario.value.image_logo = imageLogo.value.imageFile
  if( imageCover.value.imageFile ) formulario.value.image_cover = imageCover.value.imageFile

  const validation = await formValidation.value?.validate()
  if( validation?.valid ){
    const data = await companiesStore.fetchSave()
    if (data.code === 200) changeScreen("list");
    if (data.code === 422) errors.value = data.errors ?? []; //muestra error del back
  }
}

</script>

<template>
  <div>

    <HeaderAlertView sub-title="Cargo" :action="action" :validate-crud="true" :btn-back="true"
      @changeScreenBack="changeScreen"
    />

    <VContainer class="bg-vwhite" fluid>
      <VForm ref="formValidation" lazy-validation>
        <VRow>
          <VCol cols="12">
            <VTextField clearable v-model="formulario.name"
              :rules="[requiredValidator]" :error-messages="errors.name"
              @keypress="errors.name = ''">
              <template #label>
                Nombre&nbsp;<b class="text-warning">*</b>
              </template>
            </VTextField>
          </VCol>
          <!-- Icon -->
          <VCol cols="12" md="6">
            <VFileInput accept="image/*" :rules="(authCompany.image_icon)?[]:[requiredValidator]" :key="imageIcon.key"
              @change.once="imageIcon.handleImageSelected"
              @click:clear="imageIcon.clearData">
              <template #label>
                Icono&nbsp;<b class="text-warning">*</b>
              </template>
            </VFileInput>
          </VCol>
          <VCol cols="12" md="6" v-show="imageIcon.imageUrl || authCompany.image_icon">
            <VImg class="text-white" height="200" cover :src="imageIcon.imageUrl ?? authCompany.image_icon">
              <VToolbar color="rgba(0, 0, 0, 0)" theme="dark">
                <VToolbarTitle class="text-h4">
                  <b class="bg-cprimary px-2" style="opacity: 0.7;">
                    Vista previa
                  </b>
                </VToolbarTitle>
              </VToolbar>
            </VImg>
          </VCol>
          <!-- logo -->
          <VCol cols="12" md="6">
            <VFileInput accept="image/*" :rules="(authCompany.image_logo)?[]:[requiredValidator]" :key="imageLogo.key"
              @change.once="imageLogo.handleImageSelected"
              @click:clear="imageLogo.clearData">
              <template #label>
                Logo&nbsp;<b class="text-warning">*</b>
              </template>
            </VFileInput>
          </VCol>
          <VCol cols="12" md="6" v-show="imageLogo.imageUrl || authCompany.image_logo">
            <VImg class="text-white" height="200" cover :src="imageLogo.imageUrl ?? authCompany.image_logo">
              <VToolbar color="rgba(0, 0, 0, 0)" theme="dark">
                <VToolbarTitle class="text-h4">
                  <b class="bg-cprimary px-2" style="opacity: 0.7;">Vista previa</b>
                </VToolbarTitle>
              </VToolbar>
            </VImg>
          </VCol>
          <!-- image_cover -->
          <VCol cols="12" md="6">
            <VFileInput accept="image/*" :rules="(authCompany.image_cover)?[]:[requiredValidator]" :key="imageCover.key"
              @change.once="imageCover.handleImageSelected"
              @click:clear="imageCover.clearData">
              <template #label>
                Portada&nbsp;<b class="text-warning">*</b>
              </template>
            </VFileInput>
          </VCol>
          <VCol cols="12" md="6" v-show="imageCover.imageUrl || authCompany.image_cover">
            <VImg class="text-white" height="200" cover :src="imageCover.imageUrl ?? authCompany.image_cover">
              <VToolbar color="rgba(0, 0, 0, 0)" theme="dark">
                <VToolbarTitle class="text-h4">
                  <b class="bg-cprimary px-2" style="opacity: 0.7;">Vista previa</b>
                </VToolbarTitle>
              </VToolbar>
            </VImg>
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

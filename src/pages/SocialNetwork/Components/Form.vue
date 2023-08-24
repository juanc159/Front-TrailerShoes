<script lang="ts" setup  >
import { useImageUpload } from '@/composables/useImageUpload';

// --- --- Store ---- --- --
import { useCrudSocialNetworkStore } from '@/pages/SocialNetwork/Store/useCrudSocialNetworkStore';
const storeSocialNetwork = useCrudSocialNetworkStore()
const { action, formulario } = storeToRefs(storeSocialNetwork)
// --- --- Endstore ---- --- --
import { requiredValidator } from '@validators';
import type { VForm } from 'vuetify/components';
const errors = ref<Array<string>>([])
const archive = ref(useImageUpload());


const formValidation = ref<VForm>()

const changeScreen = async (typeAction: string) => {
  storeSocialNetwork.typeAction = typeAction
  await formValidation.value?.resetValidation()
  archive.value.clearData();
  errors.value = []
  if (typeAction != 'back')
    storeSocialNetwork.keyList++
}

const submitForm = async () => {
  if (archive.value.imageFile) {
    formulario.value.path = archive.value.imageFile
  }
  const validation = await formValidation.value?.validate()
  if (validation?.valid) {
    const data = await storeSocialNetwork.fetchSave()
    if (data.code === 200) changeScreen("list");
    if (data.code === 422) errors.value = data.errors ?? []; //muestra error del back
  }
}
const arrayValidation = ref<Array<string | boolean>>([])

watch(formulario, (newValue, oldValue) => {
  if (!newValue.id) {
    arrayValidation.value["path"] = [requiredValidator(archive.value.imageUrl)]
  }
  else {
    arrayValidation.value["path"] = []
  }
}, { deep: true });

</script>

<template>
  <div>
    <HeaderAlertView sub-title="Red Social" :action="action" :validate-crud="true" :btn-back="true"
      @changeScreenBack="changeScreen('back')" />
    <VCard>
      <VCardText>
        <VForm ref="formValidation" lazy-validation>
          <VRow>
            <VCol cols="12" sm="6" md="4">
              <VTextField clearable v-model="formulario.name" :rules="[requiredValidator]" :error-messages="errors.name"
                @keypress="errors.name = ''">
                <template #label>
                  Nombre&nbsp;<b class="text-warning">*</b>
                </template>
              </VTextField>
            </VCol>
            <VCol cols="12" sm="6" md="4">
              <VTextField clearable v-model="formulario.url" :rules="[requiredValidator]" :error-messages="errors.url"
                @keypress="errors.url = ''">
                <template #label>
                  Url&nbsp;<b class="text-warning">*</b>
                </template>
              </VTextField>
            </VCol>
            <VCol cols="12" md="4">
              <VFileInput @change="archive.handleImageSelected" :rules="arrayValidation['path']" :key="archive.key"
                @click:clear="archive.clearData">
                <template #label>
                  Adjuntar archivo&nbsp;<b class="text-warning">*</b>
                </template>
              </VFileInput>
            </VCol>
          </VRow>
          <VCol cols="12">
            <VImg contain :src="archive.imageUrl ?? formulario.path" alt="foto Personal" :max-width="200"
              class="mx-auto" />
          </VCol>
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

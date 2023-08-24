<script setup lang="ts">
import { requiredValidator } from '@/@core/utils/validators';
import { useImageUpload } from '@/composables/useImageUpload';
import { useDynamicPageStore } from '@/pages/DynamicPage/Store/useDynamicPageStore';
import type { VForm } from 'vuetify/components';
const formFileValidation = ref<VForm>();

const archive = ref(useImageUpload());

const dynamicPageStore = useDynamicPageStore()
const { modalModuleImage, arraySections, sectionSelected, rowSelected, columnsSelected, editModuleImage, typeModuleImage } = storeToRefs(dynamicPageStore)

onMounted(() => {
  if (editModuleImage.value) {
    archive.value.imageFile = arraySections.value[sectionSelected.value].arrayRows[rowSelected.value].columns[columnsSelected.value].contentImage.imageFile
    archive.value.imageUrl = arraySections.value[sectionSelected.value].arrayRows[rowSelected.value].columns[columnsSelected.value].contentImage.imageUrl
  }
})

const saveData = async () => {
  const validation = await formFileValidation.value?.validate()
  if (validation?.valid) {
    arraySections.value[sectionSelected.value].arrayRows[rowSelected.value].columns[columnsSelected.value].contentImage = {
      imageFile: archive.value.imageFile,
      imageUrl: archive.value.imageUrl,
      typeModuleImage: typeModuleImage.value,
    }
    modalModuleImage.value = false
    clearFormFile()
  }

}
const closeMenuModule = () => {
  modalModuleImage.value = false
  clearFormFile()
}

const clearFormFile = () => {
  archive.value.clearData()
}

</script>
<template>
  <div>
    <VDialog v-model="modalModuleImage" width="800" persistent>

      <!-- Dialog close btn -->
      <DialogCloseBtn @click="closeMenuModule()" />

      <!-- Dialog Content -->
      <VCard>

        <VCardTitle primary-title>
          <span>Imagen</span>
        </VCardTitle>

        <VCardText>
          <VForm ref="formFileValidation" lazy-validation>
            <VFileInput @change="archive.handleImageSelected" :rules="[requiredValidator]" :key="archive.key"
              @click:clear="clearFormFile()"></VFileInput>
          </VForm>
        </VCardText>
        <VCardText>
          <VImg :src="archive.imageUrl"></VImg>
        </VCardText>


        <VCardText class="d-flex justify-end">
          <VBtn size="40" color="error" icon @click="closeMenuModule()" class="mr-3">
            <VIcon size="30" icon="tabler-circle-x"></VIcon>
          </VBtn>
          <VBtn size="40" color="success" icon @click="saveData()">
            <VIcon size="30" icon="tabler-circle-check"></VIcon>
          </VBtn>
        </VCardText>
      </VCard>
    </VDialog>
  </div>
</template>
<style lang="scss">
.tox-tinymce-aux {
  z-index: 9999 !important;
}

.tox-notifications-container {
  display: none;
}
</style>

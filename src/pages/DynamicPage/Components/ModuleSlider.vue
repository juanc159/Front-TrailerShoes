<script setup lang="ts">
import { requiredValidator } from '@/@core/utils/validators'
import { useImageUpload } from '@/composables/useImageUpload'
import { useToast } from '@/composables/useToast'
import { useDynamicPageStore } from '@/pages/DynamicPage/Store/useDynamicPageStore'
import { VForm } from 'vuetify/components'
import { VDataTable } from 'vuetify/labs/VDataTable'

const toast = useToast()
const formFileValidation = ref<VForm>()

const archive = ref(useImageUpload())

const dynamicPageStore = useDynamicPageStore()
const { modalModuleSlider, arraySections, sectionSelected, rowSelected, columnsSelected, editModuleSlider } = storeToRefs(dynamicPageStore)

const arrayImages = ref<Array<object>>([])

onMounted(() => {
  if (editModuleSlider.value) {
    const arrayImagesCopy = Object.assign([], arraySections.value[sectionSelected.value].arrayRows[rowSelected.value].columns[columnsSelected.value].contentSlider);
    arrayImages.value = arrayImagesCopy
  }
})

const clearFormFile = () => {
  archive.value.clearData()
}

const closeMenuModule = () => {
  modalModuleSlider.value = false
  arrayImages.value = []
  clearFormFile()
}

const saveData = async () => {
  if (arrayImages.value.length > 1) {
    arraySections.value[sectionSelected.value].arrayRows[rowSelected.value].columns[columnsSelected.value].contentSlider = arrayImages.value
    closeMenuModule()
  }
  else {
    toast.toast('Advertencia', 'Debe agregar almenos dos imagenes', 'info')
  }
}

const headers = [
  { title: 'Imagen', sortable: false, key: 'image' },
  { title: 'Acciones', sortable: false, key: 'actions' },
]

const addImage = (e: any) => {
  archive.value.handleImageSelected(e)
  setTimeout(() => {
    let principal = false
    const cant = arrayImages.value.length
    if (cant == 0)
      principal = true
    arrayImages.value.push({
      imageFile: archive.value.imageFile,
      imageUrl: archive.value.imageUrl,
      principal,
    })
    archive.value.key++
  }, 1000)
}

const changePrincipal = (index: number) => {
  arrayImages.value.forEach(element => {
    element.principal = false
  })
  arrayImages.value[index].principal = true
}

const deleteImage = (index: number) => {
  arrayImages.value.splice(index, 1)
  arraySections.value[sectionSelected.value].arrayRows[rowSelected.value].columns[columnsSelected.value].keySlider++
}
</script>

<template>
  <div>
    <VDialog v-model="modalModuleSlider" width="800" persistent>
      <!-- Dialog close btn -->
      <DialogCloseBtn @click="closeMenuModule" />

      <!-- Dialog Content -->
      <VCard>
        <VCardTitle primary-title>
          <span>Slider</span>
        </VCardTitle>

        <VCardText>
          <VForm ref="formFileValidation" lazy-validation>
            <VFileInput :key="archive.key" accept="image/*" :rules="[requiredValidator]" @change.once="addImage($event)"
              @click:clear="clearFormFile" />
          </VForm>
        </VCardText>

        <VCardText>
          <VDataTable :headers="headers" :items="arrayImages">
            <template #item.image="{ item }">
              <VImg :src="item.raw.imageUrl" />
            </template>
            <template #item.actions="{ item, index }">
              <VCheckbox v-model="item.raw.principal" label="Principal" @change="changePrincipal(index)" />
              <VBtn icon size="x-small" color="error" variant="text" @click="deleteImage(index)">
                <VIcon size="22" icon="tabler-trash" />
                <VTooltip activator="parent" location="top">
                  Borrar
                </VTooltip>
              </VBtn>
            </template>
            <template #bottom />
          </VDataTable>
        </VCardText>

        <VCardText class="d-flex justify-end">
          <VBtn size="40" color="error" icon class="mr-3" @click="closeMenuModule">
            <VIcon size="30" icon="tabler-circle-x" />
          </VBtn>
          <VBtn size="40" color="success" icon @click="saveData">
            <VIcon size="30" icon="tabler-circle-check" />
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

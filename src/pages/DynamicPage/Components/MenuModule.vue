<script setup lang="ts">
import { useDynamicPageStore } from '@/pages/DynamicPage/Store/useDynamicPageStore';
const dynamicPageStore = useDynamicPageStore()
const { arraySections, modalModuleText, rowSelected, sectionSelected, columnsSelected,
  modalModuleCalendar, modalModuleImage, typeModuleImage, modalModuleSlider, modalModulePopUps, modalModuleForm, modalModuleSocialNetwork, arrayForms, forms, formsRequerimentsInternal } = storeToRefs(dynamicPageStore)

const { indexRow, indexSection, indexColumn } = defineProps({
  indexRow: {
    type: Number,
    required: true
  },
  indexSection: {
    type: Number,
    required: true
  },
  indexColumn: {
    type: Number,
    required: true
  }
})

const menuModule = ref<boolean>(false)

const openModuleText = () => {
  modalModuleText.value = true
}
const openModuleSlider = () => {
  modalModuleSlider.value = true
}
const openModuleImage = (type: string) => {
  modalModuleImage.value = true
  typeModuleImage.value = type
}
const openModulePopUps = () => {
  modalModulePopUps.value = true
}
const openModuleForm = (type: string) => {
  console.log("type", type);

  modalModuleForm.value = true
  arrayForms.value = [];
  console.log("arrayForms", arrayForms.value);
  if (type == 'normales') {
    arrayForms.value = JSON.parse(JSON.stringify(forms.value))
  }
  if (type == 'externos') {
    arrayForms.value = JSON.parse(JSON.stringify(formsRequerimentsInternal.value))
  }
  console.log("arrayForms", arrayForms.value);

}
const openModuleSocialNetwork = () => {
  modalModuleSocialNetwork.value = true
}
const openModuleCalendar = () => {
  modalModuleCalendar.value = true
  arraySections.value[sectionSelected.value].arrayRows[rowSelected.value].columns[columnsSelected.value].contentCalendar = 1

}
const openMenuModule = () => {
  rowSelected.value = indexRow
  sectionSelected.value = indexSection
  columnsSelected.value = indexColumn
  menuModule.value = true
}

</script>
<template>
  <div>
    <VMenu>
      <template #activator="{ props }">
        <VBtn v-bind="props" icon color="primary" variant="tonal" @click="openMenuModule()">
          <VIcon icon="tabler-plus"></VIcon>
        </VBtn>
      </template>

      <VCard min-width="400">
        <VToolbar color="primary">
          <VToolbarTitle>Insertar Módulo</VToolbarTitle>
        </VToolbar>
        <VCardText>
          <VRow>
            <VCol>
              <VBtn @click="openModuleImage('image')">
                Imagen
                <VIcon end icon="tabler-photo" />
              </VBtn>
            </VCol>
            <VCol>
              <VBtn @click="openModuleText()">
                Texto
                <VIcon end icon="tabler-letter-t" />
              </VBtn>
            </VCol>
            <VCol
              v-if="arraySections[sectionSelected].arrayRows[rowSelected].columns[columnsSelected].classCol == 'col-12'">
              <VBtn @click="openModuleImage('banner')">
                Banner
                <VIcon end icon="tabler-layout-collage" />
              </VBtn>
            </VCol>
            <VCol>
              <VBtn @click="openModuleSlider()">
                slider
                <VIcon end icon="tabler-adjustments" />
              </VBtn>
            </VCol>
            <VCol>
              <VBtn @click="openModulePopUps()">
                Pop Ups
                <VIcon end icon="tabler-message-circle-2" />
              </VBtn>
            </VCol>
            <VCol>
              <VBtn @click="openModuleForm('normales')">
                Formularios
                <VIcon end icon="mdi-list-box" />
              </VBtn>
            </VCol>
            <VCol>
              <VBtn @click="openModuleForm('externos')">
                Requerimientos
                <VIcon end icon="mdi-list-box" />
              </VBtn>
            </VCol>
            <VCol>
              <VBtn @click="openModuleSocialNetwork()">
                Redes Sociales
                <VIcon end icon="mdi-wan" />
              </VBtn>
            </VCol>
            <VCol>
              <VBtn @click="openModuleCalendar()">
                Calendario
                <VIcon end icon="mdi-calendar" />
              </VBtn>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VMenu>
  </div>
</template>
 
<script setup lang="ts">
import { useDynamicPageStore } from '@/pages/DynamicPage/Store/useDynamicPageStore'


const arrayInicio = ref([{ value: true, title: 'Si' }, { value: false, title: 'No' }])
const colors = ref(["success", "warning", "error", "info"])
const dynamicPageStore = useDynamicPageStore()
const { modalModulePopUps, arraySections, sectionSelected, rowSelected, columnsSelected, editModulePopUps } = storeToRefs(dynamicPageStore)

const form = ref<{
  showStart: boolean
  showTitle: boolean
  titleButton: null | string
  colorButton: null | string
  title: null | string
  contentText: null | string
  isDialogVisible: boolean
}>({
  showStart: true,
  showTitle: true,
  titleButton: null,
  colorButton: null,
  title: null,
  contentText: null,
  isDialogVisible: true,
})


onMounted(() => {
  if (editModulePopUps.value) {
    form.value = JSON.parse(JSON.stringify(arraySections.value[sectionSelected.value].arrayRows[rowSelected.value].columns[columnsSelected.value].contentPopUps))
  }
})


const closeMenuModule = () => {
  modalModulePopUps.value = false
  form.value = {
    showStart: true,
    showTitle: true,
    titleButton: null,
    colorButton: null,
    title: null,
    contentText: null,
    isDialogVisible: true,
  }
}

const saveData = async () => {
  arraySections.value[sectionSelected.value].arrayRows[rowSelected.value].columns[columnsSelected.value].contentPopUps = JSON.parse(JSON.stringify(form.value))
  closeMenuModule()
}

watch(() => form.value.showStart, (newValue) => {
  form.value.isDialogVisible = newValue

  console.log("newValue", newValue);
  console.log("form.value", form.value);

});

</script>

<template>
  <div>
    <VDialog v-model="modalModulePopUps" width="800" persistent>
      <!-- Dialog close btn -->
      <DialogCloseBtn @click="closeMenuModule" />

      <!-- Dialog Content -->
      <VCard>
        <VCardTitle primary-title>
          <span>Pop Ups</span>
        </VCardTitle>

        <VCardText>
          <VRow>
            <VCol cols="6">
              <VSelect :items="arrayInicio" v-model="form.showStart" label="¿Mostrar desde el inicio?"></VSelect>
            </VCol>
            <VCol cols="6">
              <VSelect :items="arrayInicio" v-model="form.showTitle" label="¿Mostrar con título?"></VSelect>
            </VCol>
          </VRow>
          <VRow v-if="form.showTitle">
            <VCol>
              <VTextField v-model="form.title" label="Título" />
            </VCol>
          </VRow>
          <VRow v-if="!form.showStart">
            <VCol>
              <VTextField v-model="form.titleButton" label="Título del botón" />
            </VCol>
            <VCol>
              <VSelect :items="colors" v-model="form.colorButton" label="Color Botón"></VSelect>
            </VCol>
          </VRow>
          <VRow>
            <VCol>
              <Editor v-model="form.contentText" api-key="no-api-key" :init="{
                height: 500,
                menubar: true,
                plugins: [
                  'a11ychecker', 'advlist', 'advcode', 'advtable', 'autolink', 'checklist', 'export',
                  'lists', 'link', 'image', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks',
                  'powerpaste', 'fullscreen', 'formatpainter', 'insertdatetime', 'media', 'table', 'help', 'wordcount'
                ],
                toolbar:
                  'undo redo | casechange blocks | bold italic backcolor | \ alignleft aligncenter alignright alignjustify | \ bullist numlst checklist outdent indent | removeformat | a11ycheck code table help'
              }" initial-value="Welcome to TinyMCE Vue" />
            </VCol>
          </VRow>
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

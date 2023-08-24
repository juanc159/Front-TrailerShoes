<script setup lang="ts">
import { useDynamicPageStore } from '@/pages/DynamicPage/Store/useDynamicPageStore';
const dynamicPageStore = useDynamicPageStore()
const { modalModuleText, editModuleText, arraySections, sectionSelected, rowSelected, columnsSelected } = storeToRefs(dynamicPageStore)

const contentText = ref<string | null>(null)

onMounted(() => {
  if( editModuleText.value ){
    if( (typeof arraySections.value[sectionSelected.value].arrayRows[rowSelected.value].columns[columnsSelected.value]) == 'object' ){
      contentText.value = arraySections.value[sectionSelected.value].arrayRows[rowSelected.value].columns[columnsSelected.value].contentText
    }
  }
})

const saveData = () => {
  arraySections.value[sectionSelected.value].arrayRows[rowSelected.value].columns[columnsSelected.value].contentText = contentText.value
  closeMenuModule()
}

const closeMenuModule = () => {
  contentText.value = null
  modalModuleText.value = false
}
</script>

<template>
  <div>
    <VDialog v-model="modalModuleText" width="800" persistent>

      <!-- Dialog close btn -->
      <DialogCloseBtn @click="closeMenuModule()" />

      <!-- Dialog Content -->
      <VCard>

        <VCardTitle primary-title>
          <span>Contenido</span>
        </VCardTitle>

        <VCardText>
          <Editor v-model="contentText" api-key="no-api-key" :init="{
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

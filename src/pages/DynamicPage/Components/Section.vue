<script setup lang="ts">
import Row from "@/pages/DynamicPage/Components/Row.vue";
import { useDynamicPageStore } from '@/pages/DynamicPage/Store/useDynamicPageStore';
import draggable from 'vuedraggable';
const dynamicPageStore = useDynamicPageStore()
const { arraySections } = storeToRefs(dynamicPageStore)

const { indexSection } = defineProps({
  indexSection: {
    type: Number,
    required: true
  }
})

const menuRow = ref<boolean>(false)
const openMenuRow = () => {
  menuRow.value = true
}


const sortRows = computed(() => {
  return arraySections.value[indexSection].arrayRows.sort((a, b) => a.order - b.order);
})

const dragRow = ref<boolean>(false)

</script>
<template>
  <div>
    <VCard>
      <VCardTitle primary-title class="d-flex justify-content-between align-items-center">
        <span>
          Seccion {{ arraySections[indexSection].id }}
        </span>
        <VBtn icon color="error" variant="tonal" @click="dynamicPageStore.deleteSection(indexSection)">
          <VIcon icon="tabler-trash"></VIcon>
          <VTooltip location="top" activator="parent">
            Eliminar Sección
          </VTooltip>
        </VBtn>
      </VCardTitle>
      <VDivider />

      <draggable v-model="sortRows" :group="'section' + arraySections[indexSection].id" @start="dragRow = true"
        @end="dragRow = false" :item-key="'section' + arraySections[indexSection].id">
        <template #item="{ element, index }">
          <div>
            <VCardText>
              <Row :row="element" :indexSection="indexSection" :indexRow="index" @open-menu-row="openMenuRow"></Row>
            </VCardText>
          </div>
        </template>
      </draggable>

    </VCard>
  </div>
</template>
 
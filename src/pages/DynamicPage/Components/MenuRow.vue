<script setup lang="ts">
import Img12 from "@/assets/images/GridBootstrap/12.png";
import Img3 from "@/assets/images/GridBootstrap/3.png";
import Img6 from "@/assets/images/GridBootstrap/6.png";
import { useDynamicPageStore } from '@/pages/DynamicPage/Store/useDynamicPageStore';
const dynamicPageStore = useDynamicPageStore()
const { sectionSelected, rowSelected } = storeToRefs(dynamicPageStore)

const menuRow = ref<boolean>(false)
const { indexRow, indexSection } = defineProps({
  indexRow: {
    type: Number,
    required: true
  },
  indexSection: {
    type: Number,
    required: true
  }
})

const openMenuRow = () => {
  rowSelected.value = indexRow
  sectionSelected.value = indexSection
  menuRow.value = true
}

const addRow = (data: object) => {
  const columnsInfo = {
    classCol: "",
    cantColumns: 0,
  }

  columnsInfo.classCol = data.grid
  // columnsInfo.classCol = "col-" + data.grid
  columnsInfo.cantColumns = data.cols


  dynamicPageStore.addRow(columnsInfo)
}

const grids = <Array<object>>[
  { grid: 12, cols: 1 },
  { grid: 6, cols: 2 },
  { grid: 4, cols: 3 },
  { grid: 3, cols: 4 },
  { grid: 2, cols: 6 },
  { grid: 1, cols: 12 },
];

</script>
<template>
  <div>
    <VMenu v-model="menuRow">
      <template #activator="{ props }">
        <VBtn v-bind="props" icon color="success" variant="tonal" @click="openMenuRow()">
          <VIcon icon="tabler-plus"></VIcon>
        </VBtn>
      </template>


      <VCard min-width="800">
        <VToolbar color="primary">
          <VToolbarTitle>Insertar Fila</VToolbarTitle>
        </VToolbar>
        <VCardText>
        </VCardText>

        <template v-for="grid in grids">
          <VCardText class="text-center" style="cursor: pointer;" @click="addRow(grid)">
            <h4>Grilla de {{ grid.grid }}</h4>
            <VRow>
              <VCol :cols="grid.grid" v-for="(col, iC) in grid.cols" :key="iC">
                <v-progress-linear color="primary" model-value="100" :height="12"></v-progress-linear>
              </VCol>
            </VRow>
          </VCardText>
        </template>

      </VCard>
    </VMenu>
  </div>
</template>
 
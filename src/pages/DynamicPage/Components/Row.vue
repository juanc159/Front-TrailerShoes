<script setup lang="ts">
import calendarImg from '@/assets/images/Calendar.webp'
import MenuModule from '@/pages/DynamicPage/Components/MenuModule.vue'
import { useDynamicPageStore } from '@/pages/DynamicPage/Store/useDynamicPageStore'
import MenuRow from './MenuRow.vue'

const { row, indexRow, indexSection } = defineProps({
  row: {
    type: Object,
    required: true,
  },
  indexRow: {
    type: Number,
    required: true,
  },
  indexSection: {
    type: Number,
    required: true,
  },
})

const dynamicPageStore = useDynamicPageStore()

const {
  arraySections, keyComponentModuleText, editModuleText, modalModuleText, rowSelected, sectionSelected,
  columnsSelected, keyComponentModuleImage, editModuleImage, modalModuleImage, keyComponentModuleSlider, editModuleSlider, modalModuleSlider,
  keyComponentModulePopUps, editModulePopUps, modalModulePopUps,
  keyComponentModuleForm, editModuleForm, modalModuleForm,
  keyComponentModuleSocialNetwork, editModuleSocialNetwork, modalModuleSocialNetwork,
  keyComponentModuleCalendar, editModuleCalendar, modalModuleCalendar
} = storeToRefs(dynamicPageStore)

const deleteRow = () => {
  rowSelected.value = indexRow
  sectionSelected.value = indexSection
  dynamicPageStore.deleteRow()
}

const showButtonModuleText = ref<boolean>(false)
const showButtonModuleImage = ref<boolean>(false)
const showButtonModuleSlider = ref<boolean>(false)
const showButtonModulePopUps = ref<boolean>(false)
const showButtonModuleForm = ref<boolean>(false)
const showButtonModuleSocialNetwork = ref<boolean>(false)
const showButtonModuleCalendar = ref<boolean>(false)

const openEditModule = (module: string, indexColumn: number) => {
  rowSelected.value = indexRow
  sectionSelected.value = indexSection
  columnsSelected.value = indexColumn

  if (module == 'TEXT') {
    keyComponentModuleText.value++
    editModuleText.value = true
    modalModuleText.value = true
  }
  if (module == 'IMAGE') {
    keyComponentModuleImage.value++
    editModuleImage.value = true
    modalModuleImage.value = true
  }
  if (module == 'SLIDER') {
    keyComponentModuleSlider.value++
    editModuleSlider.value = true
    modalModuleSlider.value = true
  }
  if (module == 'POPUPS') {
    keyComponentModulePopUps.value++
    editModulePopUps.value = true
    modalModulePopUps.value = true
  }
  if (module == 'FORM') {
    keyComponentModuleForm.value++
    editModuleForm.value = true
    modalModuleForm.value = true
  }
  if (module == 'SOCIALNETWORK') {
    keyComponentModuleSocialNetwork.value++
    editModuleSocialNetwork.value = true
    modalModuleSocialNetwork.value = true
  }
  if (module == 'CALENDAR') {
    keyComponentModuleCalendar.value++
    editModuleCalendar.value = true
    modalModuleCalendar.value = true
  }

}

const deleteModule = (module: string, indexColumn: number) => {
  rowSelected.value = indexRow
  sectionSelected.value = indexSection
  columnsSelected.value = indexColumn
  if (module == 'TEXT') {
    arraySections.value[sectionSelected.value].arrayRows[rowSelected.value].columns[columnsSelected.value].contentText = null
  }
  if (module == 'IMAGE') {
    arraySections.value[sectionSelected.value].arrayRows[rowSelected.value].columns[columnsSelected.value].contentImage = null
  }
  if (module == 'SLIDER') {
    arraySections.value[sectionSelected.value].arrayRows[rowSelected.value].columns[columnsSelected.value].contentSlider = []
  }
  if (module == 'POPUPS') {
    arraySections.value[sectionSelected.value].arrayRows[rowSelected.value].columns[columnsSelected.value].contentPopUps = null
  }
  if (module == 'FORM') {
    arraySections.value[sectionSelected.value].arrayRows[rowSelected.value].columns[columnsSelected.value].contentForm = null
  }
  if (module == 'SOCIALNETWORK') {
    arraySections.value[sectionSelected.value].arrayRows[rowSelected.value].columns[columnsSelected.value].contentSocialNetwork = null
  }
  if (module == 'CALENDAR') {
    arraySections.value[sectionSelected.value].arrayRows[rowSelected.value].columns[columnsSelected.value].contentCalendar = null
  }
}

</script>

<template>
  <div>
    <VCard>
      <VCardTitle primary-title>
        {{ row.name }}
      </VCardTitle>
      <VCardText>
        <VRow align="end">
          <VCol v-for="(column, index) in row.columns" :key="index" :cols="12 / row.columns">
            <MenuModule :index-row="indexRow" :index-section="indexSection" :index-column="index" />

            <!-- TEXT -->
            <div v-if="column.contentText" @mouseover="showButtonModuleText = true"
              @mouseleave="showButtonModuleText = false">
              <div v-html="column.contentText" />
              <VBtn v-if="showButtonModuleText" size="30" icon color="warning" @click="openEditModule('TEXT', index)">
                <VIcon icon="tabler-edit" />
              </VBtn>
              <VBtn v-if="showButtonModuleText" size="30" icon color="error" @click="deleteModule('TEXT', index)">
                <VIcon icon="tabler-trash" />
              </VBtn>
            </div>

            <!-- //IMAGE -->
            <div v-if="column.contentImage" @mouseover="showButtonModuleImage = true"
              @mouseleave="showButtonModuleImage = false">
              <div>
                <VImg :src="column.contentImage.imageUrl"
                  :style="`width:${column.contentImage.typeModuleImage}` == 'banner' ? '100%' : 'auto'" />
              </div>
              <VBtn v-if="showButtonModuleImage" size=" 30" icon color="warning" @click="openEditModule('IMAGE', index)">
                <VIcon icon="tabler-edit" />
              </VBtn>
              <VBtn v-if="showButtonModuleImage" size="30" icon color="error" @click="deleteModule('IMAGE', index)">
                <VIcon icon="tabler-trash" />
              </VBtn>
            </div>

            <!-- SLIDER -->
            <div v-if="column.contentSlider.length > 0" @mouseover="showButtonModuleSlider = true"
              @mouseleave="showButtonModuleSlider = false">
              <div>
                <VCarousel height="auto" hide-delimiters :key="column.keySlider">
                  <VCarouselItem v-for="(img, index) in column.contentSlider" :key="index" :src="img.imageUrl" cover />
                </VCarousel>
              </div>
              <VBtn v-if="showButtonModuleSlider" size=" 30" icon color="warning"
                @click="openEditModule('SLIDER', index)">
                <VIcon icon="tabler-edit" />
              </VBtn>
              <VBtn v-if="showButtonModuleSlider" size="30" icon color="error" @click="deleteModule('SLIDER', index)">
                <VIcon icon="tabler-trash" />
              </VBtn>
            </div>

            <!-- POP UPS -->
            <div v-if="column.contentPopUps" @mouseover="showButtonModulePopUps = true"
              @mouseleave="showButtonModulePopUps = false">
              <div>
                <VDialog v-model="column.contentPopUps.isDialogVisible" width="500">
                  <!-- Activator -->
                  <template #activator="{ props }">
                    <VBtn v-if="!column.contentPopUps.showStart" :color="column.contentPopUps.colorButton" v-bind="props">
                      {{ column.contentPopUps.titleButton }}
                    </VBtn>
                    <VBtn v-else color="secondary" v-bind="props">
                      Este es un modal oculto
                    </VBtn>
                  </template>


                  <!-- Dialog close btn -->
                  <DialogCloseBtn @click="column.contentPopUps.isDialogVisible = !column.contentPopUps.isDialogVisible" />

                  <!-- Dialog Content -->
                  <VCard>
                    <VCardTitle primary-title v-if="column.contentPopUps.showTitle">{{ column.contentPopUps.title }}
                    </VCardTitle>
                    <VCardText>
                      <div v-html="column.contentPopUps.contentText"></div>
                    </VCardText>
                  </VCard>
                </VDialog>
              </div>
              <VBtn v-if="showButtonModulePopUps" size=" 30" icon color="warning"
                @click="openEditModule('POPUPS', index)">
                <VIcon icon="tabler-edit" />
              </VBtn>
              <VBtn v-if="showButtonModulePopUps" size="30" icon color="error" @click="deleteModule('POPUPS', index)">
                <VIcon icon="tabler-trash" />
              </VBtn>
            </div>

            <!-- FORM -->
            <div v-if="column.contentForm" @mouseover="showButtonModuleForm = true"
              @mouseleave="showButtonModuleForm = false">
              <VCard>
                <VCardText>
                  <VRow>
                    <VCol cols="12" v-for="(item, index) in column.contentForm.arrayInputs" :key="index">
                      <VTextField v-if="item.type_input == 1" :label="item.label" />
                      <VSelect v-if="item.type_input == 2" :items="item.arrayOptions" :label="item.label"></VSelect>

                      <div v-if="item.type_input == 3">
                        <VLabel>{{ item.label }}</VLabel>
                        <VCheckbox v-for="(op, indexOP) in item.arrayOptions" :key="indexOP" :label="op.title"
                          :value="op.value">
                        </VCheckbox>
                      </div>
                      <div v-if="item.type_input == 4">
                        <VLabel>{{ item.label }}</VLabel>
                        <VRadioGroup>
                          <VRadio v-for="(op, indexOP) in item.arrayOptions" :key="indexOP" :label="op.title"
                            :value="op.value">
                          </VRadio>
                        </VRadioGroup>
                      </div>
                    </VCol>
                  </VRow>
                </VCardText>
              </VCard>
              <VBtn v-if="showButtonModuleForm" size="30" icon color="warning" @click="openEditModule('FORM', index)">
                <VIcon icon="tabler-edit" />
              </VBtn>
              <VBtn v-if="showButtonModuleForm" size="30" icon color="error" @click="deleteModule('FORM', index)">
                <VIcon icon="tabler-trash" />
              </VBtn>
            </div>

            <!-- SOCIAL NETWORK -->
            <div v-if="column.contentSocialNetwork" @mouseover="showButtonModuleSocialNetwork = true"
              @mouseleave="showButtonModuleSocialNetwork = false">
              <a :href="column.contentSocialNetwork.url" target="_blank" v-if="column.contentSocialNetwork">
                <VImg :src="column.contentSocialNetwork.path"></VImg>
              </a>
              <VBtn v-if="showButtonModuleSocialNetwork" size="30" icon color="warning"
                @click="openEditModule('SOCIALNETWORK', index)">
                <VIcon icon="tabler-edit" />
              </VBtn>
              <VBtn v-if="showButtonModuleSocialNetwork" size="30" icon color="error"
                @click="deleteModule('SOCIALNETWORK', index)">
                <VIcon icon="tabler-trash" />
              </VBtn>
            </div>

            <!-- CALENDAR -->
            <div v-if="column.contentCalendar" @mouseover="showButtonModuleCalendar = true"
              @mouseleave="showButtonModuleCalendar = false">
              <VCard title="Calendario">
                <VCardText>
                  <VImg :src="calendarImg"></VImg>
                </VCardText>
              </VCard>
              <VBtn v-if="showButtonModuleCalendar" size="30" icon color="warning"
                @click="openEditModule('CALENDAR', index)">
                <VIcon icon="tabler-edit" />
              </VBtn>
              <VBtn v-if="showButtonModuleCalendar" size="30" icon color="error" @click="deleteModule('CALENDAR', index)">
                <VIcon icon="tabler-trash" />
              </VBtn>
            </div>
          </VCol>
        </VRow>
      </VCardText>
      <VCardActions>
        <VSpacer />
        <MenuRow :index-row="indexRow" :index-section="indexSection" />

        <VBtn icon color="error" variant="tonal" @click="deleteRow">
          <VIcon icon="tabler-trash" />
        </VBtn>
        <VSpacer />
      </VCardActions>
    </VCard>
  </div>
</template>

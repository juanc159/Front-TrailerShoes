<script setup lang="ts">
import { useDynamicPageStore } from '@/pages/DynamicPage/Store/useDynamicPageStore'

const dynamicPageStore = useDynamicPageStore()
const { modalModuleForm, arraySections, sectionSelected, rowSelected, columnsSelected, editModuleForm, arrayForms } = storeToRefs(dynamicPageStore)

const form = ref<{
  form_id: null | number
}>({
  form_id: null,
})


onMounted(() => {
  if (editModuleForm.value) {
    form.value.form_id = JSON.parse(JSON.stringify(arraySections.value[sectionSelected.value].arrayRows[rowSelected.value].columns[columnsSelected.value].contentForm.value))
    formData.value = JSON.parse(JSON.stringify(arraySections.value[sectionSelected.value].arrayRows[rowSelected.value].columns[columnsSelected.value].contentForm))
  }
})


const closeMenuModule = () => {
  modalModuleForm.value = false
  form.value = {
    form_id: null
  }
  formData.value = null
}

const saveData = async () => {
  arraySections.value[sectionSelected.value].arrayRows[rowSelected.value].columns[columnsSelected.value].contentForm = JSON.parse(JSON.stringify(formData.value))
  closeMenuModule()
}
const formData = ref<null | object>(null)
const changeForm = async (e) => {
  const find = arrayForms.value.find(ele => ele.value == e)
  if (find)
    formData.value = find
}
</script>

<template>
  <div>

    <VDialog v-model="modalModuleForm" width="800" persistent>
      <!-- Dialog close btn -->
      <DialogCloseBtn @click="closeMenuModule" />

      <!-- Dialog Content -->
      <VCard>
        <VCardTitle primary-title>
          <span>Formularios</span>
        </VCardTitle>

        <VCardText>
          <VRow>
            <VCol cols="6">
              <VSelect clearable :items="arrayForms" v-model="form.form_id" label="Formularios"
                @update:model-value="changeForm($event)">
              </VSelect>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12">
              <VCard>
                <VCardText>
                  <VRow>
                    <VCol cols="12" v-for="(item, index) in formData?.arrayInputs" :key="index">
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

                      <div v-if="item.type_input == 5">
                        <VLabel>{{ item.label }}</VLabel>
                        <VFileInput show-size>
                          <template #selection="{ fileNames }">
                            <template v-for="fileName in fileNames" :key="fileName">
                              <VChip label size="small" variant="outlined" color="primary" class="me-2">
                                {{ fileName }}
                              </VChip>
                            </template>
                          </template>
                        </VFileInput>
                      </div>


                    </VCol>
                  </VRow>
                </VCardText>
              </VCard>
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

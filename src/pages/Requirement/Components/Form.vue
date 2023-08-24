<script lang="ts" setup  >
import { useImageUpload } from "@/composables/useImageUpload";
import { useSelect2Infite } from "@/composables/useSelect2Infite";
import IErrorsBack from "@/interfaces/Axios/IErrorsBack";
import { useRequirementStore } from '@/pages/Requirement/Store/useRequirementStore';
import { useAuthenticationStore } from '@/stores/useAuthenticationStore';
import { requiredValidator } from '@validators';
import type { VForm } from 'vuetify/components';
const authenticationStore = useAuthenticationStore()
const requirementStore = useRequirementStore()
const { action, formulario, requirementTypes_arrayInfo, requirementTypes_countLinks, loading, disabled } = storeToRefs(requirementStore)
const errors = ref<IErrorsBack>({})
const archive = ref(useImageUpload())
const formValidation = ref<VForm>()
const selectInfiniteRequirementTypes = useSelect2Infite(requirementStore.fetchSelectRequirementTypes, requirementTypes_arrayInfo, {});

const changeScreen = async (typeAction: string) => {
  requirementStore.typeAction = typeAction
  disabled.value = false
  requirementStore.clearFormulario()
  await formValidation.value?.resetValidation()
  errors.value = {}
  if (typeAction != 'back')
    requirementStore.keyList++
}

const submitForm = async () => {
  formulario.value.user_id = authenticationStore.user.id

  const validation = await formValidation.value?.validate()
  if (validation?.valid) {
    const data = await requirementStore.fetchSave()
    if (data.code === 200) {
      changeScreen("list")
      archive.value.key++
    }
    if (data.code === 422) errors.value = data.errors ?? {}; //muestra error del back
  }
}

onMounted(async () => {
  await requirementStore.fetchDataForm()
  selectInfiniteRequirementTypes.dataNueva.value = requirementTypes_arrayInfo.value;
  selectInfiniteRequirementTypes.totalLinks.value = requirementTypes_countLinks.value;

})

const changeRequirement_type_id = (event: any) => {
  formulario.value.formData = {}
  const search = selectInfiniteRequirementTypes.dataNueva.value.find(ele => ele.value == event)
  if (search) formulario.value.formData = JSON.parse(JSON.stringify(search))

}

const addFile = (e: any, index: number) => {
  archive.value.handleImageSelected(e)
  setTimeout(() => {
    formulario.value.formData.arrayInputs[index].answer = archive.value.imageFile

  }, 1000)
}

</script>

<template>
  <div>
    <HeaderAlertView sub-title="Solicitud" :action="action" :validate-crud="true" :btn-back="true"
      @changeScreenBack="changeScreen('back')" />
    <VCard>
      <VSelect class="my-5 px-4" clearable label="Solicitud" :items="selectInfiniteRequirementTypes.dataNueva.value"
        v-model="formulario.requirement_type_id" :error-messages="errors.requirement_type_id"
        @update:model-value="errors.requirement_type_id = ''; changeRequirement_type_id($event)"
        :rules="[requiredValidator]" :disabled="disabled">
        <template v-slot:prepend-item>
          <VTextField placeholder="Buscar..." class="mb-2" v-model="selectInfiniteRequirementTypes.searchQuery.value" />
          <v-divider></v-divider>
        </template>
        <template v-slot:append-item>
          <v-divider> </v-divider>
          <div class="d-flex justify-content-center aling-items-center">
            <v-progress-circular v-show="loading.selectRequirementTypes" size="24" color="primary"
              indeterminate></v-progress-circular>
          </div>
          <div v-if="!loading.selectRequirementTypes" class="d-flex justify-content-between aling-items-center p-2">
            <div>
              <VBtn class="mt-2" :disabled="selectInfiniteRequirementTypes.page.value <= 1"
                @click="selectInfiniteRequirementTypes.prev()" color="success">
                <VIcon icon="mdi-chevron-left"></VIcon>
              </VBtn>
              <VBtn class="mt-2"
                :disabled="selectInfiniteRequirementTypes.page.value >= selectInfiniteRequirementTypes.totalLinks.value"
                @click="selectInfiniteRequirementTypes.next()" color="success">
                <VIcon icon="mdi-chevron-right"></VIcon>
              </VBtn>
            </div>
          </div>
        </template>
      </VSelect>
      <VCardText>
        <VForm ref="formValidation" lazy-validation>
          <VRow>

            <VCol cols="12" v-for="(item, index) in formulario?.formData?.arrayInputs" :key="index">

              <VTextField v-if="item.type_input == 1" v-model="item.answer"
                :rules="item.required == 1 ? [requiredValidator] : []" :disabled="disabled">
                <template #label v-if="item.required">
                  {{ item.label }}&nbsp;<b class="text-warning">*</b>
                </template>
                <template #label v-else>
                  {{ item.label }}
                </template>
              </VTextField>

              <VSelect v-if="item.type_input == 2" :items="item.arrayOptions" item-value="id" item-title="name"
                v-model="item.answer" :rules="item.required == 1 ? [requiredValidator] : []" :disabled="disabled">
                <template #label v-if="item.required">
                  {{ item.label }}&nbsp;<b class="text-warning">*</b>
                </template>
                <template #label v-else>
                  {{ item.label }}
                </template>
              </VSelect>


              <div class="demo-space-x" v-if="item.type_input == 3">
                <VCheckbox v-model="item.answer" v-for="(option, indexO) in item.arrayOptions" :key="indexO"
                  :value="option.id" :rules="item.required == 1 ? [requiredValidator] : []" :disabled="disabled">
                  <template #label v-if="item.required">
                    {{ option.name }}&nbsp;<b class="text-warning">*</b>
                  </template>
                  <template #label v-else>
                    {{ option.name }}
                  </template>
                </VCheckbox>
              </div>

              <div v-if="item.type_input == 4">
                <VRadioGroup v-model="item.answer" :rules="item.required == 1 ? [requiredValidator] : []"
                  :disabled="disabled">
                  <VRadio v-for="(op, indexOP) in item.arrayOptions" :key="indexOP" :label="op.name" :value="op.id">
                  </VRadio>
                  <template #label v-if="item.required">
                    {{ item.label }}&nbsp;<b class="text-warning">*</b>
                  </template>
                  <template #label v-else>
                    {{ item.label }}
                  </template>
                </VRadioGroup>
              </div>

              <div v-if="item.type_input == 5">
                <VLabel>{{ item.label }}</VLabel>
                <VFileInput v-if="!disabled" show-size :key="archive.key" @change.once="addFile($event, index)"
                  @click:clear="archive.clearData()" :rules="item.required == 1 ? [requiredValidator] : []"
                  :disabled="disabled">
                  <template #selection="{ fileNames }">
                    <template v-for="fileName in fileNames" :key="fileName">
                      <VChip label size="small" variant="outlined" color="primary" class="me-2">
                        {{ fileName }}
                      </VChip>
                    </template>
                  </template>
                </VFileInput>
                <a v-if="disabled" :href="item.answer" :download="item.label" target="_blank">
                  <VIcon icon="mdi-download"></VIcon>
                  Descargar
                </a>
              </div>
            </VCol>
          </VRow>
          <!--Guardar-->
          <VDivider class="border-opacity-75 my-4" color="cprimary" :thickness="3" />
          <VRow class="pt-0" v-if="!disabled">
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

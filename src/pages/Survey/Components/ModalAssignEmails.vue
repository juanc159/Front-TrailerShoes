<script lang="ts" setup  >
import { requiredValidator } from '@/@core/utils/validators';
import { useConfig } from '@/composables/useConfig';
import { useCrudSurveyStore } from '@/pages/Survey/Store/useCrudSurveyStore';
import type { VForm } from 'vuetify/components';
const storeSurvey = useCrudSurveyStore()
const formValidation = ref<VForm>()
const emails = ref<string>("")
const isDialogVisible = ref<boolean>(false)
const loading = ref<boolean>(false)
const errors = ref<Array<string>>([])
const { baseURLFont } = useConfig()
const { obj } = defineProps({
  obj: {
    type: Object,
    required: true
  }
})

const submitForm = async () => {
  let formData = {}
  if (typeData.value == 'correos') {
    const validation = await formValidation.value?.validate()
    if (validation?.valid) {
      formData = {
        survey_id: obj.id,
        emails: emails.value,
        serverFront: baseURLFont.value,
        typeData: "correos",
      }
    }
  }
  if (typeData.value == 'cargos') {
    formData = {
      survey_id: obj.id,
      charges: chargesSelected.value,
      serverFront: baseURLFont.value,
      typeData: "cargos",
    }
  }
  loading.value = true;
  const data = await storeSurvey.sendEmails(formData)
  if (data.code === 200) isDialogVisible.value = false;
  if (data.code === 422) errors.value = data.errors ?? []; //muestra error del back
  loading.value = false;
}



const chargesSelected = ref([])

const typeData = ref<string>("")

const clearExpansion = (type: string) => {
  chargesSelected.value = []
  emails.value = ""
  typeData.value = type
}
</script>

<template>
  <div>
    <VDialog v-model="isDialogVisible" width="700">

      <!-- Activator -->
      <template v-slot:activator="{ props }">
        <VBtn icon color="default" variant="text" size="x-small" v-bind="props" @click="isDialogVisible = true">
          <VIcon size="22" icon="tabler-settings" />
          <v-tooltip activator="parent" location="top">Enviar Encuesta</v-tooltip>
        </VBtn>
      </template>

      <!-- Dialog close btn -->
      <DialogCloseBtn @click="isDialogVisible = !isDialogVisible" />

      <!-- Dialog Content -->
      <VCard :title="'Asignar Correos a ' + obj.name">
        <div v-show="loading == true" class="my-5">
          <PreloadInterno />
        </div>

        <VForm v-show="!loading" ref="formValidation" lazy-validation>
          <VCardText>
            <VExpansionPanels variant="accordion">
              <VExpansionPanel>
                <VExpansionPanelTitle @click="clearExpansion('correos')">
                  Envio por correos
                </VExpansionPanelTitle>
                <VExpansionPanelText class="py-4">
                  <VTextField v-model="emails" label="Correos" :rules="[requiredValidator]"
                    hint="Debe separar los correos mediantes (;)" />
                </VExpansionPanelText>
              </VExpansionPanel>
              <VExpansionPanel>
                <VExpansionPanelTitle @click="clearExpansion('cargos')">
                  Envio por cargos
                </VExpansionPanelTitle>

                <VExpansionPanelText>
                  <div class="demo-space-x">
                    <VCheckbox v-for="(item, index) in storeSurvey.charges" :key="index" v-model="chargesSelected"
                      :value="item.value" :label="item.title">
                    </VCheckbox>
                  </div>
                </VExpansionPanelText>
              </VExpansionPanel>
            </VExpansionPanels>
          </VCardText>

          <VCardText class="d-flex justify-end">
            <VBtn @click="submitForm()">
              Enviar
            </VBtn>
          </VCardText>
        </VForm>
      </VCard>
    </VDialog>
  </div>
</template>

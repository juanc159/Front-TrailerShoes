<script lang="ts" setup  >
import Swal from 'sweetalert2';
import { requiredValidator } from '@/@core/utils/validators';
import { useToast } from '@/composables/useToast';
import { useCrudSurveyStore } from '@/pages/Survey/Store/useCrudSurveyStore';
import type { VForm } from 'vuetify/components';
const toast = useToast()

const formValidation = ref<VForm>()

const storeSurvey = useCrudSurveyStore()
const route = useRoute()
const routes = useRouter()
const survey = ref({})
const messageScreen = ref<string | null>(null)

const sendAnswer = async () => {
  const validation = await formValidation.value?.validate()
  if (validation?.valid) {
    survey.value.email = route.params.email
    const data = await storeSurvey.saveAnswer(survey.value)
    if (data.code == 200) {
      routes.push("/")
      //messageScreen.value = "Usted ya ha respondido esta encuesta"
    }
  }
}


onMounted(async () => {
  const data = await storeSurvey.getInfoToAnswer(Number(route.params.id), route.params.email)
  if (data.code == 200) {
    for (const key in data.data) survey.value[key] = data.data[key]
  }
  if (data.code == 422) {
    toast.toast('Éxito', data.message, 'success')
    routes.push("/")
  }
})
</script>

<template>
  <div>
    <VContainer>
      <HeaderAlertView :title="survey.name" icon="mdi-list-box-outline" sub-title="Responder encuesta"
        :validate-crud="true" action="survey" />
      <VAlert class="mt-5" color="vwhite" title="Descripción del formulario" :text="survey.description"
        v-if="survey.description">
        <template #prepend>
          <VIcon color="info" size="x-large" icon="mdi-information-outline" />
        </template>
      </VAlert>
      <VAlert class="mt-5" color="vwhite" :title="messageScreen" v-if="messageScreen">
        <template #prepend>
          <VIcon color="info" size="x-large" icon="mdi-information-outline" />
        </template>
      </VAlert>


      <!-- <h1>Usted ya ha respondido esta encuesta</h1> -->
      <!-- <VCard v-if="messageScreen">
        <VCardText>
          <h1>{{ messageScreen }}</h1>
        </VCardText>
      </VCard> -->
      <VForm ref="formValidation" lazy-validation v-else>
        <VCard class="mt-3" v-for="(item, index) in survey.questions" :key="index">
          <VCardText>
            <VRow>
              <VCol class="d-flex">
                <h3> {{ item.question }}</h3><b class="text-warning">*</b>
              </VCol>
            </VRow>
            <div>

              <VTextarea rows="3" v-model="item.answer" v-if="item.type_question == 1" :rules="[requiredValidator]" />

              <VRadioGroup v-model="item.answer" v-if="item.type_question == 2" :rules="[requiredValidator]">
                <VRow>
                  <VCol :cols="(option.name.length) > 12 ? 12 : 6" :sm="(option.name.length) > 12 ? 6 : 4"
                    :md="(option.name.length) > 12 ? 4 : 3" v-for="(option, indexO) in item.options " :key="indexO">
                    <VRadio :label="option.name" :value="option.id" />
                  </VCol>
                </VRow>
              </VRadioGroup>

              <div class="demo-space-x" v-if="item.type_question == 3">
                <VRow>
                  <VCol :cols="(option.name.length) > 12 ? 12 : 6" :sm="(option.name.length) > 12 ? 6 : 4"
                    :md="(option.name.length) > 12 ? 4 : 3" v-for="(option, indexO) in item.options" :key="indexO">
                    <VCheckbox v-model="item.answer" :label="option.name" :value="option.id" />
                  </VCol>
                </VRow>
              </div>
            </div>
          </VCardText>
        </VCard>
        <VCard class="mt-3 ">
          <VCardText class="text-center pa-3">
            <VTooltip text="Enviar" location="top">
              <template v-slot:activator="{ props }">
                <VBtn class="ms-1" color="light" rounded="lg" v-bind="props" @click="sendAnswer()">
                  Enviar respuesta&nbsp;
                  <VIcon size="large" color="success" icon="mdi-send-variant-outline" />
                </VBtn>
              </template>
            </VTooltip>
          </VCardText>
        </VCard>
      </VForm>



    </VContainer>
  </div>
</template>

<route lang="yaml">
path: /surveyAnswer/:id/:email
meta:
  layout: blank
  action: read 
</route>
  
  
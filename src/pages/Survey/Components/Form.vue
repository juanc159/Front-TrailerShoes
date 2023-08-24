<script lang="ts" setup  >
import { requiredValidator } from '@/@core/utils/validators';

// Store
import { useCrudSurveyStore } from '@/pages/Survey/Store/useCrudSurveyStore';
const storeSurvey = useCrudSurveyStore()
const { action, formulario } = storeToRefs(storeSurvey)


import Swal from 'sweetalert2';
import type { VForm } from 'vuetify/components';
import { VDataTable } from 'vuetify/labs/VDataTable';
const errors = ref<Array<string>>([])

const formValidation = ref<VForm>()
const formQuestionValidation = ref<VForm>()
const formOptionValidation = ref<VForm>()
const arrayVariousAnswers = [{ value: 1, title: "Si" }, { value: 0, title: "No" }]

const changeScreen = async (typeAction: string) => {
  storeSurvey.typeAction = typeAction
  await formValidation.value?.resetValidation()
  errors.value = []
  if (typeAction != 'back')
    storeSurvey.keyList++
}

const submitForm = async () => {
  const validation = await formValidation.value?.validate()
  if (validation?.valid) {
    const data = await storeSurvey.fetchSave()
    if (data.code === 200) changeScreen("list");
    if (data.code === 422) errors.value = data.errors ?? []; //muestra error del back
  }
}

const formQuestion = ref<object>({
  question: null,
  type_question: null,
})
const formOption = ref<object>({
  name: null
})
const arrayOptions = ref<Array<object>>([])
const arrayTypeQuestions = ref([
  {
    value: 1,
    title: 'Abierta',
  },
  {
    value: 2,
    title: 'Cerrada',
  },
  {
    value: 3,
    title: 'Multiple',
  }
])

const clearFormQuestion = async () => {
  formQuestion.value = {
    question: null,
    type_question: null,
    arrayOptions: [],
  }
}
const addQuestion = async () => {
  const validation = await formQuestionValidation.value?.validate()
  if (validation?.valid) {
    if (formQuestion.value.type_question != 1 && arrayOptions.value.length == 0) {
      Swal.fire("Debe agregar almenos una opción  a la pregunta")
      return false
    }
    const type = arrayTypeQuestions.value.find(ele => ele.value == formQuestion.value.type_question)
    formulario.value.arrayQuestions.push({
      question: formQuestion.value.question,
      type_question: formQuestion.value.type_question,
      type_name: type.title,
      arrayOptions: []
    })

    arrayOptions.value.forEach(element => {
      formulario.value.arrayQuestions[formulario.value.arrayQuestions.length - 1].arrayOptions.push(element)
    });

    clearFormQuestion()
  }
}
const deleteQuestion = async (pos: number) => {
  if (formulario.value.arrayQuestions[pos].id) {
    formulario.value.arrayQuestions[pos].delete = "delete"
  } else {
    formulario.value.arrayQuestions.splice(pos, 1)
  }
}

const arrayQuestions = computed(() => {
  return formulario.value.arrayQuestions.filter(ele => ele.delete != 'delete')
})
const headers = [
  { title: '', key: 'data-table-expand', sortable: false },
  { title: 'Pregunta', key: 'question', sortable: false },
  { title: 'Tipo de pregunta', key: 'type_name', sortable: false },
  { title: 'Acciones', key: 'actions', sortable: false }
]

const clearFormOption = async () => {
  formQuestion.value = {
    question: null,
    type_question: null,
    arrayOptions: [],
  }
  arrayOptions.value = []
}
const addOption = async () => {
  const validation = await formOptionValidation.value?.validate()
  if (validation?.valid) {
    arrayOptions.value.push({
      name: formOption.value.name
    })
    formOption.value = {
      name: null
    }
  }
}

const deleteOption = async (pos: number) => {
  if (arrayOptions.value[pos].id) {
    arrayOptions.value[pos].delete = "delete"
  } else {
    arrayOptions.value.splice(pos, 1)
  }
}

const changeTypeQuestion = () => {
  arrayOptions.value = []
}
</script>

<template>
  <div>
    <HeaderAlertView sub-title="Encuesta" :action="action" :validate-crud="true" :btn-back="true"
      @changeScreenBack="changeScreen('back')" />
    <VCard>
      <VCardText>
        <VForm ref="formValidation" lazy-validation>
          <VRow>
            <VCol cols="12" md="4">
              <VTextField class="mt-6" v-model="formulario.name" :rules="[requiredValidator]"
                :error-messages="errors.name" @keypress="errors.name = ''">
                <template #label>
                  Nombre&nbsp;<b class="text-warning">*</b>
                </template>
              </VTextField>
            </VCol>
            <VCol cols="12" sm="6" md="4">
              <!-- label="Fecha inicio" -->
              <dl>
                <dt>
                  Fecha inicio&nbsp;<b class="text-warning">*</b>
                </dt>
                <dd>
                  <AppDateTimePicker v-model="formulario.startDate" :rules="[requiredValidator]"
                    :error-messages="errors.startDate" @change="errors.startDate = ''">
                  </AppDateTimePicker>
                </dd>
              </dl>
            </VCol>
            <VCol cols="12" sm="6" md="4">
              <dl>
                <dt>
                  Fecha fin&nbsp;<b class="text-warning">*</b>
                </dt>
                <dd>
                  <AppDateTimePicker v-model="formulario.endDate" :rules="[requiredValidator]"
                    :error-messages="errors.endDate" @change="errors.endDate = ''" />

                </dd>
              </dl>
            </VCol>
            <VCol cols="12" sm="4">
              <AppSelect clearable :items="arrayVariousAnswers" v-model="formulario.answerSeveralTimes"
                :rules="[requiredValidator]" :error-messages="errors.answerSeveralTimes"
                @change="errors.answerSeveralTimes = ''" label="Puede responder varias veces"></AppSelect>
            </VCol>
            <VCol cols="12">
              <VTextarea rows="2" label="Descripción" class="mt-6" v-model="formulario.description" />
            </VCol>
          </VRow>
        </VForm>
        <!--Agregar pregunta-->
        <VForm ref="formQuestionValidation" lazy-validation>

          <VRow>
            <VCol cols="12" class="pb-0">
              <VDivider class="border-opacity-75 mb-3" color="csecundary" :thickness="3" />
              <div class="d-flex">
                <VSheet class="w-100">
                  <b class="text-vblack fs-6 me-auto">Preguntas</b>
                </VSheet>
                <VSheet>
                  <VTooltip text="Pregunta" location="top">
                    <template v-slot:activator="{ props }">
                      <VBtn class="ms-1" color="light" rounded="lg" v-bind="props" @click="addQuestion()">
                        Agregar&nbsp;
                        <VIcon size="large" color="success" icon="mdi-plus" />
                      </VBtn>
                    </template>
                  </VTooltip>
                </VSheet>
              </div>
            </VCol>
            <VCol cols="12" sm="6">
              <VSelect clearable :rules="[requiredValidator]" @update:model-value="changeTypeQuestion()"
                :items="arrayTypeQuestions" v-model="formQuestion.type_question">

                <template #label>
                  Tipo de pregunta&nbsp;<b class="text-warning">*</b>
                </template>
              </VSelect>
            </VCol>
            <VCol cols="12">
              <VTextarea clearable v-model="formQuestion.question" :rules="[requiredValidator]">
                <template #label>
                  Pregunta&nbsp;<b class="text-warning">*</b>
                </template>
              </VTextarea>
            </VCol>

          </VRow>
        </VForm>

        <VForm ref="formOptionValidation" lazy-validation
          v-if="formQuestion.type_question && formQuestion.type_question != 1">

          <VRow>
            <VCol cols="4">
              <VTextField clearable v-model="formOption.name" :rules="[requiredValidator]" label="Opción" />
            </VCol>
            <VCol cols="4">
              <VBtn @click="addOption()">
                Agregar Opción
              </VBtn>
            </VCol>
          </VRow>
          <VRow v-for="(item, index) in arrayOptions" :key="index">
            <VCol cols="4">
              <VTextField v-model="item.name" :rules="[requiredValidator]" :label="'Opción #' + (index + 1)" />
            </VCol>
            <VCol cols="4">
              <VBtn size="x-small" color="error" variant="text" icon @click="deleteOption(index)">
                <VIcon size="22" icon="tabler-trash" />
                <v-tooltip activator="parent" location="top">Borrar</v-tooltip>
              </VBtn>
            </VCol>
          </VRow>
        </VForm>
        <VRow>
          <VCol cols="12">
            <VDataTable :headers="headers" :items="arrayQuestions">
              <template #item.actions="{ item, index }">
                <VBtn size="x-small" color="error" variant="text" icon @click="deleteQuestion(index)">
                  <VIcon size="22" icon="tabler-trash" />
                  <v-tooltip activator="parent" location="top">Borrar</v-tooltip>
                </VBtn>
              </template>

              <template #expanded-row="slotProps">
                <tr class="v-data-table__tr">
                  <td :colspan="headers.length" v-if="slotProps.item.raw.arrayOptions.length > 0">
                    <VRow class="my-1" v-for="(item, index) in slotProps.item.raw.arrayOptions" :key="index">
                      <VCol cols="1">
                        <VLabel>Opción {{ index + 1 }} : </VLabel>
                      </VCol>
                      <VCol cols="12">
                        <VTextField clearable v-model="item.name" :rules="[requiredValidator]" />
                      </VCol>
                    </VRow>
                  </td>
                  <td :colspan="headers.length" v-else>
                    <VRow class="my-1">
                      <VCol cols="12">
                        <b>Esta tipo de pregunta no posee opciones asociadas</b>
                      </VCol>
                    </VRow>
                  </td>
                </tr>
              </template>

              <template #item.question="{ item }">
                <VRow class="my-5">
                  <VCol cols="12">
                    <VTextarea clearable v-model="item.raw.question" :rules="[requiredValidator]"
                      :error-messages="errors.question" @keypress="errors.question = ''" />
                  </VCol>
                </VRow>
              </template>

              <template #bottom></template>

            </VDataTable>
          </VCol>
        </VRow>
        <!--Guardar-->
        <VDivider class="border-opacity-75 my-4" color="cprimary" :thickness="3" />
        <VRow class="pt-0">
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
      </VCardText>
    </VCard>
  </div>
</template>

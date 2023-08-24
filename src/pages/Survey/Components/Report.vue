<script lang="ts" setup  >
import { useCrudSurveyStore } from '@/pages/Survey/Store/useCrudSurveyStore';
const storeSurvey = useCrudSurveyStore()
const { action, dataReport, headers } = storeToRefs(storeSurvey)
const isDialogVisible = ref<boolean>(false)
const messageEmpty = ref<string>("Nadie ha contestado el mensaje");

const changeScreen = async (typeAction: string) => {
  storeSurvey.typeAction = typeAction
}


</script>
<template>
  <div>
    <HeaderAlertView title="Reporte" sub-title="Encuesta" icon="mdi-format-list-bulleted" :btn-back="true"
      @changeScreenBack="changeScreen('back')" />


    <VAlert class="mt-5" color="vwhite" title="No hay respuestas registradas a esta encuesta" v-if="!dataReport.length">
      <template #prepend>
        <VIcon color="info" size="x-large" icon="mdi-information-outline" />
      </template>
    </VAlert>

    <VRow v-else>
      <VCol cols="12">
        <VTable>
          <thead>
            <tr>
              <th>
                Correos
              </th>
              <th v-for="(item, index) in headers" :key="index">
                {{ item }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in dataReport" :key="index">
              <td>
                {{ item.email }}
              </td>
              <td v-for="(answerQuestion, indexAnswer) in item.pregunta" :key="indexAnswer">
                {{ (Array.isArray(answerQuestion.answer)) ? '' : answerQuestion.answer }}
                <ul v-if="Array.isArray(answerQuestion.answer) && answerQuestion.answer.length > 1">
                  <li v-for="(itemA, indexA) in answerQuestion.answer" :key="indexA">
                    {{ itemA }}
                  </li>
                </ul>
              </td>
              <!-- <td>
                {{ item.pregunta[index].answer }}
              </td>
              <td>
                <ul>
                  <li v-for="(itemL, indexL) in  item.pregunta[2].answer" :key="indexL">
                    {{ itemL }}

                  </li>
                </ul>
              </td> -->
            </tr>
          </tbody>
        </VTable>
      </VCol>
    </VRow>

  </div>
</template>
  
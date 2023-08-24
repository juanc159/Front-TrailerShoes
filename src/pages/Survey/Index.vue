<script setup lang="ts">

import Form from '@/pages/Survey/Components/Form.vue';
import Report from '@/pages/Survey/Components/Report.vue';
import TableList from '@/pages/Survey/Components/TableList.vue';
import { useCrudSurveyStore } from '@/pages/Survey/Store/useCrudSurveyStore';
const storeSurvey = useCrudSurveyStore()
const { typeAction } = storeToRefs(storeSurvey)

onUnmounted(() => {
  storeSurvey.$reset();
})

</script>

<template>
  <div>
    <TableList v-show="typeAction !== 'form' && typeAction !== 'report'" :key="storeSurvey.keyList" />
    <Form v-show="typeAction === 'form'" />
    <Report v-show="typeAction === 'report'" />
  </div>
</template>

<route lang="yaml">
meta:
  action: read
  subject: Auth
  redirectIfLoggedIn: true
  requiresAuth: true
  requiredPermission: survey.index
</route>


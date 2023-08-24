<script setup lang="ts">

import Form from '@/pages/RequirementType/Components/Form.vue';
import TableList from '@/pages/RequirementType/Components/TableList.vue';
import { useCrudRequirementTypeStore } from '@/pages/RequirementType/Store/useCrudRequirementTypeStore';
const storeRequirementType = useCrudRequirementTypeStore()
const { typeAction } = storeToRefs(storeRequirementType)

onUnmounted(() => {
  storeRequirementType.$reset();
})

</script>

<template>
  <div>
    <TableList v-show="typeAction !== 'form'" :key="storeRequirementType.keyList"/>
    <Form v-show="typeAction === 'form'"></Form>
    <p class="first-letter-uppercase">este es un ejemplo de texto</p>
  </div>
</template>

<route lang="yaml">
meta:
  action: read
  subject: Auth
  redirectIfLoggedIn: true
  requiresAuth: true
  requiredRequestType: requirementType.index
</route>


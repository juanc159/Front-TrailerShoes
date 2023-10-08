<script setup lang="ts">

import Form from '@/pages/Production/Components/Form.vue';
import TableList from '@/pages/Production/Components/TableList.vue';
import { useCrudProductionStore } from '@/pages/Production/Store/useCrudProductionStore';
const storeProduction = useCrudProductionStore()
const { typeAction } = storeToRefs(storeProduction)

onUnmounted(() => {
  storeProduction.$reset();
})

</script>

<template>
  <div>
    <TableList v-show="typeAction !== 'form'" :key="storeProduction.keyList" />
    <Form v-show="typeAction === 'form'"></Form>
  </div>
</template>

<route lang="yaml">
meta:
  action: read
  subject: Auth
  redirectIfLoggedIn: true
  requiresAuth: true
  requiredPermission: production.index
</route>


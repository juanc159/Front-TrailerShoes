<script setup lang="ts">

import Form from '@/pages/Loan/Components/Form.vue';
import TableList from '@/pages/Loan/Components/TableList.vue';
import { useCrudLoanStore } from '@/pages/Loan/Store/useCrudLoanStore';
const storeLoan = useCrudLoanStore()
const { typeAction } = storeToRefs(storeLoan)

onUnmounted(() => {
  storeLoan.$reset();
})

</script>

<template>
  <div>
    <TableList v-show="typeAction !== 'form'" :key="storeLoan.keyList" />
    <Form v-show="typeAction === 'form'"></Form>
  </div>
</template>

<route lang="yaml">
meta:
  action: read
  subject: Auth
  redirectIfLoggedIn: true
  requiresAuth: true
  requiredPermission: loan.index
</route>


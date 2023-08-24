<script setup lang="ts">

import Form from '@/pages/Charge/Components/Form.vue';
import TableList from '@/pages/Charge/Components/TableList.vue';
import { useCrudChargeStore } from '@/pages/Charge/Store/useCrudChargeStore';
const storeCharge = useCrudChargeStore()
const { typeAction } = storeToRefs(storeCharge)

onUnmounted(() => {
  storeCharge.$reset();
})

</script>

<template>
  <div>
    <TableList v-show="typeAction !== 'form'" :key="storeCharge.keyList"/>
    <Form v-show="typeAction === 'form'"></Form>
  </div>
</template>

<route lang="yaml">
meta:
  action: read
  subject: Auth
  redirectIfLoggedIn: true
  requiresAuth: true
  requiredPermission: charge.index
</route>


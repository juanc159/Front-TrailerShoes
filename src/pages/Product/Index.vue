<script setup lang="ts">

import Form from '@/pages/Product/Components/Form.vue';
import TableList from '@/pages/Product/Components/TableList.vue';
import { useCrudProductStore } from '@/pages/Product/Store/useCrudProductStore';
const storeProduct = useCrudProductStore()
const { typeAction } = storeToRefs(storeProduct)

onUnmounted(() => {
  storeProduct.$reset();
})

</script>

<template>
  <div>
    <TableList v-show="typeAction !== 'form'" :key="storeProduct.keyList" />
    <Form v-show="typeAction === 'form'"></Form>
  </div>
</template>

<route lang="yaml">
meta:
  action: read
  subject: Auth
  redirectIfLoggedIn: true
  requiresAuth: true
  requiredPermission: product.index
</route>


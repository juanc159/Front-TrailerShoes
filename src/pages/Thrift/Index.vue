<script setup lang="ts">

import Form from '@/pages/Thrift/Components/Form.vue';
import TableList from '@/pages/Thrift/Components/TableList.vue';
import { useCrudThriftStore } from '@/pages/Thrift/Store/useCrudThriftStore';
const storeThrift = useCrudThriftStore()
const { typeAction } = storeToRefs(storeThrift)

onUnmounted(() => {
  storeThrift.$reset();
})

</script>

<template>
  <div>
    <TableList v-show="typeAction !== 'form'" :key="storeThrift.keyList" />
    <Form v-show="typeAction === 'form'"></Form>
  </div>
</template>

<route lang="yaml">
meta:
  action: read
  subject: Auth
  redirectIfLoggedIn: true
  requiresAuth: true
  requiredPermission: thrift.index
</route>


<script setup lang="ts">

import Form from '@/pages/Style/Components/Form.vue';
import TableList from '@/pages/Style/Components/TableList.vue';
import { useCrudStyleStore } from '@/pages/Style/Store/useCrudStyleStore';
const storeStyle = useCrudStyleStore()
const { typeAction } = storeToRefs(storeStyle)

onUnmounted(() => {
  storeStyle.$reset();
})

</script>

<template>
  <div>
    <TableList v-show="typeAction !== 'form'" :key="storeStyle.keyList" />
    <Form v-show="typeAction === 'form'"></Form>
  </div>
</template>

<route lang="yaml">
meta:
  action: read
  subject: Auth
  redirectIfLoggedIn: true
  requiresAuth: true
  requiredPermission: style.index
</route>


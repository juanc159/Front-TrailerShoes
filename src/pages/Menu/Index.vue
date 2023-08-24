<script setup lang="ts">
import Form from '@/pages/Menu/Components/Form.vue';
import TableList from '@/pages/Menu/Components/TableList.vue';

import { useCrudMenuStore } from '@/pages/Menu/Store/useCrudMenuStore';
const storeMenu = useCrudMenuStore()
const { typeAction } = storeToRefs(storeMenu)

onUnmounted(() => {
  storeMenu.$reset();
})

</script>

<template>
  <div>
    <TableList :key="storeMenu.keyList" v-show="typeAction !== 'form'"/>
    <Form v-show="typeAction === 'form'"></Form>
  </div>
</template>

<route lang="yaml">
meta:
  action: read
  subject: Auth
  redirectIfLoggedIn: true
  requiresAuth: true
  requiredPermission: menu.index
</route>


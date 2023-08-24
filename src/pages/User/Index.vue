<script setup lang="ts">
import Form from '@/pages/User/Components/Form.vue';
import TableList from '@/pages/User/Components/TableList.vue';
import { useCrudUserStore } from '@/pages/User/Store/useCrudUserStore';

const storeUser = useCrudUserStore()
const { typeAction } = storeToRefs(storeUser)
onUnmounted(() => {
  storeUser.$reset();
})
</script>

<template>
  <div>
    <TableList v-show="typeAction !== 'form'" :key="storeUser.keyList" />
    <Form v-show="typeAction === 'form'"></Form>
  </div>
</template>

<route lang="yaml">
meta:
  action: read
  subject: Auth
  redirectIfLoggedIn: true
  requiresAuth: true 
  requiredPermission: user.index
</route>


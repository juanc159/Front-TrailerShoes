<script setup lang="ts">

import Form from '@/pages/Permission/Components/Form.vue';
import TableList from '@/pages/Permission/Components/TableList.vue';
import { useCrudPermissionStore } from '@/pages/Permission/Store/useCrudPermissionStore';
const storePermission = useCrudPermissionStore()
const { typeAction } = storeToRefs(storePermission)

onUnmounted(() => {
  storePermission.$reset();
})

</script>

<template>
  <div>
    <TableList v-show="typeAction !== 'form'" :key="storePermission.keyList"/>
    <Form v-show="typeAction === 'form'"></Form>
  </div>
</template>

<route lang="yaml">
meta:
  action: read
  subject: Auth
  redirectIfLoggedIn: true
  requiresAuth: true
  requiredPermission: permission.index
</route>


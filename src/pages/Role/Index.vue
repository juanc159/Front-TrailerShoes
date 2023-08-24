<script setup lang="ts">
import Form from '@/pages/Role/Components/Form.vue';
import TableList from '@/pages/Role/Components/TableList.vue';
import { useCrudRoleStore } from '@/pages/Role/Store/useCrudRoleStore';

const storeRole = useCrudRoleStore()

const { typeAction } = storeToRefs(storeRole)

onUnmounted(() => {
  storeRole.$reset();
})
//Commit
</script>


<template>
  <div>
    <TableList :key="storeRole.keyList" v-show="typeAction !== 'form'"/>
    <Form v-show="typeAction === 'form'"></Form>
  </div>
</template>

<route lang="yaml">
meta:
  action: read
  subject: Auth
  requiresAuth: true
  redirectIfLoggedIn: true
  requiredPermission: role.index
</route>

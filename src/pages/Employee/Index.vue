<script setup lang="ts">

import Form from '@/pages/Employee/Components/Form.vue';
import TableList from '@/pages/Employee/Components/TableList.vue';
import { useCrudEmployeeStore } from '@/pages/Employee/Store/useCrudEmployeeStore';
const storeEmployee = useCrudEmployeeStore()
const { typeAction } = storeToRefs(storeEmployee)

onUnmounted(() => {
  storeEmployee.$reset();
})

</script>

<template>
  <div>
    <TableList v-show="typeAction !== 'form'" :key="storeEmployee.keyList" />
    <Form v-show="typeAction === 'form'"></Form>
  </div>
</template>

<route lang="yaml">
meta:
  action: read
  subject: Auth
  redirectIfLoggedIn: true
  requiresAuth: true
  requiredPermission: employee.index
</route>


<script setup lang="ts">

import Form from '@/pages/Form/Components/Form.vue';
import TableList from '@/pages/Form/Components/TableList.vue';
import { useCrudFormStore } from '@/pages/Form/Store/useCrudFormStore';
const storeForm = useCrudFormStore()
const { typeAction } = storeToRefs(storeForm)

onUnmounted(() => {
  storeForm.$reset();
})

</script>

<template>
  <div>
    <TableList v-show="typeAction !== 'form'" :key="storeForm.keyList" />
    <Form v-show="typeAction === 'form'" />
  </div>
</template>

<route lang="yaml">
meta:
  action: read
  subject: Auth
  redirectIfLoggedIn: true
  requiresAuth: true
  requiredPermission: form.index
</route>


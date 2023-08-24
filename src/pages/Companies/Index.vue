<script setup lang="ts">
  // --- --- --- Components --- --- ---
  import Form from '@/pages/Companies/Components/Form.vue';
  import TableList from '@/pages/Companies/Components/TableList.vue';
  // --- --- END Components --- --- ---
  // --- --- --- Store --- --- ---
  import { useCompaniesStore } from '@/pages/Companies/Store/useCompaniesStore';
  const companiesStore = useCompaniesStore()
  const { typeAction } = storeToRefs(companiesStore)
  // --- --- END Store --- --- ---

  onUnmounted(() => {
    companiesStore.$reset();
  })
</script>

<template>
  <div>
    <TableList v-show="typeAction !== 'form'" :key="companiesStore.keyList"/>
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


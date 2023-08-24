<script setup lang="ts">

import TableList from '@/pages/Audit/Components/TableList.vue';
import { useCrudAuditStore } from '@/pages/Audit/Store/useCrudAuditStore';
const storeAudit = useCrudAuditStore()
const { typeAction } = storeToRefs(storeAudit)

onUnmounted(() => {
  storeAudit.$reset();
})
</script>

<template>
  <div>
    <VRow>
      <VCol cols="12">
        <VCard v-show="typeAction !== 'form'" title="Listado Auditoria">
          <VCardText>
            <TableList :key="storeAudit.keyList" />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>

<route lang="yaml">
meta:
  action: read
  subject: Auth
  redirectIfLoggedIn: true
  requiresAuth: true
  requiredPermission: audit.index
</route>


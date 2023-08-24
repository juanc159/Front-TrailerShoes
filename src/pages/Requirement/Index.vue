<script setup lang="ts">
import Form from '@/pages/Requirement/Components/Form.vue';
import ManageData from '@/pages/Requirement/Components/ManageData.vue';
import TableList from '@/pages/Requirement/Components/TableList.vue';
import { useRequirementStore } from '@/pages/Requirement/Store/useRequirementStore';
import { useAuthenticationStore } from '@/stores/useAuthenticationStore';
const authenticationStore = useAuthenticationStore()

const requirementStore = useRequirementStore()
const { typeAction } = storeToRefs(requirementStore)

onUnmounted(() => {
  requirementStore.$reset();
})

</script>

<template>
  <div>
    <TableList v-show="typeAction == 'back' || typeAction == 'list'" :key="requirementStore.keyList" />
    <ManageData v-show="typeAction == 'ManageData'" title="Gestionar solicitud" />
    <Form v-show="typeAction == 'form'" v-if="authenticationStore.permissions.includes('petition.index')"
      title="Form requerimiento" />
  </div>
</template>

<route lang="yaml">
meta:
  action: read
  subject: Auth
  redirectIfLoggedIn: true
  requiresAuth: true
  requiredRequestType: requirement.index
</route>


<script setup lang="ts">

import Form from '@/pages/SocialNetwork/Components/Form.vue';
import TableList from '@/pages/SocialNetwork/Components/TableList.vue';
import { useCrudSocialNetworkStore } from '@/pages/SocialNetwork/Store/useCrudSocialNetworkStore';
const storeSocialNetwork = useCrudSocialNetworkStore()
const { typeAction } = storeToRefs(storeSocialNetwork)

onUnmounted(() => {
  storeSocialNetwork.$reset();
})

</script>

<template>
  <div>
    <TableList v-show="typeAction !== 'form'" :key="storeSocialNetwork.keyList" />
    <Form v-show="typeAction === 'form'" title="Form Red social" />
  </div>
</template>

<route lang="yaml">
meta:
  action: read
  subject: Auth
  redirectIfLoggedIn: true
  requiresAuth: true
  requiredPermission: socialNetwork.index
</route>


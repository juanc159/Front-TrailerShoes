<script setup lang="ts">
import Form from '@/pages/DynamicMenuPage/Components/Form.vue';
import TableList from '@/pages/DynamicMenuPage/Components/TableList.vue';
import DynamicPage from '@/pages/DynamicPage/Index.vue';

import { useCrudDynamicMenuPageStore } from '@/pages/DynamicMenuPage/Store/useCrudDynamicMenuPageStore';
const storeDynamicMenuPage = useCrudDynamicMenuPageStore()
const { typeAction } = storeToRefs(storeDynamicMenuPage)

onUnmounted(() => {
  storeDynamicMenuPage.$reset();
})

const changeScreen = async (typeAction: string) => {
  storeDynamicMenuPage.typeAction = typeAction
}


</script>

<template>
  <div>
    <TableList v-show="typeAction !== 'form' && typeAction !== 'dynamicPage'" :key="storeDynamicMenuPage.keyList" />
    <Form v-show="typeAction === 'form'" />
    <DynamicPage v-show="typeAction === 'dynamicPage'" />
  </div>
</template>

<route lang="yaml">
meta:
  action: read
  subject: Auth
  redirectIfLoggedIn: true
  requiresAuth: true
  requiredPermission: dynamicMenuPage.index
</route>


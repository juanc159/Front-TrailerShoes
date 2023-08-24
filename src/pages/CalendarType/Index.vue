<script setup lang="ts">

import Form from '@/pages/CalendarType/Components/Form.vue';
import TableList from '@/pages/CalendarType/Components/TableList.vue';
import { useCrudCalendarTypeStore } from '@/pages/CalendarType/Store/useCrudCalendarTypeStore';
const storeCalendarType = useCrudCalendarTypeStore()
const { typeAction } = storeToRefs(storeCalendarType)

onUnmounted(() => {
  storeCalendarType.$reset();
})

</script>

<template>
  <div>
    <TableList v-show="typeAction !== 'form'" :key="storeCalendarType.keyList" />
    <Form v-show="typeAction === 'form'" />
  </div>
</template>

<route lang="yaml">
meta:
  action: read
  subject: Auth
  redirectIfLoggedIn: true
  requiresAuth: true
  requiredPermission: calendarType.index
</route>


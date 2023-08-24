<script setup lang="ts">
import Form from '@/pages/Profile/Components/Form.vue';

</script>

<template>
  <div>
    <Form />
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
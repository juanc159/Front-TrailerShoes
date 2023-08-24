<script setup lang="ts">
import Preload from '@/components/Prelaod/Preload.vue';
</script>
<template>
    <div class="preload-container"> 
        <Preload />
    </div>
</template>

<style scoped>
.preload-container { 
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh !important;
}  
</style>

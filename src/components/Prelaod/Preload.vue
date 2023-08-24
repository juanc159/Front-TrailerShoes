<template>
  <div class="preload">
    <h2 class="mb-2">Cargando información</h2>
    <v-progress-circular :rotate="360" size="50" color="primary" indeterminate></v-progress-circular>
  </div>
</template>
<style lang="scss">
.preload {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
 
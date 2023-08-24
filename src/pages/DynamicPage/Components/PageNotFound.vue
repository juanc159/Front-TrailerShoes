<script setup lang="ts">

const router = useRouter()
const goBack = () => {
  router.back(); // Vuelve a la página anterior
};

</script>
<template>
  <div>
    <VContainer>
      <VRow class="d-flex justify-content-center">
        <VCol cols="6">
          <VCard style="text-align: center;">
            <VCardTitle primary-title>Error 404</VCardTitle>
            <VCardText>Lo siento esta pagina no fue encontrada</VCardText>
            <VCardActions class="d-flex justify-content-center">
              <VBtn @click="goBack">
                Regresar
              </VBtn>
            </VCardActions>
          </VCard>
        </VCol>
      </VRow>
    </VContainer>
  </div>
</template>
 
<route lang="yaml">
meta:
  layout: blank
</route>
  
<script setup lang="ts">
import { VForm } from 'vuetify/components/VForm'

import { useAuthenticationStore } from '@/stores/useAuthenticationStore'
// --- --- --- Store --- --- ---
import { useCompaniesStore } from '@/pages/Companies/Store/useCompaniesStore'
const companiesStore = useCompaniesStore()
// --- --- END Store --- --- ---
import AuthProvider from '@/views/pages/authentication/AuthProvider.vue'
import { useGenerateImageVariant } from '@core/composable/useGenerateImageVariant'
import authV2LoginIllustrationBorderedDark from '@images/pages/auth-v2-login-illustration-bordered-dark.png'
import authV2LoginIllustrationBorderedLight from '@images/pages/auth-v2-login-illustration-bordered-light.png'
import authV2LoginIllustrationDark from '@images/pages/auth-v2-login-illustration-dark.png'
import authV2LoginIllustrationLight from '@images/pages/auth-v2-login-illustration-light.png'
import authV2MaskDark from '@images/pages/misc-mask-dark.png'
import authV2MaskLight from '@images/pages/misc-mask-light.png'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'
const authThemeImg = useGenerateImageVariant(authV2LoginIllustrationLight, authV2LoginIllustrationDark, authV2LoginIllustrationBorderedLight, authV2LoginIllustrationBorderedDark, true)

const authThemeMask = useGenerateImageVariant(authV2MaskLight, authV2MaskDark)

const isPasswordVisible = ref(false)

const refVForm = ref<VForm>()

const formulario = reactive({
  email: '',
  password: '',
})
const router = useRouter()

const authenticationStore = useAuthenticationStore()
companiesStore.fetchInfo(1)

const login = async () => {
  const data = await authenticationStore.login(formulario)
  console.log(data);

  if (data.code == 200) {
    router.push({ name: 'index' })
  }
}

</script>

<template>
  <VRow no-gutters class="auth-wrapper bg-surface">
    <VCol lg="8" class="d-none d-lg-flex">
      <div class="position-relative bg-background rounded-lg w-100 ma-8 me-0">
        <div class="d-flex align-center justify-center w-100 h-100">
          <VImg max-width="505" :src="authenticationStore.company.image_cover" class="auth-illustration mt-16 mb-2" />
          <!-- <VImg max-width="505" :src="authThemeImg" class="auth-illustration mt-16 mb-2" /> -->
        </div>

        <VImg :src="authThemeMask" class="auth-footer-mask" />
      </div>
    </VCol>

    <VCol cols="12" lg="4" class="auth-card-v2 d-flex align-center justify-center">
      <VCard flat :max-width="500" class="mt-12 mt-sm-0 pa-4">
        <VCardText class="pb-0">
          <!-- <VNodeRenderer :nodes="themeConfig.app.logo" class="mb-6" /> -->
          <VImg class="d-none d-lg-block" style="width: 60px;" :src="authenticationStore.company.image_icon" />
          <!-- Bienvenido a <span class="text-capitalize"> {{ themeConfig.app.title }} </span>! 👋🏻 -->
          <h5 class="text-h5 mt-2 mb-4">
            <span class="text-capitalize">{{ authenticationStore.company.name }}</span>
          </h5>
        </VCardText>

        <!-- <VCardText>
          <VAlert color="primary" variant="tonal">
            <p class="text-caption mb-2">
              Admin Email: <strong>admin@demo.com</strong> / Pass: <strong>admin</strong>
            </p>
            <p class="text-caption mb-0">
              Client Email: <strong>client@demo.com</strong> / Pass: <strong>client</strong>
            </p>
          </VAlert>
        </VCardText> -->

        <VCardText>
          <VForm ref="refVForm">
            <VRow>
              <!-- email -->
              <VCol cols="12">
                <AppTextField v-model="formulario.email" label="Correo electrónico" type="email" autofocus />
              </VCol>

              <!-- password -->
              <VCol cols="12">
                <AppTextField v-model="formulario.password" label="Contraseña"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible" />
                <VBtn class="mt-4" block type="button" @click="login()" append-icon="mdi-login">
                  <b>Iniciar sesión</b>
                </VBtn>
              </VCol>

              <!-- create account -->
              <VCol cols="12" class="text-center">
                <span>¿Nuevo en nuestra plataforma?</span>
                <RouterLink class="text-primary ms-2" :to="{ name: 'register' }">
                  Crea una cuenta
                </RouterLink>
                <!-- <span>New on our platform?</span>
                <RouterLink class="text-primary ms-2" :to="{ name: 'register' }">
                  Create an account
                </RouterLink> -->
              </VCol>

              <!-- <VCol cols="12" class="d-flex align-center">
                <VDivider />
                <span class="mx-4">or</span>
                <VDivider />
              </VCol> -->
              <!-- auth providers -->
              <!-- <VCol cols="12" class="text-center">
                <AuthProvider />
              </VCol> -->
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";

.text-high-emphasis {
  font-size: 0.99rem !important;
}
</style>

<route lang="yaml">
meta:
  layout: blank
</route>

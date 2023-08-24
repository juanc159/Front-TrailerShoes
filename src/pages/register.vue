<script setup lang="ts">
import IRegister from "@/interfaces/Authentication/IRegister";
import IErrorsBack from "@/interfaces/Axios/IErrorsBack";
import { useAuthenticationStore } from '@/stores/useAuthenticationStore';
import AuthProvider from '@/views/pages/authentication/AuthProvider.vue';
import authV1BottomShape from '@images/svg/auth-v1-bottom-shape.svg?raw';
import authV1TopShape from '@images/svg/auth-v1-top-shape.svg?raw';
import { VNodeRenderer } from '@layouts/components/VNodeRenderer';
import { themeConfig } from '@themeConfig';
import { lengthMaxValidator, requiredValidator, soloNumeros } from '@validators';
import type { VForm } from 'vuetify/components';

const authenticationStore = useAuthenticationStore();
const { identityTypes } = storeToRefs(authenticationStore);
const formValidation = ref<VForm>()

const router = useRouter()

const form = ref<IRegister>({
  name: null,
  lastName: null,
  email: null,
  password: null,
  identity_type_id: null,
  idNumber: null,
  role_id: 2,
})

const submitForm = async () => {
  const validation = await formValidation.value?.validate()
  if (validation?.valid) {
    const data = await authenticationStore.register(form.value);
    if (data.code === 200) router.push({ name: "login" });
    if (data.code === 422) errors.value = data.errors ?? []; //muestra error del back
  }
}

const isPasswordVisible = ref(false)

const errors = ref<IErrorsBack>({})

onMounted(async () => {
  await authenticationStore.fetchDataForm()
})

</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <div class="position-relative my-sm-16">
      <!-- 👉 Top shape -->
      <VNodeRenderer :nodes="h('div', { innerHTML: authV1TopShape })"
        class="text-primary auth-v1-top-shape d-none d-sm-block" />

      <!-- 👉 Bottom shape -->
      <VNodeRenderer :nodes="h('div', { innerHTML: authV1BottomShape })"
        class="text-primary auth-v1-bottom-shape d-none d-sm-block" />

      <!-- 👉 Auth card -->
      <VCard class="auth-card pa-4" max-width="448">
        <VCardItem class="justify-center">
          <template #prepend>
            <div class="d-flex">
              <VNodeRenderer :nodes="themeConfig.app.logo" />
            </div>
          </template>

          <VCardTitle class="font-weight-bold text-h5   py-1">
            Registro de usuario
          </VCardTitle>
        </VCardItem>


        <VCardText>
          <VForm ref="formValidation" lazy-validation>
            <VRow>
              <VCol cols="12">
                <AppTextField clearable v-model="form.name" label="Nombre" :rules="[requiredValidator]"
                  :error-messages="errors.name" @keypress="errors.name = ''" />
              </VCol>
              <VCol cols="12">
                <AppTextField clearable v-model="form.lastName" label="Apellido" :rules="[requiredValidator]"
                  :error-messages="errors.lastName" @keypress="errors.lastName = ''" />
              </VCol>
              <VCol cols="12">
                <VSelect clearable :rules="[requiredValidator]" :items="identityTypes" v-model="form.identity_type_id"
                  item-title="name" item-value="id" label="Tipo de identificacion"
                  :error-messages="errors.identity_type_id" @update:model-value="errors.identity_type_id = ''"></VSelect>
              </VCol>
              <VCol cols="12">
                <AppTextField clearable maxlength='10' :rules="[requiredValidator, lengthMaxValidator(form.idNumber, 10)]"
                  v-model="form.idNumber" :error-messages="errors.idNumber" label="identificación"
                  @keypress="errors.idNumber = ''; soloNumeros($event)" />
              </VCol>
              <VCol cols="12">
                <AppTextField clearable v-model="form.email" label="Email" type="email" :rules="[requiredValidator]"
                  :error-messages="errors.email" @keypress="errors.email = ''" />
              </VCol>

              <VCol cols="12">
                <AppTextField clearable v-model="form.password" label="Password"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible" :rules="[requiredValidator]"
                  :error-messages="errors.password" @keypress="errors.password = ''" />

                <VBtn block class="mt-2 mb-4" @click="submitForm()">
                  Registrarse
                </VBtn>
              </VCol>

              <!-- login instead -->
              <VCol cols="12" class="text-center text-base">
                <span>¿Ya tienes una cuenta?</span>
                <RouterLink class="text-primary ms-2" :to="{ name: 'login' }">
                  Iniciar sesión
                </RouterLink>
              </VCol>

              <VCol cols="12" class="d-flex align-center">
                <VDivider />
                <span class="mx-4">o</span>
                <VDivider />
              </VCol>

              <!-- auth providers -->
              <VCol cols="12" class="text-center">
                <AuthProvider />
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </div>
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>

<route lang="yaml">
meta:
  layout: blank
</route>

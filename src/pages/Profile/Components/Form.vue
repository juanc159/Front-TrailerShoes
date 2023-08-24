<script setup lang="ts">

//--- --- --- Stores --- --- ---
import { useAuthenticationStore } from '@/stores/useAuthenticationStore';
const authenticationStore = useAuthenticationStore()
const { identityTypes } = storeToRefs(authenticationStore);


import { useCrudUserStore } from '@/pages/User/Store/useCrudUserStore';
const storeUser = useCrudUserStore();
const { formulario } = storeToRefs(storeUser);
//--- --- End Stores --- ---



import { emailValidator, lengthMaxValidator, requiredValidator, soloNumeros } from '@validators';
import type { VForm } from 'vuetify/components';
const formValidation = ref<VForm>()
const errors = ref<Array<string>>([])
const showPass = ref(false)

const submitForm = async () => {

  const validation = await formValidation.value?.validate()
  if (validation?.valid) {
    const data = await storeUser.fetchSave();
    await authenticationStore.fetchUserAuthenticated();
    console.log(data)
    if (data.code === 422) errors.value = data.errors ?? []; //muestra error del back
  }
}

onMounted(async () => {
  formulario.value = {
    id: authenticationStore.user.id,
    email: authenticationStore.user.email,
    name: authenticationStore.user.name,
    lastName: authenticationStore.user.lastName,
    role_id: authenticationStore.user.role_id,
    identity_type_id: authenticationStore.user.identity_type_id,
    charge_id: authenticationStore.user.charge_id,
    idNumber: authenticationStore.user.idNumber,
    password: null
  }
  await authenticationStore.fetchDataForm();
});

const arrayValidation = ref<Array<string | boolean>>([])
watch(formulario, (newValue, oldValue) => {
  if (!newValue.id) {
    arrayValidation.value["password"] = [requiredValidator(newValue.password)]
  }
  else {
    arrayValidation.value["password"] = []
  }
}, { deep: true });

</script>
<template>
  <div>
    <HeaderAlertView sub-title="Perfil" :validate-crud="true" action="edit" />
    <VCard>
      <VCardText>
        <VForm ref="formValidation" lazy-validation>
          <VRow>
            <VCol cols="12" md="6">
              <VTextField clearable v-model="formulario.name" :rules="[requiredValidator]" :error-messages="errors.name"
                @keypress="errors.name = ''">
                <template #label>
                  Nombre&nbsp;<b class="text-warning">*</b>
                </template>
              </VTextField>

            </VCol>
            <VCol cols="12" md="6">
              <VTextField clearable v-model="formulario.lastName" :rules="[requiredValidator]"
                :error-messages="errors.name" @keypress="errors.name = ''">
                <template #label>
                  Apellido&nbsp;<b class="text-warning">*</b>
                </template>
              </VTextField>

            </VCol>
            <VCol cols="12" md="6">
              <VTextField clearable autocomplete="off" v-model="formulario.email" :rules="[requiredValidator]"
                :error-messages="errors.name" @keypress="errors.email = ''">
                <template #label>
                  Email&nbsp;<b class="text-warning">*</b>
                </template>
              </VTextField>
            </VCol>
            <VCol cols="12" md="6">
              <VTextField clearable autocomplete="off" :type="showPass ? 'text' : 'password'"
                v-model="formulario.password" :rules="arrayValidation['password']" @click:append="showPass = !showPass"
                :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'" :error-messages="errors.password"
                @keypress="errors.password = ''">
                <template #label>
                  Contraseña&nbsp;<b class="text-warning">*</b>
                </template>
              </VTextField>
            </VCol>
            <VCol cols="12" md="6">
              <VSelect clearable :items="identityTypes" item-title="name" item-value="id"
                v-model="formulario.identity_type_id" :rules="[requiredValidator]"
                :error-messages="errors.identity_type_id" @update:model-value="errors.identity_type_id = ''">
                <template #label>
                  Tipo de identificación&nbsp;<b class="text-warning">*</b>
                </template>
              </VSelect>
            </VCol>
            <VCol cols="4">
              <VTextField clearable maxlength='10'
                :rules="[requiredValidator, lengthMaxValidator(formulario.idNumber, 10)]" v-model="formulario.idNumber"
                :error-messages="errors.idNumber" label="identificación"
                @keypress="errors.idNumber = ''; soloNumeros($event)" />
            </VCol>
          </VRow>
          <VDivider class="border-opacity-75 my-4" color="csecundary" :thickness="3" />
          <VRow class="pt-0">
            <VCol cols="12" class="text-center">
              <VTooltip text="Guardar" location="top">
                <template v-slot:activator="{ props }">
                  <VBtn class="ms-1" color="light" rounded="lg" v-bind="props" @click="submitForm()">
                    Guardar&nbsp;
                    <VIcon size="large" color="success" icon="mdi-content-save-outline" />
                  </VBtn>
                </template>
              </VTooltip>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </div>
</template>
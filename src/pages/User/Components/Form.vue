<script lang="ts" setup >

import { useSelect2Infite } from "@/composables/useSelect2Infite";

// --- --- --- Store --- --- ---
import { useCrudUserStore } from '@/pages/User/Store/useCrudUserStore';
const storeUser = useCrudUserStore();
const {
  action, formulario, arrayRoles, identityTypes, charges_arrayInfo, charges_countLinks, loading, genders, civilStatus
} = storeToRefs(storeUser)
// --- --- END Store --- --- ---

import { emailValidator, lengthMaxValidator, requiredValidator, soloNumeros } from '@validators';
import type { VForm } from 'vuetify/components';
const formValidation = ref<VForm>()

const errors = ref<Array<string>>([])
const showPass = ref(false)
const selectInfiniteCharges = useSelect2Infite(storeUser.fetchSelectCharges, charges_arrayInfo);

const arrayValidation = ref<Array<string | boolean>>([])
const changeScreen = async (typeAction: string) => {
  storeUser.typeAction = typeAction
  arrayValidation.value = []
  errors.value = []
  await formValidation.value?.resetValidation();
  if (typeAction != 'back')
    storeUser.keyList++
}

const submitForm = async () => {
  const validation = await formValidation.value?.validate()
  if (validation?.valid) {
    const data = await storeUser.fetchSave();
    if (data.code === 200) changeScreen("list");
    if (data.code === 422) errors.value = data.errors ?? []; //muestra error del back
  }
}

watch(formulario, (newValue, oldValue) => {
  if (!newValue.id) {
    arrayValidation.value["password"] = [requiredValidator(newValue.password)]
  }
  else {
    arrayValidation.value["password"] = []
  }
}, { deep: true });

onMounted(async () => {
  await storeUser.fetchDataForm()
  selectInfiniteCharges.dataNueva.value = charges_arrayInfo.value;
  selectInfiniteCharges.totalLinks.value = charges_countLinks.value;
})


const clearNewData = () => {
  formulario.value.expeditionDate = null
  formulario.value.birthDate = null
  formulario.value.gender_id = null
  formulario.value.weight = null
  formulario.value.height = null
  formulario.value.civil_status_id = null
  formulario.value.phone = null
  formulario.value.cellphone = null
  formulario.value.address = null
  formulario.value.have_son = null
  formulario.value.nameContact = null
  formulario.value.relationshipContact = null
  formulario.value.phoneContact = null
  formulario.value.cellphoneContact = null
  formulario.value.emailContact = null
}
</script>

<template>
  <div>
    <HeaderAlertView sub-title="Usuario" :action="action" :validate-crud="true" :btn-back="true"
      @changeScreenBack="changeScreen" />
    <VContainer class="bg-vwhite" fluid>
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
                  :error-messages="errors.lastName" @keypress="errors.lastName = ''">
                  <template #label>
                    Apellido&nbsp;<b class="text-warning">*</b>
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
              <VCol cols="12" md="6">
                <VTextField clearable maxlength='10' v-model="formulario.idNumber"
                  :rules="[requiredValidator, lengthMaxValidator(formulario.idNumber, 10)]"
                  :error-messages="errors.idNumber" @keypress="errors.idNumber = ''; soloNumeros($event)">
                  <template #label>
                    Identificación&nbsp;<b class="text-warning">*</b>
                  </template>
                </VTextField>
              </VCol>
              <VCol cols="12" md="6">
                <VTextField clearable autocomplete="off" v-model="formulario.email"
                  :rules="[requiredValidator, emailValidator]" :error-messages="errors.email"
                  @keypress="errors.email = ''">
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
              <VCol cols="12" sm="6">
                <VSelect clearable :rules="[requiredValidator]" :items="arrayRoles" v-model="formulario.role_id"
                  item-title="name" item-value="id" label="Rol" :error-messages="errors.role_id"
                  @update:model-value="errors.role_id = ''; clearNewData()"></VSelect>
              </VCol>
              <VCol cols="12" sm="6">
                <VSelect clearable item-title="name" label="Cargo" item-value="id"
                  :items="selectInfiniteCharges.dataNueva.value" v-model="formulario.charge_id"
                  :error-messages="errors.charge_id" @update:model-value="errors.charge_id = ''"
                  :rules="[requiredValidator]">
                  <template v-slot:prepend-item>
                    <VTextField placeholder="Buscar..." class="mb-2" v-model="selectInfiniteCharges.searchQuery.value" />
                    <v-divider></v-divider>
                  </template>
                  <template v-slot:append-item>
                    <v-divider> </v-divider>
                    <div class="d-flex justify-content-center aling-items-center">
                      <v-progress-circular v-show="loading" size="24" color="primary" indeterminate></v-progress-circular>
                    </div>
                    <div v-if="!loading" class="d-flex justify-content-between aling-items-center p-2">
                      <div>
                        <VBtn class="mt-2" :disabled="selectInfiniteCharges.page.value <= 1"
                          @click="selectInfiniteCharges.prev()" color="success">
                          <VIcon icon="mdi-chevron-left"></VIcon>
                        </VBtn>
                        <VBtn class="mt-2"
                          :disabled="selectInfiniteCharges.page.value >= selectInfiniteCharges.totalLinks.value"
                          @click="selectInfiniteCharges.next()" color="success">
                          <VIcon icon="mdi-chevron-right"></VIcon>
                        </VBtn>
                      </div>
                      <div v-if="!loading" class="d-flex justify-content-between aling-items-center p-2">
                        <div>
                          <VBtn class="mt-2" :disabled="selectInfiniteCharges.page.value <= 1"
                            @click="selectInfiniteCharges.prev()" color="success">
                            <VIcon icon="mdi-chevron-left"></VIcon>
                          </VBtn>
                          <VBtn class="mt-2"
                            :disabled="selectInfiniteCharges.page.value >= selectInfiniteCharges.totalLinks.value"
                            @click="selectInfiniteCharges.next()" color="success">
                            <VIcon icon="mdi-chevron-right"></VIcon>
                          </VBtn>
                        </div>
                      </div>
                    </div>
                  </template>
                </VSelect>
              </VCol>
            </VRow>
            <VDivider class="border-opacity-75 my-4" color="csecundary" :thickness="3" />
            <template v-if="formulario.role_id && formulario.role_id != 2">
              <VRow>
                <VCol cols="12" md="6">
                  <AppDateTimePicker v-model="formulario.expeditionDate" label="Fecha expedición"
                    @update:model-value="errors.expeditionDate = ''" :error-messages="errors.expeditionDate"
                    :rules="[requiredValidator]">
                  </AppDateTimePicker>
                </VCol>
                <VCol cols="12" md="6">
                  <AppDateTimePicker v-model="formulario.birthDate" label="Fecha nacimiento"
                    :error-messages="errors.start" :rules="[requiredValidator]"
                    @update:model-value="errors.birthDate = ''" />
                </VCol>
              </VRow>
              <VRow>
                <VCol cols="12" md="6">
                  <VSelect clearable :items="genders" v-model="formulario.gender_id" :rules="[requiredValidator]"
                    :error-messages="errors.gender_id" @update:model-value="errors.gender_id = ''">
                    <template #label>
                      Género&nbsp;<b class="text-warning">*</b>
                    </template>
                  </VSelect>
                </VCol>
                <VCol VCol cols=" 12" md="6">
                  <VTextField clearable v-model="formulario.weight" :rules="[requiredValidator]"
                    :error-messages="errors.weight" @keypress="errors.weight = ''">
                    <template #label>
                      Peso&nbsp;<b class="text-warning">*</b>
                    </template>
                  </VTextField>
                </VCol>
              </VRow>
              <VRow>
                <VCol VCol cols=" 12" md="6">
                  <VTextField clearable v-model="formulario.height" :rules="[requiredValidator]"
                    :error-messages="errors.height" @keypress="errors.height = ''">
                    <template #label>
                      Estatura&nbsp;<b class="text-warning">*</b>
                    </template>
                  </VTextField>
                </VCol>
                <VCol cols="12" md="6">
                  <VSelect clearable :items="civilStatus" v-model="formulario.civil_status_id"
                    :rules="[requiredValidator]" :error-messages="errors.civil_status_id"
                    @update:model-value="errors.civil_status_id = ''">
                    <template #label>
                      Estado civil&nbsp;<b class="text-warning">*</b>
                    </template>
                  </VSelect>
                </VCol>
              </VRow>
              <VRow>
                <VCol VCol cols=" 12" md="6">
                  <VTextField clearable v-model="formulario.phone" :rules="[requiredValidator]"
                    :error-messages="errors.phone" @keypress="errors.phone = ''">
                    <template #label>
                      Teléfono&nbsp;<b class="text-warning">*</b>
                    </template>
                  </VTextField>
                </VCol>
                <VCol cols="12" md="6">
                  <VTextField clearable v-model="formulario.cellphone" :rules="[requiredValidator]"
                    :error-messages="errors.cellphone" @update:model-value="errors.cellphone = ''">
                    <template #label>
                      Celular&nbsp;<b class="text-warning">*</b>
                    </template>
                  </VTextField>
                </VCol>
              </VRow>
              <VRow>
                <VCol VCol cols=" 12" md="6">
                  <VTextField clearable v-model="formulario.address" :rules="[requiredValidator]"
                    :error-messages="errors.address" @keypress="errors.address = ''">
                    <template #label>
                      Dirección&nbsp;<b class="text-warning">*</b>
                    </template>
                  </VTextField>
                </VCol>
                <VCol cols="12" md="6">
                  <VSelect clearable :items="['Si', 'No']" :rules="[requiredValidator]" v-model="formulario.have_son"
                    :error-messages="errors.have_son" @update:model-value="errors.have_son = ''">
                    <template #label>
                      Tiene hijos&nbsp;<b class="text-warning">*</b>
                    </template>
                  </VSelect>
                </VCol>
              </VRow>
              <VRow>
                <VCol VCol cols=" 12">
                  <h3>Información contacto</h3>
                </VCol>
              </VRow>
              <VRow>
                <VCol VCol cols=" 12" md="6">
                  <VTextField clearable v-model="formulario.nameContact" :rules="[requiredValidator]"
                    :error-messages="errors.nameContact" @keypress="errors.nameContact = ''">
                    <template #label>
                      Nombre&nbsp;<b class="text-warning">*</b>
                    </template>
                  </VTextField>
                </VCol>
                <VCol cols="12" md="6">
                  <VTextField clearable v-model="formulario.relationshipContact" :rules="[requiredValidator]"
                    :error-messages="errors.relationshipContact" @keypress="errors.relationshipContact = ''">
                    <template #label>
                      Parentesco&nbsp;<b class="text-warning">*</b>
                    </template>
                  </VTextField>
                </VCol>
              </VRow>
              <VRow>
                <VCol VCol cols=" 12" md="4">
                  <VTextField clearable v-model="formulario.phoneContact" :rules="[requiredValidator]"
                    :error-messages="errors.phoneContact" @keypress="errors.phoneContact = ''">
                    <template #label>
                      Teléfono&nbsp;<b class="text-warning">*</b>
                    </template>
                  </VTextField>
                </VCol>
                <VCol cols="12" md="4">
                  <VTextField clearable v-model="formulario.cellphoneContact" :error-messages="errors.cellphoneContact"
                    @keypress="errors.cellphoneContact = ''" :rules="[requiredValidator]">
                    <template #label>
                      Celular&nbsp;<b class="text-warning">*</b>
                    </template>
                  </VTextField>
                </VCol>
                <VCol cols="12" md="4">
                  <VTextField clearable v-model="formulario.emailContact" :error-messages="errors.emailContact"
                    @keypress="errors.emailContact = ''" :rules="[requiredValidator, emailValidator]">
                    <template #label>
                      Correo&nbsp;<b class="text-warning">*</b>
                    </template>
                  </VTextField>
                </VCol>
              </VRow>
            </template>

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
    </VContainer>
  </div>
</template>

<route lang="yaml">
  meta:
    action: read
    subject: Auth
    redirectIfLoggedIn: true
    requiresAuth: true 
  requiredPermission: admin.permission.index
  </route>

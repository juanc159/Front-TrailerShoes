<script setup lang="ts">

import { lengthMaxValidator, lengthMinValidator, requiredValidator } from '@validators';
import type { VForm } from 'vuetify/components';

// --- --- --- Store --- --- ---
import { useAuthenticationStore } from '@/stores/useAuthenticationStore'
import { useCrudRoleStore } from '@/pages/Role/Store/useCrudRoleStore'
const storeRole = useCrudRoleStore()
const { action, formulario } = storeToRefs(storeRole)
// --- --- END Store --- --- ---


const authentication = useAuthenticationStore();
const errors = ref<Array<string>>([])
const todosCheck = ref<string>();
const formValidation = ref<VForm>()
const changeScreen = async (typeAction: string) => {
  storeRole.typeAction = typeAction
  await formValidation.value?.resetValidation()
  errors.value = []
  if (typeAction != 'back') storeRole.keyList++
}

const submitForm = async () => {
  const validation = await formValidation.value?.validate()
  if (validation?.valid) {
    const data = await storeRole.fetchSave();
    if (data.code === 200) changeScreen("list");
    if (data.code === 422) errors.value = data.errors; //muestra error del back
  }
};

const changePermision = (id: number) => {
  let cond = formulario.value.permissions.findIndex(ele => ele === id);
  console.log(cond)
  if (cond != -1) {
    todosCheck.value = false;
    formulario.value.permissions.splice(cond, 1);
  } else {
    formulario.value.permissions.push(id);
  }
}

const clearChecks = () => {
  formulario.value.permissions = [];
  for (let index = 0; index < storeRole.arrayMenus.length; index++) {
    for (let j = 0; j < storeRole.arrayMenus[index].permissions.length; j++) {
      storeRole.arrayMenus[index].permissions[j].estado = "Inactivo"
    }
  }
}

const selectAll = () => {
  if (!todosCheck.value) {
    formulario.value.permissions = [];
    for (let index = 0; index < storeRole.arrayMenus.length; index++) {
      for (let j = 0; j < storeRole.arrayMenus[index].permissions.length; j++) {
        formulario.value.permissions.push(storeRole.arrayMenus[index].permissions[j].id);
        storeRole.arrayMenus[index].permissions[j].estado = "Activo"
      }
    }
  } else {
    clearChecks();
  }
}

onMounted(async () => {
  clearChecks();
  await storeRole.fetchDataForm();
  if (storeRole.roleData.id) {
    formulario.value.permissions = [];
    await storeRole.fetchInfo(storeRole.roleData.id);
  }


});
</script>
<template>
  <div>

    <HeaderAlertView sub-title="Rol" :action="action" :validate-crud="true" :btn-back="true"
      @changeScreenBack="changeScreen" />

    <VContainer class="bg-vwhite" fluid>
      <VForm ref="formValidation" lazy-validation>
        <VRow class="mt-0">
          <VCol cols="12" md="6">
            <VTextField maxlength="20" v-model="formulario.name"
              :rules="[requiredValidator, lengthMaxValidator(formulario.name, 20), lengthMinValidator(formulario.name, 8)]"
              :error-messages="errors.name" @keypress="errors.name = ''">
              <template #label>
                Nombre&nbsp;<b class="text-warning">*</b>
              </template>
            </VTextField>
          </VCol>
          <VCol cols="12" md="6">
            <VTextField v-model="formulario.description"
              :rules="[requiredValidator, lengthMaxValidator(formulario.description, 50)]" maxlength="50"
              :error-messages="errors.description" @keypress="errors.description = ''">
              <template #label>
                Descripción&nbsp;<b class="text-warning">*</b>
              </template>
            </VTextField>
          </VCol>
          <VCol cols="12" md="6">
            <VSelect :items="storeRole.arrayMenus" :rules="[requiredValidator]" :error-messages="errors.pageInitial"
              @update:model-value="errors.pageInitial = ''" v-model="formulario.pageInitial" label="Pantalla inicial"
              item-title="title" item-value="to"></VSelect>
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12" class="pb-0">
            <VDivider class="border-opacity-75 mb-3" color="csecundary" :thickness="3" />
            <dl>
              <dt>
                <b class="text-vblack fs-6 me-auto">Permisos</b>
              </dt>
              <dd>
                <VCheckbox label="Todos" v-model="todosCheck" @click="selectAll()"></VCheckbox>
              </dd>
            </dl>
          </VCol>
          <VCol class="pb-0" cols="12" sm="6" md="4" lg="3" v-for="(item, index) in storeRole.arrayMenus" :key="index">
            <VCard>
              <VCardTitle>{{ item.title }}</VCardTitle>
              <VCardItem class="pt-0 pb-2" v-for="(perm, i) in item.permissions" :key="i">
                <VCheckbox v-if="authentication.permissions.includes(perm.name)" :id="'check' + index + '-' + i"
                  :label="perm.description" v-model="perm.estado" true-value="Activo" false-value="Inactivo"
                  :value="perm.estado" @click="changePermision(perm.id)">
                </VCheckbox>
              </VCardItem>
            </VCard>
          </VCol>
        </VRow>
        <VDivider class="border-opacity-75 mt-6 mb-3" color="csecundary" :thickness="3" />
        <VRow>
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
    </VContainer>
  </div>
</template>

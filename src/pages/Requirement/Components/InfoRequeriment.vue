<script lang="ts" setup  >
import { useRequirementStore } from '@/pages/Requirement/Store/useRequirementStore';
const requirementStore = useRequirementStore()
const { requirementData } = storeToRefs(requirementStore)
</script>

<template>
  <div>
    <VRow v-if="requirementData.user?.id">
      <VCol cols="12">
        <h3>Datos del solicitante: </h3>
      </VCol>
      <VCol sm="4" cols="12">
        <b>Nombre: </b>{{ requirementData.user?.full_name }}
      </VCol>
      <VCol sm="4" cols="12">
        <b>Tipo de documento: </b>{{ requirementData.user?.identity_type_name }}
      </VCol>
      <VCol sm="4" cols="12">
        <b>Documento: </b>{{ requirementData.user?.idNumber }}
      </VCol>
      <VCol sm="4" cols="12">
        <b>Email: </b>{{ requirementData.user?.email }}
      </VCol>
    </VRow>
    <VRow>
      <VCol cols="12">
        <h3>Tipo: </h3>
        <span>{{ requirementData.type?.name }}</span>
      </VCol>
    </VRow>
    <VRow>
      <VCol cols="12">
        <VCard>
          <VCardText>
            <VRow>
              <VCol cols="12" v-for="(item, index) in requirementData?.formData?.arrayInputs" :key="index">

                <VTextField v-if="item.type_input == 1" :label="item.label" v-model="item.answer"
                  :rules="item.required == 1 ? [requiredValidator] : []" disabled />

                <VSelect v-if="item.type_input == 2" :items="item.arrayOptions" item-value="id" item-title="name"
                  :label="item.label" v-model="item.answer" :rules="item.required == 1 ? [requiredValidator] : []"
                  disabled>
                </VSelect>


                <div class="demo-space-x" v-if="item.type_input == 3">
                  <VCheckbox v-model="item.answer" v-for="(option, indexO) in item.arrayOptions" :key="indexO"
                    :label="option.name" :value="option.id" :rules="item.required == 1 ? [requiredValidator] : []"
                    disabled />
                </div>

                <div v-if="item.type_input == 4">
                  <VLabel>{{ item.label }}</VLabel>
                  <VRadioGroup v-model="item.answer" :rules="item.required == 1 ? [requiredValidator] : []" disabled>
                    <VRadio v-for="(op, indexOP) in item.arrayOptions" :key="indexOP" :label="op.name" :value="op.id">
                    </VRadio>
                  </VRadioGroup>
                </div>

                <div v-if="item.type_input == 5">
                  <VLabel>{{ item.label }}</VLabel>
                  <a :href="item.answer" :download="item.label" target="_blank">
                    <VIcon icon="mdi-download"></VIcon>
                    Descargar
                  </a>
                </div>
              </VCol>
            </VRow>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>

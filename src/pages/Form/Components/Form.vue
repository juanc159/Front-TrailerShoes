<script lang="ts" setup  >
import { requiredValidator } from '@/@core/utils/validators';
import { useCrudFormStore } from '@/pages/Form/Store/useCrudFormStore';
import Swal from 'sweetalert2';
import type { VForm } from 'vuetify/components';
import { VDataTable } from 'vuetify/labs/VDataTable';

const storeForm = useCrudFormStore()
const { action, formulario } = storeToRefs(storeForm)
const errors = ref<Array<string>>([])

const formValidation = ref<VForm>()
const formInputValidation = ref<VForm>()
const formOptionValidation = ref<VForm>()

const changeScreen = async (typeAction: string) => {
  storeForm.typeAction = typeAction
  await formValidation.value?.resetValidation()
  errors.value = []
  if (typeAction != 'back')
    storeForm.keyList++
}

const submitForm = async () => {
  const validation = await formValidation.value?.validate()
  if (validation?.valid) {
    const data = await storeForm.fetchSave()
    if (data.code === 200) changeScreen("list");
    if (data.code === 422) errors.value = data.errors ?? []; //muestra error del back
  }
}

const formInput = ref<{
  label: null | string
  type_input: null | number
}>({
  label: null,
  type_input: null,
})
const formOption = ref<object>({
  name: null
})
const arrayOptions = ref<Array<object>>([])
const arrayTypeInputs = ref([
  {
    value: 1,
    title: 'text',
  },
  {
    value: 2,
    title: 'select',
  },
  {
    value: 3,
    title: 'checkbox',
  },
  {
    value: 4,
    title: 'radio',
  }
])

const clearFormInput = async () => {
  formInput.value = {
    label: null,
    type_input: null,
    // arrayOptions: [],
  }
}
const addInput = async () => {
  const validation = await formInputValidation.value?.validate()

  if (validation?.valid) {
    if (formInput.value.type_input != 1 && arrayOptions.value.length == 0) {
      Swal.fire("Debe agregar almenos una opción  al input")
      return false
    }
    const type = arrayTypeInputs.value.find(ele => ele.value == formInput.value.type_input)
    formulario.value.arrayInputs.push({
      label: formInput.value.label,
      type_input: formInput.value.type_input,
      type_name: type.title,
      arrayOptions: []
    })

    arrayOptions.value.forEach(element => {
      formulario.value.arrayInputs[formulario.value.arrayInputs.length - 1].arrayOptions.push(element)
    });

    clearFormInput()
  }
}
const deleteInput = async (pos: number) => {
  if (formulario.value.arrayInputs[pos].id) {
    formulario.value.arrayInputs[pos].delete = "delete"
  } else {
    formulario.value.arrayInputs.splice(pos, 1)
  }
}

const arrayInputs = computed(() => {
  return formulario.value.arrayInputs.filter(ele => ele.delete != 'delete')
})
const headers = [
  { title: '', key: 'data-table-expand', sortable: false },
  { title: 'Campo', key: 'label', sortable: false },
  { title: 'Tipo de campo', key: 'type_name', sortable: false },
  { title: 'Acciones', key: 'actions', sortable: false }
]

const clearFormOption = async () => {
  formInput.value = {
    label: null,
    type_input: null,
    // arrayOptions: [],
  }
  arrayOptions.value = []
}
const addOption = async () => {
  const validation = await formOptionValidation.value?.validate()
  if (validation?.valid) {
    arrayOptions.value.push({
      name: formOption.value.name
    })
    formOption.value = {
      name: null
    }
  }
}

const deleteOption = async (pos: number) => {
  if (arrayOptions.value[pos].id) {
    arrayOptions.value[pos].delete = "delete"
  } else {
    arrayOptions.value.splice(pos, 1)
  }
}
const deleteOptionInput = async (posI: number, posO: number) => {

  if (arrayInputs.value[posI].arrayOptions[posO].id) {
    arrayInputs.value[posI].arrayOptions[posO].delete = "delete"
  } else {
    arrayInputs.value[posI].arrayOptions.splice(posO, 1)
  }
}



const changeTypeInput = () => {
  arrayOptions.value = []
}


</script>

<template>
  <div>
    <HeaderAlertView sub-title="Formulario" :action="action" :validate-crud="true" :btn-back="true"
      @changeScreenBack="changeScreen('back')" />
    <VCard>
      <VCardText>
        <VForm ref="formValidation" lazy-validation>
          <VRow>
            <VCol cols="12" sm="6">
              <VTextField v-model="formulario.name" :rules="[requiredValidator]" :error-messages="errors.name"
                @keypress="errors.name = ''">
                <template #label>
                  Nombre&nbsp;<b class="text-warning">*</b>
                </template>
              </VTextField>
            </VCol>
          </VRow>
        </VForm>

        <VForm ref="formInputValidation" lazy-validation>
          <VRow>
            <VCol cols="12" class="pb-0">
              <VDivider class="border-opacity-75 mb-3" color="csecundary" :thickness="3" />
              <div class="d-flex">
                <VSheet class="w-100">
                  <b class="text-vblack fs-6 me-auto">Campos</b>
                </VSheet>
                <VSheet>
                  <VTooltip text="Campo" location="top">
                    <template v-slot:activator="{ props }">
                      <VBtn class="ms-1" color="light" rounded="lg" v-bind="props" @click="addInput()">
                        Agregar&nbsp;
                        <VIcon size="large" color="success" icon="mdi-plus" />
                      </VBtn>
                    </template>
                  </VTooltip>
                </VSheet>
              </div>
            </VCol>
            <VCol cols="12" sm="6">
              <VTextField v-model="formInput.label" :rules="[requiredValidator]">
                <template #label>
                  Nombre del campo&nbsp;<b class="text-warning">*</b>
                </template>
              </VTextField>
            </VCol>
            <VCol cols="12" sm="6">
              <VSelect clearable :rules="[requiredValidator]" @update:model-value="changeTypeInput()"
                :items="arrayTypeInputs" v-model="formInput.type_input">
                <template #label>
                  Tipo de campo&nbsp;<b class="text-warning">*</b>
                </template>
              </VSelect>
            </VCol>
          </VRow>
        </VForm>


        <VForm ref="formOptionValidation" lazy-validation v-if="formInput.type_input && formInput.type_input != 1">
          <VRow>
            <VCol cols="4">
              <VTextField clearable v-model="formOption.name" :rules="[requiredValidator]" label="Opción" />
            </VCol>
            <VCol cols="4">
              <VBtn @click="addOption()">
                Agregar Opción
              </VBtn>
            </VCol>
          </VRow>
          <VRow v-for="(item, index) in arrayOptions" :key="index">
            <VCol cols="4">
              <VTextField v-model="item.name" :rules="[requiredValidator]" :label="'Opción #' + (index + 1)" />
            </VCol>
            <VCol cols="4">
              <VBtn size="x-small" color="error" variant="text" icon @click="deleteOption(index)">
                <VIcon size="22" icon="tabler-trash" />
                <v-tooltip activator="parent" location="top">Borrar</v-tooltip>
              </VBtn>
            </VCol>
          </VRow>
        </VForm>


        <VRow>
          <VCol cols="12">
            <VDataTable :headers="headers" :items="arrayInputs">
              <template #item.actions="{ item, index }">
                <VBtn size="x-small" color="error" variant="text" icon @click="deleteInput(index)">
                  <VIcon size="22" icon="tabler-trash" />
                  <v-tooltip activator="parent" location="top">Borrar</v-tooltip>
                </VBtn>
              </template>

              <template #expanded-row="slotProps">
                <tr class="v-data-table__tr" v-if="slotProps.item.raw.type_name != 'text'">
                  <td :colspan="headers.length" v-if="slotProps.item.raw.arrayOptions.length > 0">
                    <VRow class="my-1" v-for="(item, indexOption) in slotProps.item.raw.arrayOptions" :key="indexOption">
                      <template v-if="!item.delete">
                        <VCol cols="1">
                          <VLabel>Opción {{ indexOption + 1 }} : </VLabel>
                        </VCol>
                        <VCol cols="4">
                          <VTextField clearable v-model="item.name" :rules="[requiredValidator]" />
                        </VCol>
                        <VCol cols="4">
                          <VBtn size="x-small" color="error" variant="text" icon
                            @click="deleteOptionInput(slotProps.index, indexOption)">
                            <VIcon size="22" icon="tabler-trash" />
                            <v-tooltip activator="parent" location="top">Borrar</v-tooltip>
                          </VBtn>
                        </VCol>
                      </template>
                    </VRow>
                  </td>
                  <td :colspan="headers.length" v-else>
                    <VRow class="my-1">
                      <VCol cols="12">
                        <b>
                          Esta tipo de input no posee opciones asociadas
                        </b>
                      </VCol>
                    </VRow>
                  </td>
                </tr>
              </template>

              <template #item.label="{ item }">
                <VTextField clearable v-model="item.raw.label" :rules="[requiredValidator]" />
              </template>

              <!-- <template #bottom></template> -->

            </VDataTable>
          </VCol>
        </VRow>

        <!--Guardar-->
        <VDivider class="border-opacity-75 my-4" color="cprimary" :thickness="3" />
        <VRow class="pt-0">
          <VCol class="text-center" cols="12">
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



      </VCardText>

    </VCard>
  </div>
</template>

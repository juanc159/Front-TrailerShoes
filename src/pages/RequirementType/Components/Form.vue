<script lang="ts" setup  >
import { useSelect2Infite } from "@/composables/useSelect2Infite"
import { requiredValidator } from '@validators'
import Swal from "sweetalert2"
import type { VForm } from 'vuetify/components'
import { VDataTable } from 'vuetify/labs/VDataTable'


// --- --- --- Store --- --- ---
import { useCrudRequirementTypeStore } from '@/pages/RequirementType/Store/useCrudRequirementTypeStore'
const storeRequirementType = useCrudRequirementTypeStore()
const {
  action, formulario, charges_arrayInfo, charges_countLinks, loading
} = storeToRefs(storeRequirementType)
// --- --- END Store --- --- ---

const errors = ref<Array<string>>([])
const formValidation = ref<VForm>()
const formInputValidation = ref<VForm>()
const formOptionValidation = ref<VForm>()

const selectInfiniteCharges = useSelect2Infite(storeRequirementType.fetchSelectCharges, charges_arrayInfo);

const changeScreen = async (typeAction: string) => {
  storeRequirementType.typeAction = typeAction
  clearFormPivot()
  clearFormInput()
  await formValidation.value?.resetValidation()
  errors.value = []
  if (typeAction != 'back')
    storeRequirementType.keyList++
}

const submitForm = async () => {
  const validation = await formValidation.value?.validate()
  if (validation?.valid) {
    const data = await storeRequirementType.fetchSave()
    if (data.code === 200) changeScreen("list");
    if (data.code === 422) errors.value = data.errors ?? []; //muestra error del back
  }
}

onMounted(async () => {
  await storeRequirementType.fetchDataForm()
  selectInfiniteCharges.dataNueva.value = charges_arrayInfo.value;
  selectInfiniteCharges.totalLinks.value = charges_countLinks.value;
})



//pivot
const formPivot = ref({
  charge: null,
  order: null,
})
const formPivotValidation = ref<VForm>()
const headers = [
  { title: 'Cargo', key: 'name' },
  { title: 'Orden', key: 'order' },
  { title: 'Acciones', sortable: false, key: 'actions' }
]

const clearFormPivot = () => {
  formPivot.value = {
    charge: null,
    order: null,
  }
}
const addArrayCharges = async () => {
  const validation = await formPivotValidation.value?.validate()
  if (validation?.valid) {
    const search = formulario.value.arrayCharges.find(ele => ele.charge_id == formPivot.value.charge)
    const searchOrder = formulario.value.arrayCharges.find(ele => ele.order == formPivot.value.order)
    const searchCharge = charges_arrayInfo.value.find(ele => ele.id == formPivot.value.charge)
    if (searchOrder) {
      Swal.fire("Ya existe un cargo con el número orden " + formPivot.value.order)
      return false
    }
    if (search) {
      Swal.fire("Ya existe este cargo agregado")
      return false
    } else {
      formulario.value.arrayCharges.push({
        charge_id: searchCharge?.id,
        name: searchCharge?.name,
        order: formPivot.value.order
      })
    }
    clearFormPivot()
  }
}
const deleteArrayCharge = (pos: number) => {
  formulario.value.arrayCharges.splice(pos, 1)
}


// formularios dinamicos
const inputsWithoutOptions = [1, 5]

const formInput = ref<{
  label: null | string
  type_input: null | number
  required: null | number | boolean
}>({
  label: null,
  type_input: null,
  required: 0,
})
const formOption = ref<object>({
  name: null
})
const arrayOptions = ref<Array<object>>([])
const arrayTypeInputs = ref([
  { value: 1, title: 'text' },
  { value: 2, title: 'select' },
  { value: 3, title: 'checkbox' },
  { value: 4, title: 'radio' },
  { value: 5, title: 'file' }
])

const arrayInputs = computed(() => {
  return formulario.value.arrayInputs.filter(ele => ele.delete != 'delete')
})

const headersForm = [
  { title: '', key: 'data-table-expand', sortable: false },
  { title: 'Label', key: 'label', sortable: false },
  { title: 'Obligatorio', key: 'required', sortable: false },
  { title: 'Tipo de input', key: 'type_name', sortable: false },
  { title: 'Acciones', key: 'actions', sortable: false }
]

const changeTypeInput = () => {
  arrayOptions.value = []
}

const addInput = async () => {
  const validation = await formInputValidation.value?.validate()

  if (validation?.valid) {
    if (!inputsWithoutOptions.includes(formInput.value.type_input) && arrayOptions.value.length == 0) {
      Swal.fire("Debe agregar almenos una opción  al input")
      return false
    }
    const type = arrayTypeInputs.value.find(ele => ele.value == formInput.value.type_input)
    formulario.value.arrayInputs.push({
      label: formInput.value.label,
      type_input: formInput.value.type_input,
      required: formInput.value.required,
      type_name: type.title,
      arrayOptions: []
    })

    arrayOptions.value.forEach(element => {
      formulario.value.arrayInputs[formulario.value.arrayInputs.length - 1].arrayOptions.push(element)
    });

    clearFormInput()
  }
}
const clearFormInput = async () => {
  formInput.value = {
    label: null,
    type_input: null,
    required: 0,
  }
}
const deleteInput = async (pos: number) => {
  if (formulario.value.arrayInputs[pos].id) {
    formulario.value.arrayInputs[pos].delete = "delete"
  } else {
    formulario.value.arrayInputs.splice(pos, 1)
  }
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

</script>

<template>
  <div>

    <HeaderAlertView sub-title="Tipo de solicitud" :action="action" :validate-crud="true" :btn-back="true"
      @changeScreenBack="changeScreen" />

    <VContainer class="bg-vwhite" fluid>

      <VForm ref="formValidation" lazy-validation>
        <VRow>
          <VCol cols="12" sm="6">
            <VTextField clearable v-model="formulario.name" :rules="[requiredValidator]" :error-messages="errors.name"
              @keypress="errors.name = ''">
              <template #label>
                Nombre&nbsp;<b class="text-warning">*</b>
              </template>
            </VTextField>
          </VCol>
          <VCol cols="12" sm="6">
            <div class="demo-space-x">
              <VCheckbox v-model="formulario.internal" :true-value="1" :false-value="0" label="Interno" />
              <VCheckbox v-model="formulario.external" :true-value="1" :false-value="0" label="Externo" />
            </div>
          </VCol>
        </VRow>
      </VForm>

      <VForm ref="formPivotValidation" lazy-validation>
        <VRow>
          <VCol cols="12" class="pb-0">
            <VDivider class="border-opacity-75 mb-3" color="csecundary" :thickness="3" />
            <div class="d-flex">
              <VSheet class="w-100">
                <b class="text-vblack fs-6 me-auto">Cargos</b>
              </VSheet>
              <VSheet>
                <VTooltip text="Cargo" location="top">
                  <template v-slot:activator="{ props }">
                    <VBtn class="ms-1" color="light" rounded="lg" v-bind="props" @click="addArrayCharges()">
                      Agregar&nbsp;
                      <VIcon size="large" color="success" icon="mdi-plus" />
                    </VBtn>
                  </template>
                </VTooltip>
              </VSheet>
            </div>
          </VCol>
          <VCol cols="12" sm="6" md="4">
            <VSelect clearable item-title="name" label="Cargo" item-value="id"
              :items="selectInfiniteCharges.dataNueva.value" v-model="formPivot.charge" :rules="[requiredValidator]">
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
                </div>
              </template>
            </VSelect>
          </VCol>
          <VCol cols="12" sm="6" md="4">
            <VTextField type="number" clearable v-model="formPivot.order" :rules="[requiredValidator]" label="Orden" />
          </VCol>
        </VRow>
        <VDataTable :headers="headers" items-per-page="999" :items="formulario.arrayCharges">
          <template #item.actions="{ item, index }">
            <VBtn size="x-small" color="error" variant="text" icon @click="deleteArrayCharge(index)">
              <VIcon size="22" icon="tabler-trash" />
              <v-tooltip activator="parent" location="top">Borrar</v-tooltip>
            </VBtn>
          </template>
          <template #bottom>
          </template>
        </VDataTable>
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
          <VCol cols="12" sm="6" md="4">
            <VTextField v-model="formInput.label" :rules="[requiredValidator]">
              <template #label>
                Nombre del campo&nbsp;<b class="text-warning">*</b>
              </template>
            </VTextField>
          </VCol>
          <VCol cols="12" sm="6" md="4">
            <VSelect clearable :rules="[requiredValidator]" @update:model-value="changeTypeInput()"
              :items="arrayTypeInputs" v-model="formInput.type_input">
              <template #label>
                Tipo de campo&nbsp;<b class="text-warning">*</b>
              </template>
            </VSelect>
          </VCol>
          <VCol cols="6" sm="6" md="4">
            <VCheckbox label="Obligatorio" v-model="formInput.required" :true-value="1" :false-value="0" />
          </VCol>
        </VRow>
      </VForm>

      <VForm ref="formOptionValidation" lazy-validation
        v-if="formInput.type_input && !inputsWithoutOptions.includes(formInput.type_input)">
        <VRow>
          <VCol cols="12" sm="4">
            <VTextField clearable v-model="formOption.name" :rules="[requiredValidator]" label="Opción" />
          </VCol>
          <VCol cols="12" sm="4">
            <VBtn @click="addOption()">
              Agregar Opción
            </VBtn>
          </VCol>
        </VRow>
        <VRow v-for="(item, index) in arrayOptions" :key="index">
          <VCol cols="12" sm="4">
            <VTextField v-model="item.name" :rules="[requiredValidator]" :label="'Opción #' + (index + 1)" />
          </VCol>
          <VCol cols="12" sm="4">
            <VBtn size="x-small" color="error" variant="text" icon @click="deleteOption(index)">
              <VIcon size="22" icon="tabler-trash" />
              <v-tooltip activator="parent" location="top">Borrar</v-tooltip>
            </VBtn>
          </VCol>
        </VRow>
      </VForm>

      <VRow>
        <VCol cols="12">
          <VDataTable :headers="headersForm" :items="arrayInputs">
            <template #item.actions="{ item, index }">
              <VBtn size="x-small" color="error" variant="text" icon @click="deleteInput(index)">
                <VIcon size="22" icon="tabler-trash" />
                <v-tooltip activator="parent" location="top">Borrar</v-tooltip>
              </VBtn>
            </template>

            <template #expanded-row="slotProps">
              <tr class="v-data-table__tr">
                <td :colspan="headers.length" v-if="slotProps.item.raw.arrayOptions.length > 0">
                  <VRow class="my-1" v-for="(item, indexOption) in slotProps.item.raw.arrayOptions" :key="indexOption">
                    <template v-if="!item.delete">
                      <VCol cols="1">
                        <VLabel>Opción {{ indexOption + 1 }} : </VLabel>
                      </VCol>
                      <VCol cols="12" sm="4">
                        <VTextField clearable v-model="item.name" :rules="[requiredValidator]" />
                      </VCol>
                      <VCol cols="12" sm="4">
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
                      <b>Esta tipo de input no posee opciones asociadas</b>
                    </VCol>
                  </VRow>
                </td>
              </tr>
            </template>

            <template #item.label="{ item }">
              <VRow class="my-5">
                <VCol cols="12">
                  <VTextField clearable v-model="item.raw.label" :rules="[requiredValidator]" />
                </VCol>
              </VRow>
            </template>
            <template #item.required="{ item }">
              <VRow class="my-5">
                <VCol cols="12">
                  <VCheckbox v-model="item.raw.required" :true-value="1" :false-value="0"></VCheckbox>
                </VCol>
              </VRow>
            </template>

            <template #bottom></template>

          </VDataTable>
        </VCol>
      </VRow>

      <VDivider class="border-opacity-75 my-4" color="cprimary" :thickness="3" />
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
    </VContainer>

  </div>
</template>

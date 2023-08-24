<script lang="ts" setup>
import Swal from 'sweetalert2'

import { VDataTable } from 'vuetify/labs/VDataTable'

import PreloadInterno from '@/components/Prelaod/PreloadInterno.vue'
import { useRequirementStore } from '@/pages/Requirement/Store/useRequirementStore'
import { useAuthenticationStore } from '@/stores/useAuthenticationStore'

const requirementStore = useRequirementStore()
const authenticationStore = useAuthenticationStore()

// RequestType data paginate
const { action, requirements, totalPage, lastPage, currentPage, totalData, loading } = storeToRefs(requirementStore)

const rowPerPage = ref<number>(10)
const searchQuery = ref<string>('')
const sort_direction = ref<string>('')
const sort_field = ref<string>('')

const fetchDataList = async () => {
  let filter = {
    perPage: rowPerPage.value,
    page: currentPage.value,
    searchQuery: searchQuery.value,
    sort_direction: sort_direction.value,
    sort_field: sort_field.value
  }

  filter.charge_id = authenticationStore.user?.charge_id
  if (authenticationStore.user?.role_id == 2) {
    filter.user_id = authenticationStore.user?.id
  }
  await requirementStore.fetchAll(filter)
}

const headers = [
  { title: 'Id', key: 'id' },
  { title: 'Tipo', key: 'type' },
  { title: 'Estado', key: 'state' },
  { title: 'Acciones', sortable: false, key: 'actions' },
]

onMounted(async () => {
  await fetchDataList()
})

const handleSortBy = async (column: any) => {
  if (column.length > 0) {
    sort_direction.value = column[0].order
    sort_field.value = column[0].key
    await fetchDataList()
  }
}

watchArray([searchQuery, rowPerPage], async () => {
  currentPage.value = 1
})
watchArray([currentPage, searchQuery, rowPerPage], async () => {
  await fetchDataList()
})

// 👉 Computing pagination data
const paginationData = computed(() => {
  const firstIndex = requirements.value.length ? ((currentPage.value - 1) * totalPage.value) + 1 : 0
  const lastIndex = requirements.value.length + ((currentPage.value - 1) * totalPage.value)

  return `Mostrando ${firstIndex} a ${lastIndex} de ${totalData.value} registros`
})

const changeScreen = async (screen: string, registryId: number | null = null) => {
  action.value = (registryId == null) ? 'new' : 'edit'
  requirementStore.clearFormularioManage()
  requirementStore.disabled = false
  requirementStore.clearFormulario()

  requirementStore.typeAction = screen
  if (registryId && screen == 'ManageData') {
    requirementStore.fetchManageDataForm({
      requirement_id: registryId,
    })
  }
  if (registryId && screen == 'form') {
    requirementStore.fetchInfo(registryId)
  }
}

const deleteData = async (id: number) => {
  Swal.fire({
    title: '¿Desea eliminar el registro?',
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: 'Si',
    denyButtonText: 'No',
  }).then(async result => {
    if (result.isConfirmed) {
      await requirementStore.fetchDelete(id)
      await fetchDataList()
    }
    else if (result.isDenied) {
    }
  })
}
</script>

<template>
  <div>
    <HeaderAlertView title="Listado" sub-title="Solicitudes" icon="mdi-format-list-bulleted" />
    <VDataTable :headers="headers" :items="requirements" :items-per-page="rowPerPage" @update:sort-by="handleSortBy">
      <template #item.actions="{ item }">
        <div v-if="authenticationStore.user?.charge_id && item.props.title.state_id == 3">
          <VBtn icon size="x-small" color="default" variant="text" @click="changeScreen('ManageData', item.value)">
            <VIcon size="22" icon="tabler-eye" />
            <VTooltip activator="parent" location="top">
              Visualizar
            </VTooltip>
          </VBtn>
        </div>
        <div v-if="item.props.title.state_id != 3 && authenticationStore.user?.charge_id">
          <VBtn size="x-small" color="error" variant="text" icon @click="deleteData(item.value)">
            <VIcon size="22" icon="tabler-trash" />
            <VTooltip activator="parent" location="top">
              Borrar
            </VTooltip>
          </VBtn>
          <VBtn icon size="x-small" color="default" variant="text" @click="changeScreen('ManageData', item.value)">
            <VIcon size="22" icon="tabler-settings" />
            <VTooltip activator="parent" location="top">
              Gestionar
            </VTooltip>
          </VBtn>
        </div>
        <a v-if="item.raw.archive_final" :href="item.raw.archive_final" download="Documento Final" target="_blank">
          <VIcon icon="mdi-download"></VIcon>
          Descargar
        </a>
        <div v-if="authenticationStore.permissions.includes('petition.index')">
          <VBtn icon size="x-small" color="default" variant="text" @click="changeScreen('form', item.value)">
            <VIcon size="22" icon="tabler-eye" />
            <VTooltip activator="parent" location="top">
              Visualizar
            </VTooltip>
          </VBtn>
        </div>
      </template>

      <template v-if="loading.table" #body>
        <tr>
          <td colspan="4">
            <div style="width: 100;" class="d-flex justify-content-center">
              <PreloadInterno />
            </div>
          </td>
        </tr>
      </template>

      <template #top>
        <VContainer fluid class="d-flex flex-wrap py-4 gap-4">
          <div class="me-3" style="width: 80px;">
            <VSelect v-model="rowPerPage" density="compact" variant="outlined" :items="[10, 20, 30, 50]" />
          </div>

          <VSpacer />

          <div class="app-user-search-filter d-flex  align-center flex-wrap gap-4">
            <div style="width: 10rem;">
              <VTextField v-model="searchQuery" placeholder="Buscar" density="compact" />
            </div>
            <VTooltip text="Solicitud" location="top">
              <template v-slot:activator="{ props }">
                <VBtn v-if="authenticationStore.permissions.includes('petition.index')" class="ms-1" color="light"
                  rounded="lg" v-bind="props" @click="changeScreen('form')">
                  Crear&nbsp;
                  <VIcon size="large" color="success" icon="mdi-plus" />
                </VBtn>
              </template>
            </VTooltip>
          </div>
        </VContainer>
      </template>

      <template #bottom>
        <VCardText class="pt-2">
          <VRow>
            <VCol lg="4" cols="3">
              {{ paginationData }}
            </VCol>

            <VCol lg="8" cols="9" class="d-flex justify-end">
              <VPagination v-model="currentPage" :total-visible="5" size="small" :length="lastPage" />
            </VCol>
          </VRow>
        </VCardText>
      </template>
    </VDataTable>
  </div>
</template>

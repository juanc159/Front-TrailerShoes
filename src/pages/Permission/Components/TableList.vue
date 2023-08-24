<script lang="ts" setup>

import Swal from 'sweetalert2'

import { VDataTable } from 'vuetify/labs/VDataTable'

import PreloadInterno from '@/components/Prelaod/PreloadInterno.vue'

// --- --- --- Store --- --- ---
import { useCrudPermissionStore } from '@/pages/Permission/Store/useCrudPermissionStore'
const storePermission = useCrudPermissionStore()
const {
  action, permissions, totalPage, lastPage, currentPage, totalData, loading
} = storeToRefs(storePermission)
// --- --- END Store --- --- ---


// permission data paginate
const rowPerPage = ref<number>(10)
const searchQuery = ref<string>('')
const sort_direction = ref<string>('')
const sort_field = ref<string>('')

const fetchDataList = async () => {
  await storePermission.fetchAll({
    perPage: rowPerPage.value,
    page: currentPage.value,
    searchQuery: searchQuery.value,
    sort_direction: sort_direction.value,
    sort_field: sort_field.value,
  })
}

const headers = [
  { title: 'Grupo', key: 'group', sortable: false },
  { title: 'Nombre', key: 'name' },
  { title: 'Descripción', key: 'description' },
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
  const firstIndex = permissions.value.length ? ((currentPage.value - 1) * totalPage.value) + 1 : 0
  const lastIndex = permissions.value.length + ((currentPage.value - 1) * totalPage.value)

  return `Mostrando ${firstIndex} a ${lastIndex} de ${totalData.value} registros`
})

const changeScreen = async (screen: string, registryId: number | null = null) => {
  action.value = ( registryId == null ) ? 'new' : 'edit'
  storePermission.clearFormulario()
  storePermission.typeAction = screen
  if( registryId ) storePermission.fetchInfo(registryId)
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
      await storePermission.fetchDelete(id)
      await fetchDataList()
    }
    else if (result.isDenied) {
    }
  })
}
</script>

<template>
  <div>
    <HeaderAlertView title="Listado" sub-title="Permisos"
      icon="mdi-format-list-bulleted"
    />
    <VContainer class="bg-vwhite" fluid>
      <VDataTable :headers="headers" :items="permissions" :items-per-page="rowPerPage" @update:sort-by="handleSortBy">
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
              <VTooltip text="Agregar" location="top">
                <template v-slot:activator="{ props }">
                  <VBtn class="ms-1" color="light" rounded="lg" v-bind="props" @click="changeScreen('form')">
                    Agregar&nbsp;<VIcon size="large" color="success" icon="mdi-plus" />
                  </VBtn>
                </template>
              </VTooltip>
            </div>
          </VContainer>
        </template>
        <template #item.actions="{ item }">
          <VBtn size="x-small" color="error" variant="text" icon @click="deleteData(item.value)">
            <VIcon size="22" icon="tabler-trash" />
            <VTooltip activator="parent" location="top">
              Borrar
            </VTooltip>
          </VBtn>
          <VBtn icon size="x-small" color="default" variant="text" @click="changeScreen('form', item.value)">
            <VIcon size="22" icon="tabler-edit" />
            <VTooltip activator="parent" location="top">
              Editar
            </VTooltip>
          </VBtn>
        </template>
        <template v-if="loading" #body>
          <tr>
            <td colspan="4">
              <div style="width: 100;" class="d-flex justify-content-center">
                <PreloadInterno />
              </div>
            </td>
          </tr>
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
    </VContainer>
  </div>
</template>

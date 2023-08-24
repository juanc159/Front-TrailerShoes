<script lang="ts" setup>
import PreloadInterno from '@/components/Prelaod/PreloadInterno.vue'
import { useCrudUserStore } from '@/pages/User/Store/useCrudUserStore'
import router from '@/router'
import Swal from 'sweetalert2'
import { VDataTable } from 'vuetify/labs/VDataTable'

const route = useRoute()
const storeUser = useCrudUserStore()

const headers = [
  { title: 'Nombre usuario', key: 'name' },
  { title: 'Tipo de identificación', key: 'identityType_name' },
  { title: 'Número de identificación', key: 'idNumber' },
  { title: 'Correo', key: 'email' },
  { title: 'Rol', key: 'role_name' },
  { title: 'Cargo', key: 'charge_name' },
  { title: 'Acciones', sortable: false, key: 'actions' },
]

// users data paginate
const { 
  action, users, totalPage, lastPage, currentPage, totalData, loading, countRoles, typeAction
} = storeToRefs(storeUser)
const rowPerPage = ref<number>(10)
const searchQuery = ref<string>('')

const sort_direction = ref<string>('')
const sort_field = ref<string>('')

const fetchDataList = async () => {
  await storeUser.fetchAll({
    perPage: rowPerPage.value,
    page: currentPage.value,
    searchQuery: searchQuery.value,
    sort_direction: sort_direction.value,
    sort_field: sort_field.value,
  })
}

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
  const firstIndex = users.value.length ? ((currentPage.value - 1) * totalPage.value) + 1 : 0
  const lastIndex = users.value.length + ((currentPage.value - 1) * totalPage.value)

  return `Mostrando ${firstIndex} a ${lastIndex} de ${totalData.value} registros`
})

const changeScreen = async (screen: string, registryId: number | null = null) => {
  action.value = ( registryId == null ) ? 'new' : 'edit'
  storeUser.clearFormulario()
  storeUser.typeAction = screen
  if (countRoles.value == 0 && screen == 'form') {
    Swal.fire({
      title: 'Primero debe ingresar los roles',
      showCancelButton: false,
      showDenyButton: true,
      denyButtonText: 'Cerrar',
      confirmButtonText: 'Ir',
    }).then(async result => {
      if (result.isConfirmed) {
        router.push('/admin/role')
      }
      else if (result.isDenied) {
      }
    })
  }
  if (registryId)
    storeUser.fetchInfo(registryId)
}

// Accion cambio de estado
const changeState = async (object: object, state: number) => {
  storeUser.changeState(object, state)
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
      await storeUser.fetchDelete(id)
      await fetchDataList()
    }
    else if (result.isDenied) {
    }
  })
}
</script>

<template>
  <div>
    <HeaderAlertView title="Listado" sub-title="Usuarios"
      icon="mdi-format-list-bulleted"
    />
    <VContainer class="bg-vwhite" fluid>
      <VDataTable :headers="headers" :items="users" :items-per-page="rowPerPage" @update:sort-by="handleSortBy">
        <template #item.actions="{ item }">
          <VBtn icon size="x-small" color="error" variant="text" @click="deleteData(item.value)">
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
            <td colspan="7">
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

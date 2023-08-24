<script lang="ts" setup>
import PreloadInterno from '@/components/Prelaod/PreloadInterno.vue'
import { useCrudMenuStore } from '@/pages/Menu/Store/useCrudMenuStore'
import Swal from 'sweetalert2'
import { VDataTable } from 'vuetify/labs/VDataTable'

const storeMenu = useCrudMenuStore()

// menu data paginate
const { action, menus, totalPage, currentPage, totalData, loading } = storeToRefs(storeMenu)
const rowPerPage = ref<number>(10)
const searchQuery = ref<string>('')
const sort_direction = ref<string>('')
const sort_field = ref<string>('')

const headers = [
  { title: 'Título', key: 'title' },
  { title: 'Direccionar a', key: 'to' },
  { title: 'Icon', key: 'icon' },
  { title: 'Acciones', sortable: false, key: 'actions' },
]

const fetchDataList = async () => {
  await storeMenu.fetchAll({
    perPage: rowPerPage.value,
    page: currentPage.value,
    searchQuery: searchQuery.value,
  })
}

onMounted(async () => {
  if (storeMenu.typeAction != 'back')
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
  const firstIndex = menus.value.length ? ((currentPage.value - 1) * totalPage.value) + 1 : 0
  const lastIndex = menus.value.length + ((currentPage.value - 1) * totalPage.value)

  return `Mostrando ${firstIndex} a ${lastIndex} de ${totalData.value} registros`
})

const changeScreen = async (screen: string, registryId: number | null = null) => {
  action.value = ( registryId == null ) ? 'new' : 'edit'
  storeMenu.clearFormulario()
  storeMenu.typeAction = screen
  if( registryId ) storeMenu.fetchInfo(registryId)
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
      await storeMenu.fetchDelete(id)
      await fetchDataList()
    }
    else if (result.isDenied) {
    }
  })
}
</script>

<template>
  <div>

    <HeaderAlertView title="Listado" sub-title="Menú"
      icon="mdi-format-list-bulleted"
    />

    <VContainer class="bg-vwhite" fluid>
      <VDataTable :headers="headers" :items="menus" :items-per-page="rowPerPage" @update:sort-by="handleSortBy">
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
              <VTooltip text="Guardar" location="top">
                <template v-slot:activator="{ props }">
                  <VBtn class="ms-1" color="light" rounded="lg" v-bind="props" @click="changeScreen('form')">
                    Agregar&nbsp;<VIcon size="large" color="success" icon="mdi-plus"/>
                  </VBtn>
                </template>
              </VTooltip>
            </div>
          </VContainer>
        </template>
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

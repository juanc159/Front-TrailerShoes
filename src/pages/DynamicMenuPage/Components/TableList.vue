<script lang="ts" setup>
import PreloadInterno from '@/components/Prelaod/PreloadInterno.vue'

//Store
import { useCrudDynamicMenuPageStore } from '@/pages/DynamicMenuPage/Store/useCrudDynamicMenuPageStore'
import { useDynamicPageStore } from '@/pages/DynamicPage/Store/useDynamicPageStore'
const storeDynamicMenuPage = useCrudDynamicMenuPageStore()
const dynamicPageStore = useDynamicPageStore()
const { action, menus, totalPage, currentPage, totalData, loading, lastPage } = storeToRefs(storeDynamicMenuPage)



import Swal from 'sweetalert2'
import { VDataTable } from 'vuetify/labs/VDataTable'


// menu data paginate
const rowPerPage = ref<number>(10)
const searchQuery = ref<string>('')
const sort_direction = ref<string>('')
const sort_field = ref<string>('')

const headers = [
  { title: 'Título', key: 'title' },
  { title: 'Icon', key: 'icon' },
  { title: 'Padre', key: 'father_name' },
  { title: 'Estado', key: 'state' },
  { title: 'Principal', key: 'principal' },
  { title: 'Acciones', sortable: false, key: 'actions' },
]

const fetchDataList = async () => {
  await storeDynamicMenuPage.fetchAll({
    perPage: rowPerPage.value,
    page: currentPage.value,
    searchQuery: searchQuery.value,
  })
}

onMounted(async () => {
  if (storeDynamicMenuPage.typeAction != 'back')
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
  action.value = (registryId == null) ? 'new' : 'edit'
  storeDynamicMenuPage.clearFormulario()
  storeDynamicMenuPage.typeAction = screen
  if (registryId && screen == 'form')
    storeDynamicMenuPage.fetchInfo(registryId)
  if (registryId && screen == 'dynamicPage')
    dynamicPageStore.fetchInfoPage(registryId)
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
      await storeDynamicMenuPage.fetchDelete(id)
      await fetchDataList()
    }
    else if (result.isDenied) {
    }
  })
}

// Accion cambio de estado
const changeState = async (object: object, state: number) => {
  console.log('object', object)
  console.log('state', state)

  storeDynamicMenuPage.changeState(object, state)
}
</script>

<template>
  <div>
    <HeaderAlertView title="Listado" sub-title="Menú dinámico páginas" icon="mdi-format-list-bulleted" />
    <VDataTable :headers="headers" :items="menus" :items-per-page="rowPerPage" @update:sort-by="handleSortBy">
      <template #item.state="{ item }">
        <VSwitch v-model="item.raw.state" color="success" inset :value="item.raw.state" :true-value="1" :false-value="0"
          hide-details @click="changeState(item.raw, item.raw.state)" />
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
        <VBtn icon size="x-small" color="default" variant="text" @click="changeScreen('dynamicPage', item.value)">
          <VIcon size="22" icon="tabler-file-info" />
          <VTooltip activator="parent" location="top">
            Pagina
          </VTooltip>
        </VBtn>
      </template>

      <template v-if="loading" #body>
        <tr>
          <td colspan="6">
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
            <VTooltip text="Menú" location="top">
              <template v-slot:activator="{ props }">
                <VBtn class="ms-1" color="light" rounded="lg" v-bind="props" @click="changeScreen('form')">
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

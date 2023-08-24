<script lang="ts" setup>

import { VDataTable } from 'vuetify/labs/VDataTable'

import PreloadInterno from '@/components/Prelaod/PreloadInterno.vue'
import { useCrudAuditStore } from '@/pages/Audit/Store/useCrudAuditStore'

const auditStore = useCrudAuditStore()

// permission data paginate
const { logInfos, totalPage, lastPage, currentPage, totalData, loading } = storeToRefs(auditStore)

const rowPerPage = ref<number>(10)
const searchQuery = ref<string>('')
const sort_direction = ref<string>('')
const sort_field = ref<string>('')

const fetchDataList = async () => {
  await auditStore.fetchAll({
    perPage: rowPerPage.value,
    page: currentPage.value,
    searchQuery: searchQuery.value,
    sort_direction: sort_direction.value,
    sort_field: sort_field.value,

    //filtro personalizado
    action: filter.value.action,
    module: filter.value.module,
    description: filter.value.description,
    user_name: filter.value.user_name,
    dateIntial: filter.value.dateIntial,
    dateFinal: filter.value.dateFinal,

  })
}

const headers = [
  { title: 'Acción', key: 'action' },
  { title: 'Modulo', key: 'module' },
  { title: 'Descripción', key: 'description' },
  { title: 'Usuario', key: 'user_name' },
  { title: 'Fecha', key: 'created_at' },
  { title: 'Acciones', key: 'actions', sortable: false },
]

onMounted(async () => {
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
  const firstIndex = logInfos.value.length ? ((currentPage.value - 1) * totalPage.value) + 1 : 0
  const lastIndex = logInfos.value.length + ((currentPage.value - 1) * totalPage.value)

  return `Mostrando ${firstIndex} a ${lastIndex} de ${totalData.value} registros`
})


const filter = ref<{
  action: null | string,
  module: null | string,
  description: null | string,
  user_name: null | string,
  dateIntial: null | string,
  dateFinal: null | string,
}>({
  action: null,
  module: null,
  description: null,
  user_name: null,
  dateIntial: null,
  dateFinal: null,
})

const isDialogVisible = ref<boolean>(false)
const info = ref<object>({})
const openModal = (item: object) => {
  isDialogVisible.value = true
  info.value = item
}
</script>

<template>
  <div>
    <VRow>
      <VCol cols="12" sm="4">
        <VTextField v-model="filter.action" label="Acción" />
      </VCol>
      <VCol cols="12" sm="4">
        <VTextField v-model="filter.module" label="Módulo" />
      </VCol>
      <VCol cols="12" sm="4">
        <VTextField v-model="filter.description" label="Descripción" />
      </VCol>
      <VCol cols="12" sm="4">
        <VTextField v-model="filter.user_name" label="Usuario" />
      </VCol>
      <VCol cols="12" sm="4">
        <VTextField type="date" v-model="filter.dateIntial" label="Fecha inicio" />
      </VCol>
      <VCol cols="12" sm="4">
        <VTextField type="date" v-model="filter.dateFinal" label="Fecha Fin" />
      </VCol>
    </VRow>
    <VRow>
      <VCol class="d-flex justify-content-center">
        <VBtn color="primary" @click="fetchDataList()">Buscar</VBtn>
      </VCol>
    </VRow>
    <VDataTable :headers="headers" :items="logInfos" :items-per-page="rowPerPage" @update:sort-by="handleSortBy">
      <template #item.actions="{ item }">
        <VBtn size="x-small" variant="text" icon @click="openModal(item.raw)">
          <VIcon size="22" icon="tabler-eye" />
          <VTooltip activator="parent" location="top">
            Visualizar
          </VTooltip>
        </VBtn>
      </template>
      <template v-if="loading" #body>
        <tr>
          <td colspan="5">
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


    <VDialog v-model="isDialogVisible" width="900">


      <!-- Dialog close btn -->
      <DialogCloseBtn @click="isDialogVisible = !isDialogVisible" />

      <!-- Dialog Content -->
      <VCard>
        <VCardText>
          <VRow>
            <VCol cols="12" sm="6">
              <h3>Antes</h3>
              <ul>
                <li v-for="(item, index) in JSON.parse(info.before)" :key="index">
                  <b>{{ index }}: </b>
                  <span>{{ item }}</span>
                </li>
              </ul>
            </VCol>
            <VCol cols="12" sm="6">
              <h3>Despues</h3>
              <ul>
                <li v-for="(item, index) in JSON.parse(info.after)" :key="index">
                  <b>{{ index }}: </b>
                  <span>{{ item }}</span>
                </li>
              </ul>
            </VCol>
          </VRow>
        </VCardText>

      </VCard>
    </VDialog>
  </div>
</template>

<script setup lang="ts">
import { useDynamicPageStore } from '@/pages/DynamicPage/Store/useDynamicPageStore'


const dynamicPageStore = useDynamicPageStore()
const { modalModuleSocialNetwork, arraySections, sectionSelected, rowSelected, columnsSelected, editModuleSocialNetwork, socialNetworks } = storeToRefs(dynamicPageStore)

const form = ref<{
  form_id: null | number
}>({
  form_id: null,
})


onMounted(() => {
  if (editModuleSocialNetwork.value) {
    form.value.form_id = JSON.parse(JSON.stringify(arraySections.value[sectionSelected.value].arrayRows[rowSelected.value].columns[columnsSelected.value].contentSocialNetwork.value))
    socialNetworkData.value = JSON.parse(JSON.stringify(arraySections.value[sectionSelected.value].arrayRows[rowSelected.value].columns[columnsSelected.value].contentSocialNetwork))
  }
})


const closeMenuModule = () => {
  modalModuleSocialNetwork.value = false
  form.value = {
    form_id: null
  }
  socialNetworkData.value = null
}

const saveData = async () => {
  arraySections.value[sectionSelected.value].arrayRows[rowSelected.value].columns[columnsSelected.value].contentSocialNetwork = JSON.parse(JSON.stringify(socialNetworkData.value))
  closeMenuModule()
}
const socialNetworkData = ref<null | object>(null)
const changeForm = async (e) => {
  const find = socialNetworks.value.find(ele => ele.value == e)
  if (find)
    socialNetworkData.value = find
}


</script>

<template>
  <div>
    <VDialog v-model="modalModuleSocialNetwork" width="800" persistent>
      <!-- Dialog close btn -->
      <DialogCloseBtn @click="closeMenuModule" />

      <!-- Dialog Content -->
      <VCard>
        <VCardTitle primary-title>
          <span>Redes Sociales</span>
        </VCardTitle>

        <VCardText>
          <VRow>
            <VCol cols="6">
              <VSelect clearable :items="socialNetworks" v-model="form.form_id" label="Redes Sociales"
                @update:model-value="changeForm($event)">
              </VSelect>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12">
              <a :href="socialNetworkData.url" target="_blank" v-if="socialNetworkData">
                <VImg :src="socialNetworkData.path"></VImg>
              </a>
            </VCol>
          </VRow>
        </VCardText>

        <VCardText class="d-flex justify-end">
          <VBtn size="40" color="error" icon class="mr-3" @click="closeMenuModule">
            <VIcon size="30" icon="tabler-circle-x" />
          </VBtn>
          <VBtn size="40" color="success" icon @click="saveData">
            <VIcon size="30" icon="tabler-circle-check" />
          </VBtn>
        </VCardText>
      </VCard>
    </VDialog>
  </div>
</template> 

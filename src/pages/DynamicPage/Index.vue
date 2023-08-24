<script setup lang="ts">
import ModuleForm from '@/pages/DynamicPage/Components/ModuleForm.vue';
import ModuleImage from '@/pages/DynamicPage/Components/ModuleImage.vue';
import ModulePopUps from '@/pages/DynamicPage/Components/ModulePopUps.vue';
import ModuleSlider from '@/pages/DynamicPage/Components/ModuleSlider.vue';
import ModuleSocialNetwork from '@/pages/DynamicPage/Components/ModuleSocialNetwork.vue';
import ModuleText from '@/pages/DynamicPage/Components/ModuleText.vue';
import Section from '@/pages/DynamicPage/Components/Section.vue';
import { useDynamicPageStore } from '@/pages/DynamicPage/Store/useDynamicPageStore';
import { useRouter } from 'vue-router';
import draggable from 'vuedraggable';


const dynamicPageStore = useDynamicPageStore()
const { form, arraySections, keyComponentModuleText,
  keyComponentModuleImage, keyComponentModuleSlider,
  keyComponentModulePopUps, keyComponentModuleForm, keyComponentModuleSocialNetwork
} = storeToRefs(dynamicPageStore)

import { useCrudDynamicMenuPageStore } from '@/pages/DynamicMenuPage/Store/useCrudDynamicMenuPageStore';
const storeDynamicMenuPage = useCrudDynamicMenuPageStore()
const { action, typeAction } = storeToRefs(storeDynamicMenuPage)

const dragSection = ref<boolean>(false)

const router = useRouter();
const nuevaVentanaURL = ref('');

const preview = () => {
  nuevaVentanaURL.value = router.resolve('/pagePreview').href;
  console.log("nuevaVentanaURL", nuevaVentanaURL.value);

  window.open(nuevaVentanaURL.value, '_blank');
}
const savePage = () => {
  form.value.metaData = JSON.stringify(arraySections.value)
  dynamicPageStore.fetchSave()
}
const changeScreen = async (typeAction: string) => {
  storeDynamicMenuPage.typeAction = typeAction
}


</script>
<template>
  <div>
    <HeaderAlertView sub-title="Pagina" :action="action" :validate-crud="true" :btn-back="true"
      @changeScreenBack="changeScreen" />
    <VCard>
      <VCardText>
        <VRow>
          <VCol cols="6" sm="4">
            <VTooltip text="Guardar" location="top">
              <template v-slot:activator="{ props }">
                <VBtn class="ms-1" color="light" rounded="lg" v-bind="props" @click="savePage()">
                  Guardar&nbsp;
                  <VIcon size="large" color="success" icon="mdi-content-save-outline" />
                </VBtn>
              </template>
            </VTooltip>
          </VCol>
          <VCol cols="6" sm="4">
            <VTooltip text="Nueva sección" location="top">
              <template v-slot:activator="{ props }">
                <VBtn class="ms-1" color="light" rounded="lg" v-bind="props" @click="dynamicPageStore.addSection()">
                  Añadir Sección&nbsp;
                  <VIcon size="large" color="success" icon="mdi-plus" />
                </VBtn>
              </template>
            </VTooltip>
          </VCol>
          <VCol cols="12" sm="4">
            <VTooltip text="Pagina" location="top">
              <template v-slot:activator="{ props }">
                <VBtn class="ms-1" color="light" rounded="lg" v-bind="props" @click="preview()">
                  Vista previa&nbsp;
                  <VIcon size="large" color="success" icon="mdi-plus" />
                </VBtn>
              </template>
            </VTooltip>
          </VCol>
        </VRow>
        <draggable v-model="arraySections" group="Sections" @start="dragSection = true" @end="dragSection = false"
          item-key="id">
          <template #item="{ element, index }">
            <div>
              <VRow>
                <VCol cols="12">
                  <Section :indexSection="index" />
                </VCol>
              </VRow>
            </div>
          </template>
        </draggable>

      </VCardText>

    </VCard>

    <!-- Modulos -->
    <ModuleText :key="keyComponentModuleText" />
    <ModuleImage :key="keyComponentModuleImage" />
    <ModuleSlider :key="keyComponentModuleSlider" />
    <ModulePopUps :key="keyComponentModulePopUps" />
    <ModuleForm :key="keyComponentModuleForm" />
    <ModuleSocialNetwork :key="keyComponentModuleSocialNetwork" />

  </div>
</template>
 
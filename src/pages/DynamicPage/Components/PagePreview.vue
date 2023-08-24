<script setup lang="ts">

import { requiredValidator } from "@/@core/utils/validators";
import { useImageUpload } from "@/composables/useImageUpload";
import CalendarGeneral from "@/pages/DynamicPage/Components/CalendarGeneral.vue";
import PageNotFound from "@/pages/DynamicPage/Components/PageNotFound.vue";
import { isObject } from "@vueuse/core";
import Swal from "sweetalert2";
import { config } from '@layouts/config'
import { VNodeRenderer } from '@/@layouts/components/VNodeRenderer'
import vuetify from '@/plugins/vuetify'

// --- --- --- Store --- --- ---
import { useCompaniesStore } from '@/pages/Companies/Store/useCompaniesStore'
const companiesStore = useCompaniesStore()
import { useAuthenticationStore } from '@/stores/useAuthenticationStore'
const authenticationStore = useAuthenticationStore()
import { useDynamicPageStore } from "@/pages/DynamicPage/Store/useDynamicPageStore"
// --- --- END Store --- --- ---


const dynamicPageStore = useDynamicPageStore()
const { arraySections, dynamicMenuPageList, form } = storeToRefs(dynamicPageStore)

const props = defineProps({
  id: {
    type: String,
    default: "",
    required: false,
  },
  title: {
    type: String,
    default: null,
    required: false,
  },
})

const drawer = ref()
const aPagePrincipal = ref<Array<object>>([])
const arraySectionsPage = ref<Array<object>>([])
const router = useRouter()
const route = useRoute()


const changeUrl = (item: object) => {

  pageNotFound.value = false
  if (form.value.id != item.id) {
    const searchPage = dynamicMenuPageList.value.find(ele => ele.id == item.id)

    arraySectionsPage.value = JSON.parse(searchPage.metaData)
  } else {
    arraySectionsPage.value = JSON.parse(JSON.stringify(arraySections.value));
  }

  const encodedId = window.btoa(item.id);

  router.push({
    params: {
      id: encodedId,
      title: item.title
    }
  });
}

const isBase64Encoded = (encodedString: string) => {
  try {
    // Intenta decodificar la cadena
    const decodedString = atob(encodedString);

    // Verifica si la cadena decodificada coincide con la cadena original
    if (btoa(decodedString) === encodedString) {
      return true; // La cadena está codificada correctamente
    } else {
      return false; // La cadena no está codificada correctamente
    }
  } catch (error) {
    return false; // Ocurrió un error al decodificar la cadena
  }
}


const pageNotFound = ref<boolean>(false)
const archive = ref({});

const variablesFilesDinamicas = async () => {
  //creacion de varibales files composable dinamicamente
  await arraySectionsPage.value.forEach((section, ks) => {
    section.arrayRows.forEach((row, kr) => {
      row.columns.forEach((col, kc) => {
        col.contentForm?.arrayInputs.forEach((input, ki) => {
          if (input.type_input == 5) {
            // Verificamos y creamos si no existe
            if (!archive.value.hasOwnProperty("ks" + ks)) {
              archive.value["ks" + ks] = {};
            }
            if (!archive.value["ks" + ks].hasOwnProperty("kr" + kr)) {
              archive.value["ks" + ks]["kr" + kr] = {};
            }
            if (!archive.value["ks" + ks]["kr" + kr].hasOwnProperty("kc" + kc)) {
              archive.value["ks" + ks]["kr" + kr]["kc" + kc] = {};
            }
            if (!archive.value["ks" + ks]["kr" + kr]["kc" + kc].hasOwnProperty("ki" + ki)) {
              archive.value["ks" + ks]["kr" + kr]["kc" + kc]["ki" + ki] = useImageUpload();
            }
          }
        })
      });
    });
  });
}

onMounted(async () => {
  companiesStore.fetchInfo(1)
  await dynamicPageStore.fetchPreview({})
  pageNotFound.value = false
  if (route.name == 'pw') {
    if (isBase64Encoded(String(route.params.id))) {
      const searchId = dynamicMenuPageList.value.find(ele => ele.id == window.atob(String(route.params.id)))
      console.log("dynamicMenuPageList.value", dynamicMenuPageList.value);
      console.log("route.params.id", route.params.id);
      console.log("window.atob(String(route.params.id))", window.atob(String(route.params.id)));
      if (searchId) {
        arraySectionsPage.value = JSON.parse(searchId.metaData);
        await updateDialogVisibility(arraySectionsPage.value)
      } else {
        pageNotFound.value = true

      }
    } else {
      pageNotFound.value = true
    }

  } else {
    arraySectionsPage.value = JSON.parse(JSON.stringify(arraySections.value));
    await variablesFilesDinamicas()
    await updateDialogVisibility(arraySectionsPage.value)
  }
})

//revisa si existe un dialog visible en la pantallay lo muestra
const updateDialogVisibility = (data: Array<object>) => {
  if (data && Array.isArray(data) && data.length > 0) {
    data.forEach(item => {
      if (item.arrayRows && Array.isArray(item.arrayRows) && item.arrayRows.length > 0) {
        item.arrayRows.forEach(row => {
          if (row.columns && Array.isArray(row.columns) && row.columns.length > 0) {
            row.columns.forEach(column => {
              if (column.contentPopUps && column.contentPopUps.showStart === true) {
                column.contentPopUps.isDialogVisible = true;
              }
            });
          }
        });
      }
    });
  }
}

//validar formulario dinamicamente
const validationForm = async (dataForm: any) => {
  let exito = true
  await dataForm.arrayInputs.forEach(element => {
    if (element.required) {
      if (requiredValidator(element.answer) != true) {
        element.messageError = requiredValidator(element.answer)
        exito = false
      }
    }
  });
  return exito
}
//limpiar formulario dinamicamente
const clearForm = async (dataForm: any, indexS: number, indexR: number, indexC: number) => {
  await dataForm.arrayInputs.forEach((element, key) => {
    element.answer = null
    element.messageError = ''
    if (isObject(archive.value['ks' + indexS]['kr' + indexR]['kc' + indexC]['ki' + key])) {
      archive.value['ks' + indexS]['kr' + indexR]['kc' + indexC]['ki' + key].clearData()
    }
  });

  archive.value['ks' + indexS]['kr' + indexR]['kc' + indexC]['ki' + index].imageFile
}
//ANSWERS FORMS
const submitForm = async (dataForm: any, indexS: number, indexR: number, indexC: number) => {
  const exito = await validationForm(dataForm)
  if (exito) {
    const data = await dynamicPageStore.fetchAnswer(dataForm)
    if (data.code === 200) {
      Swal.fire("Éxito", data.message, "success")
      clearForm(dataForm, indexS, indexR, indexC)
    }
  }

}


const loadingFile = ref<boolean>(false)
const addFile = (e: any, indexS: number, indexR: number, indexC: number, index: number) => {
  archive.value['ks' + indexS]['kr' + indexR]['kc' + indexC]['ki' + index].handleImageSelected(e)

  loadingFile.value = true
  setTimeout(() => {
    arraySectionsPage.value[indexS].arrayRows[indexR].columns[indexC].contentForm.arrayInputs[index].answer = archive.value['ks' + indexS]['kr' + indexR]['kc' + indexC]['ki' + index].imageFile
    // console.log("archive", arraySectionsPage.value[indexS].arrayRows[indexR].columns[indexC].contentForm.arrayInputs[index].answer);
    loadingFile.value = false
  }, 1000)
}

aPagePrincipal.value = dynamicMenuPageList.value.find(element => element.principal == 'Si')

const hoverMouseEnterLeave = async (event: any) => {
  event.target.focus();
  console.log('sBtnMenuActive', event.target)
}


// // watching control + / to open dialog
watch(vuetify.display.mdAndUp, (newValue) => {
  if (newValue) drawer.value = false
})
// const prueba = computed(() => {
//   return vuetify;
// })

</script>
<template>
  <div>
    <section v-if="pageNotFound">
      <PageNotFound></PageNotFound>
    </section>
    <section v-else>

      <VAppBar rounded density="comfortable" :elevation="2" :icon="aPagePrincipal.icon">
        <template #prepend>
          <VNodeRenderer :nodes="config.app.logo" v-if="!authenticationStore.company.image_logo" />
          <VImg width="98" :aspect-ratio="1" :src="authenticationStore.company.image_logo"
            v-if="authenticationStore.company.image_logo" />
        </template>
        <template #title>
          {{ aPagePrincipal.title }}
        </template>
        <template v-slot:append>
          <!-- open-on-hover -->
          <VMenu class="h-100" transition="scale-transition" open-on-hover v-for="(item, index) in dynamicMenuPageList"
            :key="index">
            <template #activator="{ props }">
              <VBtn class="h-100 rounded-0 rounded-t d-none d-md-flex btn-app-bar" v-if="!item.father_id" v-bind="props"
                :prepend-icon="item.icon" @click="changeUrl(item)" @mouseenter="hoverMouseEnterLeave($event)"
                @mouseleave="hoverMouseEnterLeave($event)">
                {{ item.title }}
              </VBtn>
            </template>
            <VList class="rounded-0 rounded-b" v-if="item.children?.length > 0">
              <VListItem class="mx-0" v-for="(child, indexC) in item.children" :key="indexC">
                <VListItemTitle style="cursor: pointer;" @click="changeUrl(child)">
                  <VIcon :icon="child.icon" />&nbsp;{{ child.title }}
                </VListItemTitle>
              </VListItem>
            </VList>
          </VMenu>
          <VBtn class="d-md-none h-100 rounded-0 rounded-t btn-app-bar-drawer" color="primary"
            @click.stop="drawer = !drawer">
            <VIcon icon="mdi-menu" size="x-large" />
          </VBtn>
        </template>
      </VAppBar>
      <VNavigationDrawer class="d-md-none" v-model="drawer" temporary>
        <VList density="compact" nav>
          <template v-for="(item, index) in dynamicMenuPageList" :key="index">
            <VListItem class="btn-app-bar-drawer rounded-0 rounded-t" v-if="!item.father_id && item.children.length == 0">
              <VList class="py-0">
                <!-- {{ item.children }} -->
                <VListItem v-bind="props" :prepend-icon="item.icon" :title="item.title" @click="changeUrl(item)" />
              </VList>
            </VListItem>
            <VListItem class="btn-app-bar-drawer rounded-0 rounded-t pa-0" v-if="item.children?.length > 0">
              <VList class="py-0">
                <VListGroup value="Users">
                  <template v-slot:activator="{ props }">
                    <VListItem v-bind="props" :prepend-icon="item.icon" :title="item.title" />
                  </template>
                  <!-- <VListItem v-for="(child, indexC) in item.children" :key="indexC">
                    <VListItemTitle style="cursor: pointer;" @click="changeUrl(child)">{{ child.title }}aaa</VListItemTitle>
                  </VListItem> -->
                  <VListItem :prepend-icon="item.icon" :title="item.title" @click="changeUrl(item)" />
                  <VListItem v-for="(child, indexC) in item.children" :key="indexC" :prepend-icon="child.icon"
                    :title="child.title" @click="changeUrl(child)" />
                </VListGroup>
              </VList>
            </VListItem>
          </template>
        </VList>
      </VNavigationDrawer>

      <div style="margin-top: 56px;">
        <VContainer class="bg-cwhite" v-for="(section, indexS) in arraySectionsPage" :key="indexS">
          <VRow v-for="(row, indexR) in section.arrayRows" :key="indexR">
            <VCol v-for="(column, indexC) in row.columns" :key="indexC" cols="12" :md="column.classCol">

              <!-- TEXT -->
              <div v-if="column.contentText">
                <div v-html="column.contentText"></div>
              </div>

              <div v-if="column.contentImage">
                <VImg :src="column.contentImage.imageUrl"
                  :style="'width:' + column.contentImage.typeModuleImage == 'banner' ? '100%' : 'auto'">
                </VImg>
              </div>

              <!-- SLIDER -->
              <div v-if="column.contentSlider.length > 0">
                <div>
                  <v-carousel height="500" hide-delimiters>
                    <v-carousel-item v-for="(img, indexImg) in column.contentSlider" :key="indexImg" :src="img.imageUrl"
                      cover></v-carousel-item>
                  </v-carousel>
                </div>
              </div>

              <!-- POP UPS -->
              <div v-if="column.contentPopUps">
                <div>
                  <VDialog v-model="column.contentPopUps.isDialogVisible" width="500">
                    <!-- Activator -->
                    <template #activator="{ props }">
                      <VBtn v-if="!column.contentPopUps.showStart" :color="column.contentPopUps.colorButton"
                        v-bind="props">
                        {{ column.contentPopUps.titleButton }}
                      </VBtn>
                    </template>


                    <!-- Dialog close btn -->
                    <DialogCloseBtn
                      @click="column.contentPopUps.isDialogVisible = !column.contentPopUps.isDialogVisible" />

                    <!-- Dialog Content -->
                    <VCard>
                      <VCardTitle primary-title v-if="column.contentPopUps.showTitle">{{ column.contentPopUps.title }}
                      </VCardTitle>
                      <VCardText>
                        <div v-html="column.contentPopUps.contentText"></div>
                      </VCardText>
                    </VCard>
                  </VDialog>
                </div>
              </div>

              <!-- FORM -->
              <VCard v-if="column.contentForm">
                <VCardText>
                  <VRow>
                    <VCol cols="12" v-for="(item, index) in column.contentForm.arrayInputs" :key="index">

                      <VTextField v-model="item.answer" v-if="item.type_input == 1" :label="item.label"
                        :error-messages="item.messageError" @update:model-value="item.messageError = ''" />

                      <VSelect v-model="item.answer" v-if="item.type_input == 2" :items="item.arrayOptions"
                        :label="item.label" :error-messages="item.messageError"
                        @update:model-value="item.messageError = ''">
                      </VSelect>

                      <div v-if="item.type_input == 3">
                        <VLabel>{{ item.label }}</VLabel>
                        <VCheckbox :error-messages="item.messageError" @update:model-value="item.messageError = ''"
                          v-model="item.answer" v-for="(op, indexOP) in item.arrayOptions" :key="indexOP"
                          :label="op.title" :value="op.value">
                        </VCheckbox>
                      </div>
                      <div v-if="item.type_input == 4">
                        <VLabel>{{ item.label }}</VLabel>
                        <VRadioGroup :error-messages="item.messageError" @update:model-value="item.messageError = ''"
                          v-model="item.answer">
                          <VRadio v-for="(op, indexOP) in item.arrayOptions" :key="indexOP" :label="op.title"
                            :value="op.value">
                          </VRadio>
                        </VRadioGroup>
                      </div>

                      <div v-if="item.type_input == 5 && archive">
                        <!-- {{ archive[index] }} -->
                        <VLabel>{{ item.label }}</VLabel>
                        <VFileInput :error-messages="item.messageError" @update:model-value="item.messageError = ''"
                          show-size :loading="loadingFile"
                          :key="archive['ks' + indexS]['kr' + indexR]['kc' + indexC]['ki' + index].key"
                          @change.once="addFile($event, indexS, indexR, indexC, index)"
                          @click:clear="archive['ks' + indexS]['kr' + indexR]['kc' + indexC]['ki' + index].clearData()"
                          :rules="[requiredValidator]">
                          <template #selection="{ fileNames }">
                            <template v-for="fileName in fileNames" :key="fileName">
                              <VChip label size="small" variant="outlined" color="primary" class="me-2">
                                {{ fileName }}
                              </VChip>
                            </template>
                          </template>
                        </VFileInput>
                        <b v-if="loadingFile">Cargando archivo</b>
                      </div>

                    </VCol>
                  </VRow>
                </VCardText>
                <VCardText class="d-flex justify-content-center">
                  <VBtn color="primary" :loading="loadingFile"
                    @click="submitForm(column.contentForm, indexS, indexR, indexC)">Guardar
                  </VBtn>
                </VCardText>
              </VCard>

              <!-- SOCIALNETWORK -->
              <VCard v-if="column.contentSocialNetwork">
                <a :href="column.contentSocialNetwork.url" target="_blank" v-if="column.contentSocialNetwork">
                  <VImg :src="column.contentSocialNetwork.path"></VImg>
                </a>
              </VCard>


              <!-- CALENDAR -->
              <VCard v-if="column.contentCalendar">
                <CalendarGeneral></CalendarGeneral>
              </VCard>
            </VCol>
          </VRow>
        </VContainer>
      </div>
    </section>

  </div>
</template>
 
<route lang="yaml">
# path: /pagePreview/:title?/:id?
path: /pagePreview
meta:
  layout: blank
</route>

<style lang="scss">
.v-expansion-panel-title {
  padding-inline-end: 0 !important;
}

.v-expansion-panel-text__wrapper {
  padding-inline-end: 0 !important;
}

.v-list-group__items .v-list-item {
  padding-inline-start: 30px !important;
}
</style>

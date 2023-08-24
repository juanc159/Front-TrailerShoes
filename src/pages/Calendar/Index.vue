<script setup lang="ts">
import { requiredValidator } from '@/@core/utils/validators';
import PreloadInterno from '@/components/Prelaod/PreloadInterno.vue';
import { useCalendarStore } from "@/pages/Calendar/Store/useCalendarStore";
import dayGridPlugin from '@fullcalendar/daygrid';
// import googleCalendarPlugin from '@fullcalendar/google-calendar';
import { useAuthenticationStore } from "@/stores/useAuthenticationStore";
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import FullCalendar from '@fullcalendar/vue3';
import Swal from 'sweetalert2';
import { reactive } from "vue";
import type { VForm } from 'vuetify/components';

import { useEvents } from '@/composables/useEvents';

const { form, errors, clearForm, loginGoogle, deleteEventGoogle, storeEventGoogle } = useEvents()
const authenticationStore = useAuthenticationStore()
const arrayPublic = [{ value: 1, title: "Público" }, { value: 0, title: "Privado" }];
const formValidation = ref<VForm>()
const calendatStore = useCalendarStore()
const { events, loading, calendarTypes, charges } = storeToRefs(calendatStore)
const options = reactive({
  plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  headerToolbar: {
    left: "prev,next,today",
    center: "title",
    right: "dayGridMonth,dayGridWeek,listDay"
  },
  locale: 'es',
  editable: true,
  selectable: true,
  weekends: true,
  events: [],
  select: (arg: any) => {
    const cal = arg.view.calendar
    cal.unselect()
    titleModal.value = "Agregar Evento";
    openModalForm()
    form.start = arg.startStr + ' 00:00:00'
    form.end = arg.endStr + ' 00:00:00'


  },
  eventClick: (arg: any) => {
    titleModal.value = "Modificar Evento";
    openModalForm()

    form.id = arg.event.id
    // form.event_google_id = arg.event.extendedProps.event_google_id
    form.summary = arg.event.extendedProps.summary
    form.start = arg.event.startStr
    form.end = arg.event.endStr
    form.calendar_type_id = arg.event.extendedProps.calendar_type_id
    form.link = arg.event.extendedProps.link
    form.public = arg.event.extendedProps.public
    form.location = arg.event.extendedProps.location
    form.description = arg.event.extendedProps.description
    // form.guests = arg.event.extendedProps.guests
    form.charges = arg.event.extendedProps.charges
    form.user_id = arg.event.extendedProps.user_id
    form.guest = arg.event.extendedProps.guest
  },
  displayEventTime: false,
})


const isDialogVisible = ref<boolean>(false)
const isDialogUsers = ref<boolean>(false)



const deleteEvent = async () => {
  Swal.fire({
    title: '¿Desea eliminar el registro?',
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: 'Si',
    denyButtonText: 'No',
    customClass: {
      container: 'my-swal'
    }
  }).then(async result => {
    if (result.isConfirmed) {
      loading.value.form = true
      // await deleteEventGoogle(form.event_google_id)
      await calendatStore.fetchDelete(form.id)
      loading.value.form = false
      isDialogVisible.value = false
      await fetchDataCalendar()
    }
  })
}



const esCorreoValido = (correo: string) => {
  const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return patronCorreo.test(correo);
}

// Función para validar la lista de correos
const validarCorreos = (correos: string) => {
  const correosSeparados = correos.split(",");
  let todosValidos = true;

  for (const correo of correosSeparados) {
    const correoLimpio = correo.trim();
    if (!esCorreoValido(correoLimpio)) {
      todosValidos = false;
      break;
    }
  }
  return todosValidos;
}

const addEvent = async (user_id: boolean = true) => {
  // if (!validarCorreos(form.guests)) {
  //   Swal.fire({
  //     icon: "error",
  //     title: "Oops...",
  //     text: "Algun correo invitado no es valido",
  //     customClass: {
  //       container: 'my-swal'
  //     }
  //   });
  //   return false
  // }
  const validation = await formValidation.value?.validate()
  if (validation?.valid) {
    loading.value.form = true
    let dataFormGoogle = JSON.parse(JSON.stringify(form))
    // form.users.forEach(element => {
    //   const search = users.value.find(ele => ele.value == element)
    //   dataFormGoogle.guests += ',' + search.email
    // });

    let dataForm = JSON.parse(JSON.stringify(form))
    dataForm.user_id = authenticationStore.user.id
    // const data = await storeEventGoogle(dataFormGoogle)


    // dataForm.event_google_id = data.data.id
    await calendatStore.fetchSave(dataForm)
    loading.value.form = false
    isDialogVisible.value = false
    await fetchDataCalendar()
  }
}
const openModalForm = () => {
  loading.value.form = false
  clearForm()

  isDialogVisible.value = true

}

const titleModal = ref("")
const fetchDataCalendar = async () => {
  await calendatStore.fetchAll({
    user_id: authenticationStore.user.id
  })
  options.events = events.value
}

onMounted(async () => {
  await fetchDataCalendar()
})

const guests = ref<Array<object>>([])
const guestsInformation = async (charge_id: number) => {
  guests.value = []
  isDialogUsers.value = !isDialogUsers.value
  const data = await calendatStore.fetchGuestsInformation({
    event_id: form.id,
    charge_id: charge_id,
  })
  if (data.code == 200) {
    guests.value = data.data?.guests
    console.log(data);

  }
}
const answerInvitation = async (answer: boolean) => {
  const data = await calendatStore.fetchAnswerInvitation({
    event_id: form.id,
    user_id: authenticationStore.user.id,
    answer: answer,
  })
  isDialogVisible.value = !isDialogVisible.value
}


// loginGoogle()
</script>

<template>
  <div>
    <VRow>
      <VCol cols="12">
        <VCard>
          <!-- <VCardText v-if="!token">
            <h3>Debe autheticarse con google primero</h3>
          </VCardText> -->
          <VCardText>
            <FullCalendar :options="options" />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <VDialog v-model="isDialogVisible" persistent class="v-dialog-sm">
      <!-- Dialog close btn -->
      <DialogCloseBtn v-if="!loading.form" @click="isDialogVisible = !isDialogVisible" />

      <VCard v-if="loading.form">
        <VCardText>
          <PreloadInterno />
        </VCardText>
      </VCard>

      <!-- Dialog Content -->
      <VCard v-if="!loading.form" :title="titleModal">
        <VCardText>
          <VForm ref="formValidation" lazy-validation>
            <VRow>
              <VCol sm="6" cols="12">
                <AppTextField :disabled="form.guest" v-model="form.summary" label="Título" :rules="[requiredValidator]"
                  :error-messages="errors.summary" />
              </VCol>
              <VCol sm="6" cols="12">
                <AppSelect :disabled="form.guest" v-model="form.calendar_type_id" :rules="[requiredValidator]"
                  :error-messages="errors.calendar_type_id" :items="calendarTypes" label="Tipo" />
              </VCol>
            </VRow>
            <VRow>
              <VCol sm="6" cols="12">
                <AppDateTimePicker :disabled="form.guest" v-model="form.start" label="Fecha y hora inicio"
                  :error-messages="errors.start" :rules="[requiredValidator]"
                  :config="{ enableTime: true, dateFormat: 'Y-m-d H:i' }" />
              </VCol>
              <VCol sm="6" cols="12">
                <AppDateTimePicker :disabled="form.guest" v-model="form.end" label="Fecha y hora final"
                  :error-messages="errors.end" :rules="[requiredValidator]"
                  :config="{ enableTime: true, dateFormat: 'Y-m-d H:i' }" />
              </VCol>
            </VRow>
            <VRow>
              <VCol sm="6" cols="12">
                <AppSelect :items="arrayPublic" v-model="form.public" label="Publico / Privado">
                </AppSelect>
              </VCol>

            </VRow>
            <VRow v-if="charges.length > 0">
              <VCol>
                <h3>Selecciona los cargos a quienes invitas al evento</h3>
                <div class="demo-space-x">
                  <VCheckbox :disabled="form.guest" v-for="(item, index) in charges" :key="index" v-model="form.charges"
                    :value="item.value">
                    <template #label>
                      <div>
                        <VBtn v-if="form.id" variant="text" @click="guestsInformation(item.value)">
                          {{ item.title }}
                        </VBtn>
                        <span v-else>
                          {{ item.title }}
                        </span>
                        <!-- <a href="#" v-bind="props" @click.stop @click="isDialogUsers = true">
                        </a> -->
                      </div>
                    </template>
                  </VCheckbox>
                </div>
                <!-- <AppSelect :items="charges" v-model="form.charges" multiple label="Cargos" clearable
                  clear-icon="tabler-x">
                  <template #selection="{ item }">
                    <VChip>
                      <span>{{ item.title }}</span>
                    </VChip>
                  </template>
                </AppSelect> -->
              </VCol>
            </VRow>

            <!-- <VRow>
              <VCol>
                <AppTextField v-model="form.guests" label="Invitados" :rules="[requiredValidator]"
                  :error-messages="errors.guests" />
              </VCol>
            </VRow> -->
            <VRow>
              <VCol>
                <AppTextField :disabled="form.guest" v-model="form.link" label="Link" :rules="[requiredValidator]"
                  :error-messages="errors.link" />
              </VCol>
            </VRow>
            <VRow>
              <VCol>
                <AppTextField :disabled="form.guest" v-model="form.location" label="Lugar" :rules="[requiredValidator]"
                  :error-messages="errors.location" />
              </VCol>
            </VRow>
            <VRow>
              <VCol>
                <AppTextarea :disabled="form.guest" v-model="form.description" label="Observaciones"
                  :rules="[requiredValidator]" :error-messages="errors.description" />
              </VCol>
            </VRow>
          </VForm>
        </VCardText>

        <VCardText class="d-flex justify-end gap-3 flex-wrap" v-if="!form.guest">
          <VBtn v-if="form.id" color="error" variant="tonal" @click="deleteEvent()">
            Eliminar
          </VBtn>
          <VBtn @click="addEvent()">
            Guardar
          </VBtn>
        </VCardText>

        <VCardText class="d-flex justify-end gap-3 flex-wrap" v-if="form.guest">
          <h3>Usted ha sido invitado a este evento!!</h3>
          <h3>¿Desea aceptar la invitación?</h3>
          <VBtn :loading="loading.answerInvitation" v-if="form.id" color="error" variant="tonal"
            @click="answerInvitation(true)">
            Si
          </VBtn>
          <VBtn :loading="loading.answerInvitation" @click="answerInvitation(false)">
            No
          </VBtn>
        </VCardText>
      </VCard>
    </VDialog>



    <!-- modal usuarios invitados -->
    <VDialog v-model="isDialogUsers">
      <!-- Dialog close btn -->
      <DialogCloseBtn @click="isDialogUsers = false" />

      <VCard title="Invitados">


        <VCardText v-if="loading.guestsInformation">
          <PreloadInterno />
        </VCardText>

        <VCardText v-else>
          <VRow>
            <VCol cols="12" sm="6">
              <h3>Aceptaron</h3>
              <ul>
                <li v-for="(item, index) in guests['1']" :key="index">
                  {{ item.full_name }}
                </li>
              </ul>
            </VCol>
            <VCol cols="12" sm="6">
              <h3>No Aceptaron</h3>
              <ul>
                <li v-for="(item, index) in guests['0']" :key="index">
                  {{ item.full_name }}
                </li>
              </ul>
            </VCol>
            <VCol cols="12" sm="6">
              <h3>Faltan por responder</h3>
              <ul>
                <li v-for="(item, index) in guests['']" :key="index">
                  {{ item.full_name }}
                </li>
              </ul>
            </VCol>
          </VRow>
        </VCardText>



        <VCardText class="d-flex flex-wrap gap-3">
          <VSpacer />
          <VBtn @click="isDialogUsers = false">
            Cerrar
          </VBtn>
        </VCardText>
      </VCard>
    </VDialog>
  </div>
</template>

<route lang="yaml">
meta:
  action: read
  subject: Auth
  redirectIfLoggedIn: true
  requiresAuth: true
  requiredPermission: charge.index
</route>


<script setup lang="ts">
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import FullCalendar from '@fullcalendar/vue3';
import { useDynamicPageStore } from "@/pages/DynamicPage/Store/useDynamicPageStore";
const dynamicPageStore = useDynamicPageStore()

const { events, calendarTypes } = storeToRefs(dynamicPageStore)

interface IForm {
  id?: number | null
  summary: null | string,
  start: null | string,
  end: null | string,
  calendar_type_id: null | number,
  link: null | string,
  location: null | string,
  description: null | string,
}
const form = reactive<IForm>({
  id: null,
  // event_google_id: null,
  summary: null,
  start: null,
  end: null,
  calendar_type_id: null,
  link: null,
  location: null,
  description: null,
})

const isDialogVisible = ref<boolean>(false)
const titleModal = ref("")


const options = reactive({
  plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  headerToolbar: {
    left: "prev,next,today",
    center: "title",
    right: "dayGridMonth,dayGridWeek,listDay"
  },
  editable: true,
  selectable: true,
  weekends: true,
  events: [],
  select: (arg: any) => {
  },
  eventClick: (arg: any) => {
    titleModal.value = "Evento"
    isDialogVisible.value = true

    form.id = arg.event.id
    form.summary = arg.event.extendedProps.summary
    form.start = arg.event.startStr
    form.end = arg.event.endStr
    form.calendar_type_id = arg.event.extendedProps.calendar_type_id
    form.link = arg.event.extendedProps.link
    form.location = arg.event.extendedProps.location
    form.description = arg.event.extendedProps.description
  },
  displayEventTime: false
})


onMounted(async () => {
  options.events = events

})
</script>
<template>
  <div>
    <FullCalendar :options="options" />

    <VDialog v-model="isDialogVisible" persistent class="v-dialog-sm">
      <!-- Dialog close btn -->
      <DialogCloseBtn @click="isDialogVisible = !isDialogVisible" />

      <!-- Dialog Content -->
      <VCard :title="titleModal">
        <VCardText>
          <VForm ref="formValidation" lazy-validation>
            <VRow>
              <VCol sm="6" cols="12">
                <AppTextField disabled v-model="form.summary" label="Título" />
              </VCol>
              <VCol sm="6" cols="12">
                <AppSelect disabled v-model="form.calendar_type_id" :items="calendarTypes" label="Tipo" />
              </VCol>
            </VRow>
            <VRow>
              <VCol sm="6" cols="12">
                <AppDateTimePicker disabled v-model="form.start" label="Fecha y hora inicio" />
              </VCol>
              <VCol sm="6" cols="12">
                <AppDateTimePicker disabled v-model="form.end" label="Fecha y hora final" />
              </VCol>
            </VRow>
            <VRow>
              <VCol>
                <AppTextField disabled v-model="form.link" label="Link" />
              </VCol>
            </VRow>
            <VRow>
              <VCol>
                <AppTextField disabled v-model="form.location" label="Lugar" />
              </VCol>
            </VRow>
            <VRow>
              <VCol>
                <AppTextarea disabled v-model="form.description" label="Observaciones" />
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VDialog>
  </div>
</template>

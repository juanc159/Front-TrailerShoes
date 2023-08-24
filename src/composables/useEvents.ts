import { useCalendarStore } from "@/pages/Calendar/Store/useCalendarStore";
import { useAuthenticationStore } from "@/stores/useAuthenticationStore";
import axios from "axios";
import { reactive } from "vue";
import { googleSdkLoaded } from "vue3-google-login";


interface IForm {
  id?: number | null
  // event_google_id: null | number,
  summary: null | string,
  start: null | string,
  end: null | string,
  calendar_type_id: null | number,
  link: null | string,
  location: null | string,
  description: null | string,
  user_id: null | number,
  guest: null | boolean,
  public: null | boolean,
  charges: Array<number>,
}

export function useEvents() {
  const authenticationStore = useAuthenticationStore()
  const calendatStore = useCalendarStore()
  const { token } = storeToRefs(calendatStore)
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
    user_id: null,
    guest: null,
    charges: [],
    public: null,
  })

  const errors = ref<Array<IForm>>([])

  const clearForm = () => {
    form.id = null
    // form.event_google_id = null
    form.summary = null
    form.start = null
    form.end = null
    form.calendar_type_id = 1
    form.link = null
    form.location = null
    form.description = null
    form.user_id = null
    form.guest = null
    form.charges = []
    form.public = null
  }

  const loginGoogle = () => {
    if (!token.value) {
      const authClient = "683505111883-dn6k0to7mgfivvlqp60asmhr4arimc9n.apps.googleusercontent.com"
      googleSdkLoaded((google) => {
        google.accounts.oauth2.initTokenClient({
          client_id: authClient,
          scope: 'email profile openid https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events',
          callback: (response) => {
            console.log("Handle the response", response)
            token.value = response.access_token
          }
        }).requestAccessToken()
      })
    }
  }

  const parseEmailsToList = (emailsString: string) => {
    const emails = emailsString.split(',').map(email => email.trim());

    const attendeesList = emails.map(email => {
      return { email: email };
    });

    return attendeesList;
  }
  const storeEventGoogle = async (form: object) => {
    form.start = {
      dateTime: new Date(form.start), // Fecha y hora de inicio en formato ISO 8601
    }
    form.end = {
      dateTime: new Date(form.end), // Fecha y hora de inicio en formato ISO 8601
    }

    // form.attendees = parseEmailsToList(form.guests)

    let routeName = "https://www.googleapis.com/calendar/v3/calendars/" + authenticationStore.user.email + "/events"
    let method = 'post';
    if (form.event_google_id) {
      method = 'put';
      routeName = "https://www.googleapis.com/calendar/v3/calendars/" + authenticationStore.user.email + "/events/" + form.event_google_id
    }
    const headers = {
      'Content-Type': 'application/json', // Por ejemplo, puedes establecer el tipo de contenido como JSON
      'Authorization': 'Bearer ' + token.value, // Agregar un token de autenticación si es necesario
      // Agregar otros headers aquí si es necesario
    };

    return axios({
      method: method,
      url: routeName,
      data: form,
      headers: headers
    }).then(async (res) => {
      return res
    })

  }
  const deleteEventGoogle = async (event_google_id: number) => {
    return await axios.delete('https://www.googleapis.com/calendar/v3/calendars/' + authenticationStore.user.email + '/events/' + event_google_id,
      {
        headers: {
          "Authorization": "Bearer " + token.value,
          "Content-type": "application/json"
        }
      }).then(async (res) => {
        return res
      })
  }

  return {
    form,
    errors,
    clearForm,
    loginGoogle,
    storeEventGoogle,
    deleteEventGoogle,
  }
}

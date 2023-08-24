import { useConfig } from '@/composables/useConfig'
import axios from 'axios'
const configUse = ref(useConfig())
const baseURL = configUse.value.baseURL+'api'

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  baseURL: baseURL,
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})

// ℹ️ Add request interceptor to send the authorization header on each subsequent request after login
axiosIns.interceptors.request.use(config => {
  // Retrieve token from localStorage
  
  const useAuthenticationStore = localStorage.getItem('useAuthenticationStore')
  if(useAuthenticationStore){
    const useAuthenticationStoreJson = JSON.parse(useAuthenticationStore)
    const token = useAuthenticationStoreJson.token   
    // If token is found
    if (token) {
      // Get request headers and if headers is undefined assign blank object
      config.headers = config.headers || {}
  
      // Set authorization header
      // ℹ️ JSON.parse will convert token to string
      config.headers.Authorization = token ? `Bearer ${token}` : ''
    }
  }

  // Return modified config
  return config
})

// ℹ️ Add response interceptor to handle 401 response
axiosIns.interceptors.response.use(response => {
  return response
}, error => {
  // Handle error 
  console.log("error",error);

    if (error.response.status === 401) {
      // ℹ️ Logout user and redirect to login page
      // Remove "userData" from localStorage
      // localStorage.removeItem('userData')
  
      // Remove "accessToken" from localStorage
      // localStorage.removeItem('accessToken')
      // localStorage.removeItem('userAbilities')
  
      // If 401 response returned from api
      // router.push('/login')
    }
    else {
      return Promise.reject(error)
    } 
})

export default axiosIns

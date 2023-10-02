export function useConfig() {

  const baseURL = ref('http://127.0.0.1:8000/')
  const baseURLFont = ref('http://localhost:5173/')

  // const baseURL = ref('https://cmsback.vetszoo.com/')
  // const baseURLFont = ref('https://cms.vetszoo.com/')

  return {
    baseURL,
    baseURLFont,
  }
}

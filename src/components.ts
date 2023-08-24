import type { App } from 'vue'
// componentsGlobal
import HeaderAlertView from './components/HeaderAlertView.vue'

export default function registerGlobalComponents(app: App): void {
  app.component('HeaderAlertView', HeaderAlertView)
}

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Popup from './popup.vue'
import router from './router'

const pinia = createPinia()

createApp(Popup).use(pinia).use(router).mount('#app')

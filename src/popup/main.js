import { createApp } from 'vue'
import Popup from './popup.vue'
import router from './router'

createApp(Popup).use(router).mount('#app')

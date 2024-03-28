import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Content from './content.vue'

const contentApp = document.createElement('div')
contentApp.id = 'content-container'
document.body.appendChild(contentApp)

const app = createApp(Content)
const pinia = createPinia()
app.use(pinia).mount('#content-container')
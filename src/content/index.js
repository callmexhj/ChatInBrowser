import { createApp } from 'vue'
import Content from './content.vue'

const contentApp = document.createElement('div')
contentApp.id = 'content-container'
document.body.appendChild(contentApp)

const app = createApp(Content)
app.mount('#content-container')
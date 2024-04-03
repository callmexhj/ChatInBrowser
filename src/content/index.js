import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import { zh } from '@/language/zh'
import { en } from '@/language/en'
import Content from './content.vue'

const contentApp = document.createElement('div')
contentApp.id = 'content-container'
document.body.appendChild(contentApp)

const app = createApp(Content)
const pinia = createPinia()
const messages = {
    zh,
    en
}

const i18n = createI18n({
    legacy: false,
    messages,
    locale: 'zh'
})
app.use(i18n).use(pinia).mount('#content-container')
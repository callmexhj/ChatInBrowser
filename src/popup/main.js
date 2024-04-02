import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Popup from './popup.vue'
import router from './router'
import { createI18n } from 'vue-i18n'
import { zh } from '@/language/zh'
import { en } from '@/language/en'

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

createApp(Popup).use(i18n).use(pinia).use(router).mount('#app')

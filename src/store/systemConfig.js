import { defineStore } from "pinia"

export const useSystemConfigStore = defineStore('systemConfig', {
    state: () => {
        return {
            primaryColor: '',
            language: ''
        }
    },
    actions: {
        setPrimaryColor(color) {
            this.primaryColor = color
        },
        setLanguage(language) {
            this.language = language
        }
    }
})
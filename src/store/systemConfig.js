import { defineStore } from "pinia"

export const useSystemConfigStore = defineStore('systemConfig', {
    state: () => {
        return {
            primaryColor: ''
        }
    },
    actions: {
        setPrimaryColor(color) {
            this.primaryColor = color
        }
    }
})
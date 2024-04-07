import { defineStore } from "pinia"

export const useSystemConfigStore = defineStore('systemConfig', {
    state: () => {
        return {
            primaryColor: '',
            language: '',
            floatIco: {
                opt: '',
                mode: '',
                color: '',
                img: ''
            }
        }
    },
    actions: {
        setPrimaryColor(color) {
            this.primaryColor = color
        },
        setLanguage(language) {
            this.language = language
        },
        setFloatIco({ mode, color, img, opt }) {
            this.floatIco.mode = mode
            this.floatIco.color = color
            this.floatIco.img = img
            this.floatIco.opt = opt
        },
        setFloatIcoMode(mode) {
            this.floatIco.mode = mode
        },
        setFloatIcoColor(color) {
            this.floatIco.color = color
        },
        setFloatIcoImg(img) {
            this.floatIco.img = img
        },
        setFloatIcoOpt(opt) {
            this.floatIco.opt = opt
        }
    }
})
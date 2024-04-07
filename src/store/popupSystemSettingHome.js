import { defineStore } from "pinia"

export const usePopupSystemSettingHome = defineStore('popupSystemSettingHome', {
    state: () => {
        return {
            sparkModelConfigForm: {
                appId: '',
                apiSecret: '',
                apiKey: ''
            },
            openAiModelConfigForm: {
                apiKey: ''
            }
        }
    },
    actions: {
        setSparkModelConfigForm(appId, apiSecret, apiKey) {
            this.sparkModelConfigForm.appId = appId
            this.sparkModelConfigForm.apiSecret = apiSecret
            this.sparkModelConfigForm.apiKey = apiKey
        },
        setOpenAiModelConfigForm(apiKey) {
            this.openAiModelConfigForm.apiKey = apiKey
        }
    }
})
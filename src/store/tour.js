import { defineStore } from "pinia"

export const useTour = defineStore('tour', {
    state: () => {
        return {
            popupSystemSettingTourOpen: false,
            popupHomeTourOpen: false,
            contentTourOpen: false
        }
    },
    actions: {
        setPopupSystemSettingTourOpen (value) {
            this.popupSystemSettingTourOpen = value
        },
        setHomeTourOpen (value) {
            this.popupHomeTourOpen = value
        },
        setContentTourOpen (value) {
            this.contentTourOpen = value
        }
    }
})
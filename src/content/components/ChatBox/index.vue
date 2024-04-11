<template>
    <div class="chat-box">
        <div class="default-button" :style="floatBallStyle" v-if="!isShowChatBox" @mousedown="handhowMouseDown"
            @mouseup="showChatBox"></div>
        <div class="chat-box-content" :style="{ backgroundColor: `${colorPrimary}a0` }" v-else>
            <div class="content-top">
                <top-button-group @close="handleClose" @clear="handleClear" @openTour="handleOpenTour"
                    ref="topButtonGroup" />
                <div class="info-message" :style="{ backgroundColor: `${colorPrimary}f0` }">
                    <p>{{ displayValue }}</p>
                </div>
                <message-content :messages="messages" :firstSearchQuestion="firstSearchQuestion" />
            </div>
            <input-content ref="inputContent" @search="handleSearch" />
            <Tour :open="tourStore.contentTourOpen" v-model:current="currentTour" :steps="steps"
                @close="handleOpenTour(false)" />
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import TopButtonGroup from './components/TopButtonGroup.vue'
import MessageContent from './components/MessageContent.vue'
import InputContent from './components/InputContent.vue'
import { useI18n } from 'vue-i18n'
import { useSystemConfigStore } from '@/store/systemConfig'
import { Tour } from 'ant-design-vue'
import { useTour } from '@/store/tour'
import '@/content/commonStyles/tour.css'

const { floatIco } = useSystemConfigStore()
const tourStore = useTour()
const currentTour = ref(0)
const { t } = useI18n()
const topButtonGroup = ref(null)
const inputContent = ref()
const props = defineProps({
    isShowChatBox: {
        type: Boolean,
        default: false
    },
    colorPrimary: {
        type: String,
        default: '#52c41a'
    },
    copyValue: {
        type: String,
        default: ''
    },
    messages: {
        type: Array,
        default: () => []
    },
    firstSearchQuestion: {
        type: String,
        default: ''
    }
})
const emit = defineEmits(['onShowChatBox', 'close', 'search', 'clear'])
let startTime = 0

const steps = [
    {
        title: t('content.tour.clearButtonTitle'),
        description: t('content.tour.clearButtonValue'),
        target: () => topButtonGroup.value.$refs.clearBtn && topButtonGroup.value.$refs.clearBtn.$el,
        nextButtonProps: { children: t('content.tour.nextBtnText') }
    },
    {
        title: t('content.tour.closeButtonTitle'),
        description: t('content.tour.closeButtonValue'),
        target: () => topButtonGroup.value.$refs.closeBtn && topButtonGroup.value.$refs.closeBtn.$el,
        prevButtonProps: { children: t('content.tour.prevBtnText') },
        nextButtonProps: { children: t('content.tour.nextBtnText') }
    },
    {
        title: t('content.tour.inputBoxTitle'),
        description: t('content.tour.inputBoxValue'),
        target: () => inputContent.value && inputContent.value.$el,
        prevButtonProps: { children: t('content.tour.prevBtnText') },
        nextButtonProps: { children: t('content.tour.finalBtnText') }
    },
]

const handhowMouseDown = () => {
    startTime = new Date().getTime()
}

const showChatBox = () => {
    if (new Date().getTime() - startTime > 150) return
    emit('onShowChatBox')
}

const handleClose = () => {
    emit('close')
}

const handleClear = () => {
    emit('clear')
}

const handleSearch = (value) => {
    emit('search', value)
    inputContent.value.handleClear()
}

const displayValue = computed(() => {
    return props.copyValue === '' ? t('content.defaultCopyValue') : props.copyValue
})

const floatBallStyle = computed(() => {
    const style = {
        opacity: floatIco.opt / 100
    }
    if (floatIco?.mode === 'color' && floatIco.color) style.background = floatIco.color
    if (floatIco?.mode === 'picture' && floatIco.img) {
        style.backgroundImage = `url(${floatIco.img})`
        style.backgroundSize = 'contain'
        style.backgroundOrigin = 'content-box'
        style.backgroundRepeat = 'no-repeat'
        // style.padding = '5px'
        style.width = '45px'
        style.height = '45px'
    }
    return { ...style }
})

const handleOpenTour = (value) => {
    currentTour.value = 0
    tourStore.setContentTourOpen(value)
}

</script>

<style scoped>
.chat-box {
    text-align: start;
}

.default-button {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
}

.chat-box-content {
    width: 255px;
    display: flex;
    flex-direction: column;
    border-radius: 20px;
    overflow: hidden;
    align-items: center;
    justify-content: space-between;
}

.content-top {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.info-message {
    background-color: #52c41a;
    opacity: 0.5;
    height: max-content;
    max-height: 50px;
    overflow: auto;
    scrollbar-width: none;
    width: 90%;
    border-radius: 20px;
}

.info-message p {
    color: #fff;
    margin: 10px;
}
</style>
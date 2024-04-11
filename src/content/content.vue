<template>
    <ConfigProvider :theme="{
        token: {
            colorPrimary: primaryColor
        }
    }">
        <drag-ball style="font-family: Arial 微软雅黑; font-size: 12px;" ref="dragBallRef" :isShowChatBox="isShowChatBox">
            <chat-box :isShowChatBox="isShowChatBox" :colorPrimary="primaryColor" :copyValue="copyValue"
                :messages="messages" :firstSearchQuestion="firstSearchQuestion" @onShowChatBox="onShowChatBox"
                @close="handleClose" @clear="handleClear" @search="handleSearch" />
        </drag-ball>
    </ConfigProvider>
</template>

<script setup>
import { ref, onMounted, reactive, computed } from 'vue';
import DragBall from './components/DragBall/index.vue'
import ChatBox from './components/ChatBox/index.vue'
import { ConfigProvider, Modal, message } from 'ant-design-vue'
import { genPromptText } from '../tools/genPromptText'
import { useSystemConfigStore } from '@/store/systemConfig'
import { useI18n } from 'vue-i18n'

const { locale, t } = useI18n()
const systemConfigStore = useSystemConfigStore()
const dragBallRef = ref()
const isShowChatBox = ref(false)
const colorPrimary = ref('#820014')
const copyValue = ref('')
const messages = reactive([])
let isWaitingWS = false
const firstSearchQuestion = ref()

const onShowChatBox = () => {
    isShowChatBox.value = true
}

const handleClose = () => {
    isShowChatBox.value = false
}

const handleClear = () => {
    messages.splice(0, messages.length)
    copyValue.value = ''
    firstSearchQuestion.value = ''
}

const messageListener = (request, sender, sendResponse) => {
    if (request.action === 'userCopy') {
        // TODO: 增加不再提醒的选项
        if (messages.length > 0) {
            Modal.confirm({
                title: t('content.clearConfirmModal.title'),
                okText: t('content.clearConfirmModal.okText'),
                cancelText: t('content.clearConfirmModal.cancelText'),
                onOk() {
                    handleClear()
                    copyValue.value = request.data
                    onShowChatBox()
                }
            })
        } else {
            copyValue.value = request.data
            onShowChatBox()
        }
    }
    if (request.action === 'websocketMessage') {
        if (request.data) {
            if (isWaitingWS) {
                messages[messages.length - 1].content = request.data
                isWaitingWS = false
            } else {
                messages[messages.length - 1].content += request.data
            }
        }
    }
    if (request.action === 'configError') {
        message.error(request.data)
        messages[messages.length - 1].content = request.data
        isWaitingWS = false
    }
    if (request.action === 'updatePrimaryColor' || request.action === 'updateLanguage' || request.action === 'updateFloatBall') {
        initSystemConfigByChromeStorage()
    }
}

const handleSearch = (searchValue) => {
    isWaitingWS = true
    if (messages.length === 0) firstSearchQuestion.value = searchValue
    chrome.runtime.sendMessage({
        action: 'search',
        data: {
            messages,
            searchValue,
            copyValue: copyValue.value
        }
    })
    messages.push({
        role: 'user',
        content: messages.length > 1 ? searchValue : genPromptText(searchValue, copyValue.value)
    }, {
        role: 'assistant',
        content: t('content.defaultAssistantMessage')
    })
}

const primaryColor = computed(() => systemConfigStore.primaryColor)

const initSystemConfigByChromeStorage = () => {
    chrome && chrome.storage.local.get('systemSetting', (res) => {
        if (res.systemSetting) {
            systemConfigStore.setPrimaryColor(res.systemSetting.primaryColor)
            systemConfigStore.setLanguage(res.systemSetting.language)
            systemConfigStore.setFloatIco(res.systemSetting.floatIco)
            locale.value = res.systemSetting.language
        }
    })
}

onMounted(() => {
    chrome.runtime.onMessage.addListener(messageListener)
    initSystemConfigByChromeStorage()
})

</script>

<style scoped></style>
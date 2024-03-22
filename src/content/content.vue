<template>
    <ConfigProvider
        :theme="{
            token: {
                colorPrimary: colorPrimary
            }
        }"
    >
        <drag-ball
        style="font-family: Arial 微软雅黑; font-size: 12px;"
        ref="dragBallRef"
        :isShowChatBox="isShowChatBox">
            <chat-box
                :isShowChatBox="isShowChatBox"
                :colorPrimary="colorPrimary"
                :copyValue="copyValue"
                :messages="messages"
                :firstSearchQuestion = "firstSearchQuestion"
                @onShowChatBox="onShowChatBox"
                @close="handleClose"
                @clear="handleClear"
                @search="handleSearch"/>
        </drag-ball>
    </ConfigProvider>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import DragBall from './components/DragBall/index.vue'
import ChatBox from './components/ChatBox/index.vue'
import { ConfigProvider } from 'ant-design-vue'
import { genPromptText } from '../tools/genPromptText'

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
        // TODO: 增加删除确认
        handleClear()
        copyValue.value = request.data
        onShowChatBox()
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
        content: '分析中...'
    })
}

onMounted(() => {
    chrome.runtime.onMessage.addListener(messageListener)
})

</script>

<style scoped></style>
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
                @onShowChatBox="onShowChatBox"
                :colorPrimary="colorPrimary"
                :copyValue="copyValue"
                @close="handleClose"/>
        </drag-ball>
    </ConfigProvider>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import DragBall from './components/DragBall/index.vue'
import ChatBox from './components/ChatBox/index.vue'
import { ConfigProvider } from 'ant-design-vue'

const dragBallRef = ref()
const isShowChatBox = ref(false)
const colorPrimary = ref('#820014')
const copyValue = ref('请选择内容')

const onShowChatBox = () => {
    isShowChatBox.value = true
}

const handleClose = () => {
    isShowChatBox.value = false
}

const messageListener = (request, sender, sendResponse) => {
    if (request.action === 'userCopy') {
        console.log('userCopy', request.data)
        copyValue.value = request.data
    }
}

onMounted(() => {
    chrome.runtime.onMessage.addListener(messageListener)
})

</script>

<style scoped></style>
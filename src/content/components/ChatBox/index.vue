<template>
    <div class="chat-box">
        <div class="default-button" v-if="!isShowChatBox" @mousedown="handhowMouseDown" @mouseup="showChatBox"></div>
        <div class="chat-box-content" :style="{ backgroundColor: `${colorPrimary}a0` }" v-else>
            <div class="content-top">
                <top-button-group @close="handleClose" @clear="handleClear" />
                <div class="info-message" :style="{ backgroundColor: `${colorPrimary}f0` }">
                    <p>{{ displayValue }}</p>
                </div>
                <message-content :messages="messages" :firstSearchQuestion="firstSearchQuestion" />
            </div>
            <input-content ref="inputContent"  @search="handleSearch"/>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import TopButtonGroup from './components/TopButtonGroup.vue'
import MessageContent from './components/MessageContent.vue'
import InputContent from './components/InputContent.vue'

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
        default: '请选中内容'
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
const inputContent = ref()
const emit = defineEmits(['onShowChatBox', 'close', 'search', 'clear'])
let startTime = 0

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
    return props.copyValue === '' ? '可复制网页文字作为搜索内容' : props.copyValue
})

</script>

<style scoped>
.chat-box {
    text-align: start;
}

.default-button {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: lightblue;
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
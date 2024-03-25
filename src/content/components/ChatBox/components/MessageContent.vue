<template>
    <div class="message-content">
        <div class="messages" v-for="(message, index) in messages" :key="`${message.role}_${index}`" :class="messageStyle(message)">
            <div class="message-item">
                {{ messageContent(message, index) }}
                <div v-if="message.role !== 'user'" class="icos">
                    <img src="../../../images/copy.png" title="点击复制" @click="handleCopy(message)">
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { message } from 'ant-design-vue'

const props = defineProps({
    messages: {
        type: Array,
        default: () => []
    },
    firstSearchQuestion: {
        type: String,
        default: ''
    }
})

const handleCopy = (messageValue) => {
    if (navigator.clipboard && window.isSecureContext) {
        message.success('复制成功')
        return navigator.clipboard.writeText(messageValue.content)
    } else {
        let textArea = document.createElement("textarea")
        textArea.value = messageValue.content
        textArea.style.display = "none"
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        return new Promise((res, rej) => {
            // 执行复制命令并移除文本框
            document.execCommand('copy') ? res() : rej()
            textArea.remove()
            message.success('复制成功')
        })
    }
}

const messageStyle = computed(() => {
    return (message) => {
        return message.role === 'user' ? 'message-item-user' : 'message-item-system'
    }
})

const messageContent = computed(() => {
    return (message, index) => {
        return index === 0 ? props.firstSearchQuestion :  message.content
    }
})

</script>

<style scoped>
.message-content {
    width: 90%;
    height: 300px;
    overflow: auto;
    margin: 10px 0;
    display: flex;
    flex-direction: column;
    scrollbar-width: none;
}
.messages {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.icos {
    display: flex;
    justify-content: flex-end;
}

.icos img {
    width: 15px;
    margin: 5px 0 0;
    cursor: pointer;
}

.message-item {
    margin: 5px 0;
    width: max-content;
    max-width: 80%;
    border-radius: 10px;
    word-wrap: break-word;
}

.message-item-user {
    align-items: flex-end;
}

.message-item-user .message-item {
    background-color: #52c41a;
    color: #fff;
    padding: 10px;
}

.message-item-system .message-item {
    background-color: #fff;
    padding: 10px 10px 5px;
}
</style>
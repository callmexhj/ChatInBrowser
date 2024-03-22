<template>
    <div class="message-content">
        <div class="messages" v-for="(message, index) in messages" :key="`${message.role}_${index}`" :class="messageStyle(message)">
            <div class="message-item">
                {{ messageContent(message, index) }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'

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
    width: 100%;
}

.message-item {
    margin: 5px 0;
    width: max-content;
    max-width: 80%;
    padding: 10px;
    border-radius: 10px;
    word-wrap: break-word;
}

.message-item-user {
    justify-content: flex-end;
}

.message-item-user .message-item {
    background-color: #52c41a;
    color: #fff;
}

.message-item-system .message-item {
    background-color: #fff;
}
</style>
<template>
    <div class="message-content">
        <div class="messages" v-for="(message, index) in messages" :key="`${message.role}_${index}`"
            :class="messageStyle(message)">
            <div class="message-item" v-if="message.role !== 'user'">
                <div class="md-content" v-html="messageContent(message, index)"></div>
                <div class="icos">
                    <img src="@/content/images/copy.png" :title="t('content.messageContent.copyTitle')" @click="handleCopy(message)">
                </div>
            </div>
            <div class="message-item" v-else>
                {{ messageContent(message, index) }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { message } from 'ant-design-vue'
import 'highlight.js/styles/vs2015.min.css'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const md = new MarkdownIt({
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return '<pre class="hljs"><code>' +
                    hljs.highlight(lang, str, true).value +
                    '</code></pre>';
            } catch (__) { }
        }
        return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
    }
})

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
        message.success(t('content.messageContent.copySuccessInfo'))
        return navigator.clipboard.writeText(messageValue.content)
    } else {
        let textArea = document.createElement("textarea")
        textArea.value = messageValue.content
        textArea.style.display = "none"
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        return new Promise((res, rej) => {
            document.execCommand('copy') ? res() : rej()
            textArea.remove()
            message.success(t('content.messageContent.copySuccessInfo'))
        })
    }
}

const messageStyle = computed(() => {
    return (message) => {
        return message.role === 'user' ? 'message-item-user' : 'message-item-system'
    }
})

const markdownCompile = (messageValue) => {
    return md.render(messageValue)
}

const messageContent = computed(() => {
    return (message, index) => {
        return index === 0
            ? props.firstSearchQuestion
            : message.role !== 'user'
                ? markdownCompile(message.content)
                : message.content
    }
})

</script>

<style scoped>
.md-content {
    display: flex;
    flex-direction: column;
}

.message-item :deep(p),
:deep(ol),
:deep(ul) {
    margin: 5px 0;
    color: #262626;
}

.message-item :deep(pre) {
    overflow-x: auto;
    padding: 10px;
    border-radius: 5px;
    margin: 5px 0;
}

.message-item :deep(pre)::-webkit-scrollbar-track-piece {
    -webkit-border-radius: 0
}

.message-item :deep(pre)::-webkit-scrollbar {
    width: 5px;
    height: 10px
}

.message-item :deep(pre)::-webkit-scrollbar-thumb {
    height: 50px;
    background-color: #b8b8b8;
    -webkit-border-radius: 6px;
    outline-offset: -2px;
    filter: alpha(opacity=50);
    -moz-opacity: 0.5;
    -khtml-opacity: 0.5;
    opacity: 0.5
}

.message-item :deep(pre)::-webkit-scrollbar-thumb:hover {
    height: 50px;
    background-color: #878987;
    -webkit-border-radius: 6px
}

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
    width: 20px;
    cursor: pointer;
}

.message-item {
    margin: 5px 0;
    width: max-content;
    max-width: 80%;
    border-radius: 10px;
    word-wrap: break-word;
    white-space: pre-wrap;
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
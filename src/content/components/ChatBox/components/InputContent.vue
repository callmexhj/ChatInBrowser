<template>
    <div class="input-content">
        <TextArea class="input-content-input" v-model:value="userInput" :auto-size="{ minRows: 1, maxRows: 5 }"
            :autofocus="true" :placeholder="t('content.inputContent.placeholder')" auto-size @keydown="handleKeyDown" />
        <Button shape="circle" type="primary" @click="handleClick">
            <template #icon>
                <MessageOutlined />
            </template>
        </Button>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { Input, Button, message } from 'ant-design-vue'
import { MessageOutlined } from '@ant-design/icons-vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const TextArea = Input.TextArea
const emit = defineEmits(['search'])
const userInput = ref('')

const handleClick = () => {
    if (userInput.value.length === 0) return message.warning(t('content.inputContent.inputTip'))
    emit('search', userInput.value)
}

const handleClear = () => {
    userInput.value = ''
}

const handleKeyDown = (e) => {
    if (e.shiftKey && e.key === 'Enter') {
        e.preventDefault()
        handleClick()
    }
}

defineExpose({
    handleClear
})

</script>

<style scoped>
.input-content {
    width: 90%;
    display: flex;
    justify-content: space-between;
    margin: 10px 0 20px 0;
}

.input-content :deep(.ant-btn-primary) {
    box-shadow: none;
}

.input-content-input {
    width: 80%;
}
</style>
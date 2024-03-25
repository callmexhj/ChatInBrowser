<template>
    <div class="input-content">
        <TextArea class="input-content-input" v-model:value="userInput" :autofocus="true" placeholder="shift+enter快捷发送" autoSize @keydown="handleKeyDown"  />
        <Button shape="circle" type="primary" @click="handleClick">
            <template #icon>
                <SearchOutlined />
            </template>
        </Button>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { Input, Button } from 'ant-design-vue'
import { SearchOutlined } from '@ant-design/icons-vue'

const TextArea  = Input.TextArea
const emit = defineEmits(['search'])
const userInput = ref('')

const handleClick = () => {
    emit('search', userInput.value)
}

const handleClear = () => {
    userInput.value = ''
}

const handleKeyDown = (e) => {
    if (e.shiftKey && e.key === 'Enter') {
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
.input-content>>>.ant-btn-primary{
    box-shadow: none;
}
.input-content-input {
    width: 80%;
}
</style>
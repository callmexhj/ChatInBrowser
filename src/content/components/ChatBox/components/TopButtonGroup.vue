<template>
    <div class="button-group-background">
        <ButtonGroup>
            <Button shape="circle">
                <template #icon>
                    <QuestionOutlined />
                </template>
            </Button>
            <Button shape="circle" @click="handleClear">
                <template #icon>
                    <ClearOutlined />
                </template>
            </Button>
            <Button shape="circle" type="primary" @click="handleClose">
                <template #icon>
                    <CloseOutlined />
                </template>
            </Button>
        </ButtonGroup>
    </div>
</template>

<script setup>
import { Button } from 'ant-design-vue'
import {
    QuestionOutlined,
    ClearOutlined,
    CloseOutlined
} from '@ant-design/icons-vue'

const emit = defineEmits(['close', 'clear'])
const ButtonGroup = Button.Group
const handleClose = () => {
    emit('close')
}
const handleClear = () => {
    emit('clear')
}
</script>

<style scoped>
.button-group-background {
    width: 90%;
    display: flex;
    justify-content: flex-end;
    margin: 10px;
}
.button-group-background>>>.ant-btn-primary{
    box-shadow: none;
}
</style>
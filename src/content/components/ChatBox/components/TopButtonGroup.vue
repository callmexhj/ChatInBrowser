<template>
    <div class="button-group-background">
        <ButtonGroup>
            <!-- TODO： 自动打开popup -->
            <Tooltip title="请点击插件图标进行设置">
                <Button shape="circle">
                    <template #icon>
                        <SettingOutlined />
                    </template>
                </Button>
            </Tooltip>
            <Button shape="circle" @click="handleClear">
                <template #icon>
                    <ClearOutlined />
                </template>
            </Button>
            <Button shape="circle" type="primary" @click="handleClose">
                <template #icon>
                    <FullscreenExitOutlined />
                </template>
            </Button>
        </ButtonGroup>
    </div>
</template>

<script setup>
import { Button, Tooltip } from 'ant-design-vue'
import {
    SettingOutlined,
    ClearOutlined,
    FullscreenExitOutlined
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
.button-group-background :deep(.ant-btn-primary){
    box-shadow: none;
}
</style>
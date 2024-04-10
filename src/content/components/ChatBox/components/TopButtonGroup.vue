<template>
    <div class="button-group-background">
        <ButtonGroup>
            <!-- TODO： 自动打开popup -->
            <Tooltip :title="t('content.topButtonGroup.tooltipTitle')">
                <Button shape="circle" @click="handleOpenTour">
                    <template #icon>
                        <QuestionOutlined />
                    </template>
                </Button>
            </Tooltip>
            <Button shape="circle" @click="handleClear" ref="clearBtn">
                <template #icon>
                    <ClearOutlined />
                </template>
            </Button>
            <Button shape="circle" type="primary" @click="handleClose" ref="closeBtn">
                <template #icon>
                    <FullscreenExitOutlined />
                </template>
            </Button>
        </ButtonGroup>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { Button, Tooltip } from 'ant-design-vue'
import {
    QuestionOutlined,
    ClearOutlined,
    FullscreenExitOutlined
} from '@ant-design/icons-vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const emit = defineEmits(['close', 'clear', 'openTour'])
const ButtonGroup = Button.Group
const clearBtn = ref(null)
const closeBtn = ref(null)

const handleClose = () => {
    emit('close')
}

const handleClear = () => {
    emit('clear')
}

const handleOpenTour = () => {
    emit('openTour', true)
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
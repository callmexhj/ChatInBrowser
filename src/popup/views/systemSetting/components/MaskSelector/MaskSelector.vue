<template>
    <div class="mask-selector" :style="maskStyle" @click="handleClick" @mouseover="handleHover(true)"
        @mouseleave="handleHover(false)">
        <div class="icon">
            <img class="icon-img" :src="selectedImgUrl" />
        </div>
        <Divider type="vertical" dashed />
        <div v-if="!isMaskSelectorOpened" class="mask-name">
            <span>{{ selectedMaskLabel }}</span>
            <img class="right-ico" src="./Images/right.png" />
        </div>
        <div v-else class="mask-list">
            <Tooltip v-for="item in maskListFilter" :key="item.value" :title="toolTipTitlte(item.value)">
                <img class="icon-img ico-list-img" :src="item.icon" @click.stop="handleChooseMask(item.value)" />
            </Tooltip>
            <img class="right-ico left-ico" src="./Images/right.png" />
        </div>
    </div>
</template>

<script setup>
import { Divider, Tooltip } from "ant-design-vue"
import { computed, ref, watch } from "vue"
import { useSystemConfigStore } from "@/store/systemConfig"
import CommonPng from './Images/common.png'
import TranslatorPng from './Images/translator.png'
import WriterPng from './Images/writer.png'
import ProgrammerPng from './Images/programmer.png'
import { useI18n } from 'vue-i18n'

const props = defineProps({
    modelValue: {
        type: String,
        default: 'common'
    }
})

const { t } = useI18n()
const emit = defineEmits(['update:modelValue', 'change'])
const systemStore = useSystemConfigStore()
const isSelectorOver = ref(false)
const isMaskSelectorOpened = ref(false)
const maskList = [
    {
        value: 'common',
        label: t('popup.system.mask.maskList.commonLabel'),
        icon: CommonPng
    },
    {
        value: 'translator',
        label: t('popup.system.mask.maskList.translatorLabel'),
        icon: TranslatorPng
    },
    {
        value: 'programmer',
        label: t('popup.system.mask.maskList.programmerLabel'),
        icon: ProgrammerPng
    },
    {
        value: 'writer',
        label: t('popup.system.mask.maskList.writerLabel'),
        icon: WriterPng
    }
]

const toolTipTitlte = computed(() => {
    // 热更新当前页面语言
    return (value) => {
        if (!systemStore.language) return ''
        return t(`popup.system.mask.maskList.${value}Label`)
    }
})

const selectedMaskLabel = computed(() => {
    // 热更新当前页面语言
    if (!systemStore.language) return ''
    const value = maskList.find(item => item.value === props.modelValue).value
    return t(`popup.system.mask.maskList.${value}Label`)
})
const maskListFilter = computed(() => {
    return maskList.filter(item => item.value !== props.modelValue)
})
const selectedImgUrl = computed(() => {
    return maskList.find(item => item.value === props.modelValue).icon
})
const maskStyle = computed(() => {
    return {
        border: isSelectorOver.value ? `1px solid ${systemStore.primaryColor}` : '1px solid #d9d9d9'
    }
})

const handleHover = (value) => {
    isSelectorOver.value = value
}

const handleClick = () => {
    isMaskSelectorOpened.value = !isMaskSelectorOpened.value
}

const handleChooseMask = (value) => {
    emit('update:modelValue', value)
    emit('change', value)
    handleClick()
}
</script>

<style scoped>
.mask-selector {
    flex: content !important;
    display: flex;
    align-items: center;
    min-width: 90px;
    height: 25px;
    padding: 2.5px 10px;
    border-radius: 4px;
    cursor: pointer;
    transition: width 0.2s;
}

.icon {
    display: flex;
    align-items: center;
}

.icon-img {
    width: 20px;
    height: 20px;
}

.mask-name {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
}

.right-ico {
    width: 12px;
    height: 12px;
    margin: 0 0 0 10px;
}

.left-ico {
    transform: scaleX(-1);
}

.mask-list {
    display: flex;
    align-items: center;
}

.ico-list-img {
    margin: 0 10px;
}
</style>
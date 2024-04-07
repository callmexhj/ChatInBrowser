<template>
    <div class="system-setting">
        <a-form :model="systemForm" layout="vertical" autocomplete="off">
            <a-form-item :label="t('popup.system.primaryColor.title')" name="primaryColor">
                <a-select v-model:value="systemForm.primaryColor" @change="handleColorChange">
                    <a-select-option v-for="item in colorOptions" :value="item.value">
                        <div class="color-item">
                            <div class="color-pre" :style="{ backgroundColor: item.value }"></div>
                            <span>{{ item.value }}</span>
                        </div>
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item :label="t('popup.system.language.title')" name="language">
                <RadioGroup v-model:value="systemForm.language" button-style="solid">
                    <RadioButton value="zh">中文</RadioButton>
                    <RadioButton value="en">English</RadioButton>
                </RadioGroup>
            </a-form-item>
            <a-form-item :label="t('popup.system.icoColor.title')" name="language">
            </a-form-item>
        </a-form>
    </div>
</template>

<script setup>
import { reactive, onMounted, watch, ref } from 'vue'
import { Form, Select, message, RadioGroup, RadioButton } from 'ant-design-vue'
import { primaryColors } from '@/config/colorInfo'
import { useSystemConfigStore } from '@/store/systemConfig'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const AForm = Form
const AFormItem = Form.Item
const ASelect = Select
const ASelectOption = Select.Option
const store = useSystemConfigStore()

let systemSetting = reactive({})

const systemForm = reactive({
    primaryColor: store.primaryColor,
    language: store.language
})

onMounted(() => {
    readChromeStorage()
})

const readChromeStorage = () => {
    systemSetting = { ...systemForm }
}

const colorOptions = reactive([...primaryColors])

const handleColorChange = (value) => {
    systemSetting.primaryColor = value
    store.primaryColor = value
    chrome.storage.local.set({
        systemSetting
    }, () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: 'updatePrimaryColor',
                data: value
            })
        })
        message.success(t('popup.system.primaryColor.changeInfo'))
    })
}

watch(() => systemForm.language, (newValue, oldValue) => {
    if (oldValue !== undefined) {
        systemSetting.language = newValue
        store.setLanguage(newValue)
        chrome.storage.local.set({
            systemSetting
        }, () => {
            locale.value = newValue
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, {
                    action: 'updateLanguage',
                    data: newValue
                })
            })
            message.success(t('popup.system.language.changeInfo'))
        })
    }
})

</script>

<style scoped>
.system-setting {
    padding: 10px;
}

.color-item {
    display: flex;
    align-items: center;
}

.color-pre {
    width: 15px;
    height: 15px;
    background-color: lightcoral;
    margin: 0 5px 0;
}
</style>
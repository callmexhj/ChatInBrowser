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
                <RadioGroup v-model:value="systemForm.language" button-style="solid" @change="handleLanguageChange">
                    <RadioButton value="zh">中文</RadioButton>
                    <RadioButton value="en">English</RadioButton>
                </RadioGroup>
            </a-form-item>
            <a-form-item :label="t('popup.system.icoColor.title')" name="floatIco">
                <RadioGroup v-model:value="systemForm.floatIco.mode" @change="updateFloatBall">
                    <Radio value="color">{{ t('popup.system.icoColor.icoModeRadio.colorMode') }}</Radio>
                    <Radio value="picture">{{ t('popup.system.icoColor.icoModeRadio.pictureMode') }}</Radio>
                </RadioGroup>
                <div class="opt-slider">
                    <span>{{ t('popup.system.icoColor.optTitle') }}:</span>
                    <Slider :min="20" :step="10" class="slider" v-model:value="systemForm.floatIco.opt"
                        :tip-formatter="optFormatter" @after-change="updateFloatBall" />
                </div>
                <div class="opt-slider" v-if="systemForm.floatIco.mode === 'color'">
                    <span>{{ t('popup.system.icoColor.colorMode.title') }}:</span>
                    <Input class="slider" v-model:value="systemForm.floatIco.color"
                        :placeholder="t('popup.system.icoColor.colorMode.placeholder')" @blur="updateFloatBall" />
                </div>
                <div class="opt-slider" v-if="systemForm.floatIco.mode === 'picture'">
                    <Button :icon="h(AreaChartOutlined)" @click="handleChoosePic">{{
            t('popup.system.icoColor.pictureMode.button') }}</Button>
                </div>
                <div class="opt-slider">
                    <span>{{ t('popup.system.icoColor.demoTitle') }}:</span>
                    <div class="float-ball-demo" :style="floatBallDemoStyle"></div>
                </div>
            </a-form-item>
        </a-form>
    </div>
</template>

<script setup>
import { reactive, computed, h } from 'vue'
import { Form, Select, message, RadioGroup, RadioButton, Radio, Slider, Input, Button } from 'ant-design-vue'
import { primaryColors } from '@/config/colorInfo'
import { useSystemConfigStore } from '@/store/systemConfig'
import { useI18n } from 'vue-i18n'
import { AreaChartOutlined } from '@ant-design/icons-vue'

const { t, locale } = useI18n()
const AForm = Form
const AFormItem = Form.Item
const ASelect = Select
const ASelectOption = Select.Option
const store = useSystemConfigStore()

const systemForm = reactive({
    primaryColor: store.primaryColor,
    language: store.language,
    floatIco: store.floatIco
})

const colorOptions = reactive([...primaryColors])

const handleColorChange = (value) => {
    store.setPrimaryColor(value)
    chrome.storage.local.set({
        systemSetting: systemForm
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

const handleLanguageChange = ({ target: { value } }) => {
    store.setLanguage(value)
    chrome.storage.local.set({
        systemSetting: systemForm
    }, () => {
        locale.value = value
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: 'updateLanguage',
                data: value
            })
        })
        message.success(t('popup.system.language.changeInfo'))
    })
}

const optFormatter = (value) => {
    return `${value}%`
}

const updateFloatBall = () => {
    store.setFloatIco(systemForm.floatIco)
    chrome.storage.local.set({
        systemSetting: systemForm
    }, () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: 'updateFloatBall'
            })
        })
        message.success(t('popup.system.icoColor.changeInfo'))
    })
}

const floatBallDemoStyle = computed(() => {
    const style = {
        opacity: systemForm.floatIco.opt / 100
    }
    if (systemForm.floatIco?.mode === 'color' && systemForm.floatIco.color) style.background = systemForm.floatIco.color
    if (systemForm.floatIco?.mode === 'picture' && systemForm.floatIco.img) {
        style.backgroundImage = `url(${systemForm.floatIco.img})`
        style.backgroundSize = 'contain'
        style.backgroundOrigin = 'content-box'
        style.backgroundRepeat = 'no-repeat'
        style.padding = '5px'
        style.width = '40px'
        style.height = '40px'
    }
    return { ...style }
})

const handleChoosePic = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (event) => {
        const file = event.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = function (readerEvent) {
                systemForm.floatIco.img = readerEvent.target.result
                store.setFloatIcoImg(readerEvent.target.result)
                chrome.storage.local.set({
                    systemSetting: systemForm
                }, () => {
                    message.success(t('popup.system.icoColor.changeInfo'))
                })
            }
            reader.readAsDataURL(file)
        }
    }
    input.click()
}

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

.opt-slider {
    display: flex;
    align-items: center;
    margin: 10px 0;
}

.opt-slider .slider {
    flex: 1;
    margin-left: 20px;
}

.float-ball-demo {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    margin-left: 20px;
}
</style>
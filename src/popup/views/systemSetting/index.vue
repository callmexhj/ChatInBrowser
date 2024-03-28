<template>
    <div class="system-setting">
        <a-form :model="systemForm" layout="vertical" autocomplete="off">
            <a-form-item label="Primary Color" name="primaryColor">
                <a-select v-model:value="systemForm.primaryColor" @change="handleColorChange">
                    <a-select-option v-for="item in colorOptions" :value="item.value">
                        <div class="color-item">
                            <div class="color-pre" :style="{ backgroundColor: item.value }"></div>
                            <span>{{ item.value }}</span>
                        </div>
                    </a-select-option>
                </a-select>
            </a-form-item>
        </a-form>
    </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { Form, Select, message } from 'ant-design-vue'
import { primaryColors } from '@/config/colorInfo'

const AForm = Form
const AFormItem = Form.Item
const ASelect = Select
const ASelectOption = Select.Option

let systemSetting = reactive({})

const systemForm = reactive({
    primaryColor: '#135200'
})

onMounted(() => {
    readChromeStorage()
})

const readChromeStorage = () => {
    chrome.storage.local.get('systemSetting', (res) => {
        if (res.systemSetting) {
            systemSetting = res.systemSetting
            systemForm.primaryColor = systemSetting.primaryColor
        }
        else {
            chrome.storage.local.set({
                systemSetting: {}
            }, () => {
                console.log('systemSetting is empty, set default')
            })
        }
    })
}

const colorOptions = reactive([...primaryColors])

const handleColorChange = (value) => {
    systemSetting.primaryColor = value
    chrome.storage.local.set({
        systemSetting
    }, () => {
        message.success('保存成功')
    })
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
</style>
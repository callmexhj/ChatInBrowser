<template>
    <a-form :model="wenxinModelConfigForm" layout="vertical" @finish="handleFinish" autocomplete="off">
        <a-form-item label="APIKey" name="apiKey"
            :rules="[{ required: true, message: t('popup.model.placeholder.others', ['APIKey']) }]"
            ref="modelConfigFormRef">
            <Input class="textarea" v-model:value="wenxinModelConfigForm.apiKey"
                :placeholder="t('popup.model.placeholder.others', ['APIKey'])" />
        </a-form-item>
        <a-form-item label="API_SECRET" name="apiSecret"
            :rules="[{ required: true, message: t('popup.model.placeholder.others', ['API_SECRET']) }]"
            ref="modelConfigFormRef">
            <Input class="textarea" v-model:value="wenxinModelConfigForm.apiSecret"
                :placeholder="t('popup.model.placeholder.others', ['API_SECRET'])" />
        </a-form-item>
        <a-form-item :wrapper-col="{ flex: 1 }" ref="modelConfigFormButtonRef">
            <Button type="primary" html-type="submit" class="submit-button">{{ t('popup.model.saveButton') }}</Button>
        </a-form-item>
    </a-form>
</template>

<script setup>
import { ref } from 'vue'
import { Form, Input, Button } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
import { usePopupSystemSettingHome } from '@/store/popupSystemSettingHome'

const { wenxinModelConfigForm } = usePopupSystemSettingHome()
const { t } = useI18n()
const AForm = Form
const AFormItem = Form.Item
const emit = defineEmits(['finish'])
const modelConfigFormRef = ref(null)
const modelConfigFormButtonRef = ref(null)

const handleFinish = (values) => emit('finish', values)
</script>

<style scoped>
@import '@/commonStyles/scrollBar.css';

.submit-button {
    width: 100%;
}

.textarea {
    word-break: break-all;
    overflow: auto !important;
}
</style>
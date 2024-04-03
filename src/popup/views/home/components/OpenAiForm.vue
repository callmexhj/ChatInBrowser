<template>
    <a-form :model="modelForm" layout="vertical" @finish="handleFinish" autocomplete="off">
        <a-form-item label="APIKey" name="apiKey"
            :rules="[{ required: true, message: t('popup.model.placeholder.others', ['APIKey']) }]">
            <a-textarea class="textarea" :auto-size="{ minRows: 3, maxRows: 6 }" v-model:value="modelForm.apiKey"
                :placeholder="t('popup.model.placeholder.others', ['APIKey'])" />
        </a-form-item>
        <a-form-item :wrapper-col="{ flex: 1 }">
            <Button type="primary" html-type="submit" class="submit-button">{{ t('popup.model.saveButton') }}</Button>
        </a-form-item>
    </a-form>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Form, Input, Button } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const AForm = Form
const AFormItem = Form.Item
const ATextarea = Input.TextArea
const emit = defineEmits(['finish'])
const props = defineProps({
    modelConfig: Object
})
const modelForm = ref({
    apiKey: ''
})

onMounted(() => {
    if (props.modelConfig) {
        modelForm.value = { ...props.modelConfig }
    }
})

const handleFinish = (values) => {
    emit('finish', values)
}
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
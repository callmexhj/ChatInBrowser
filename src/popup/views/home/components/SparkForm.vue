<template>
    <a-form :model="modelForm" layout="vertical" @finish="handleFinish" autocomplete="off">
        <a-form-item label="APPID" name="appId"
            :rules="[{ required: true, message: t('popup.model.placeholder.others', ['APPID']) }]">
            <Input v-model:value="modelForm.appId" :placeholder="t('popup.model.placeholder.others', ['APPID'])" />
        </a-form-item>
        <a-form-item label="API_SECRET" name="apiSecret"
            :rules="[{ required: true, message: t('popup.model.placeholder.others', ['API_SECRET']) }]">
            <Input v-model:value="modelForm.apiSecret"
                :placeholder="t('popup.model.placeholder.others', ['API_SECRET'])" />
        </a-form-item>
        <a-form-item label="API_KEY" name="apiKey"
            :rules="[{ required: true, message: t('popup.model.placeholder.others', ['API_KEY']) }]">
            <Input v-model:value="modelForm.apiKey" :placeholder="t('popup.model.placeholder.others', ['API_KEY'])" />
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
const emit = defineEmits(['finish'])
const props = defineProps({
    modelConfig: Object
})
const modelForm = ref({
    appId: '',
    apiSecret: '',
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
.submit-button {
    width: 100%;
}
</style>
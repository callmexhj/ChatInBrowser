<template>
  <div class="home">
    <div class="content">
      <a-form :model="modelForm" layout="vertical" @finish="handleFinish" autocomplete="off">
        <a-form-item label="Model" name="modelVersion" :rules="[{ required: true, message: 'Please choose your Model' }]">
          <Cascader v-model:value="modelForm.modelVersion" :options="modelOptions" :placeholder="t('popup.model.placeholder.model')" />
        </a-form-item>
        <a-form-item label="APPID" name="appId" :rules="[{ required: true, message: t('popup.model.placeholder.others', ['APPID']) }]">
          <Input v-model:value="modelForm.appId" :placeholder="t('popup.model.placeholder.others', ['APPID'])" />
        </a-form-item>
        <a-form-item label="API_SECRET" name="apiSecret" :rules="[{ required: true, message: t('popup.model.placeholder.others', ['API_SECRET']) }]">
          <Input v-model:value="modelForm.apiSecret" :placeholder="t('popup.model.placeholder.others', ['API_SECRET'])" />
        </a-form-item>
        <a-form-item label="API_KEY" name="apiKey" :rules="[{ required: true, message: t('popup.model.placeholder.others', ['API_KEY']) }]">
          <Input v-model:value="modelForm.apiKey" :placeholder="t('popup.model.placeholder.others', ['API_KEY'])" />
        </a-form-item>
        <a-form-item :wrapper-col="{ flex: 1 }">
          <Button type="primary" html-type="submit" class="submit-button">{{ t('popup.model.saveButton') }}</Button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { Form, Input, Cascader, Button, message } from 'ant-design-vue'
import { modelOptions } from '../../../config/modelInfo'
import { ApiConfig } from '@/api/config'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const AForm = Form
const AFormItem = Form.Item

const modelForm = reactive({
  modelVersion: null,
  appId: '',
  apiSecret: '',
  apiKey: ''
})

onMounted(() => {
  chrome.storage.local.get(['modelConfig'], (result) => {
    console.log(result.modelConfig)
    const { modelConfig } = result
    if (modelConfig) {
      const { model, modelName, appId, apiSecret, apiKey } = modelConfig
      modelForm.modelVersion = [model, modelName]
      modelForm.appId = appId
      modelForm.apiSecret = apiSecret
      modelForm.apiKey = apiKey
    }
  })
})

const handleFinish = (values) => {
  const { modelVersion: [model, modelName], apiKey, apiSecret, appId } = values
  if (ApiConfig[modelName]) {
    const { path, domain } = ApiConfig[modelName]
    const modelConfig = {
      model,
      modelName,
      path,
      domain,
      appId,
      apiKey,
      apiSecret
    }
    chrome.storage.local.set({
      modelConfig
    }, () => {
      message.success(t('popup.model.changeInfo'))
    })
  }
}

</script>

<style scoped>
@import '@/commonStyles/scrollBar.css';
.content {
  padding: 0 10px 0 0;
  margin: 10px;
  height: 430px;
  overflow: auto;
}
.submit-button {
  width: 100%;
}
</style>
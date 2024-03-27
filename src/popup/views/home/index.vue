<template>
  <div class="home">
    <div class="content">
      <a-form :model="modelForm" layout="vertical" @finish="handleFinish" autocomplete="off">
        <a-form-item label="Model" name="modelVersion" :rules="[{ required: true, message: 'Please choose your Model' }]">
          <Cascader v-model:value="modelForm.modelVersion" :options="modelOptions" placeholder="请选择模型" />
        </a-form-item>
        <a-form-item label="APPID" name="appId" :rules="[{ required: true, message: 'Please input your APPID' }]">
          <Input v-model:value="modelForm.appId" placeholder="请输入APPID" />
        </a-form-item>
        <a-form-item label="API_SECRET" name="apiSecret" :rules="[{ required: true, message: 'Please input your API_SECRET' }]">
          <Input v-model:value="modelForm.apiSecret" placeholder="请输入API_SECRET" />
        </a-form-item>
        <a-form-item label="API_KEY" name="apiKey" :rules="[{ required: true, message: 'Please input your API_KEY' }]">
          <Input v-model:value="modelForm.apiKey" placeholder="请输入API_KEY" />
        </a-form-item>
        <a-form-item :wrapper-col="{ flex: 1 }">
          <Button type="primary" html-type="submit" class="submit-button">保存配置</Button>
        </a-form-item>
        <a-form-item :wrapper-col="{ flex: 1 }">
          <Button class="submit-button">清除全部</Button>
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
      message.success('保存成功')
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
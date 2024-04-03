<template>
  <div class="home">
    <div class="content">
      <a-form layout="vertical">
        <a-form-item label="Model">
          <Cascader :allowClear="false" v-model:value="modelVersion" :options="modelOptions"
            :placeholder="t('popup.model.placeholder.model')" />
        </a-form-item>
      </a-form>
      <spark-form v-if="modelVersion.length > 0 && modelVersion[0] === 'SparkApi'" :modelConfig="sparkModelConfigForm"
        @finish="handleSparkConfigFinish" />
      <OpenAiForm v-if="modelVersion.length > 0 && modelVersion[0] === 'OpenAI'" :modelConfig="openAiModelConfigForm"
        @finish="handleOpenAiConfigFinish" />
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, watch, ref } from 'vue'
import { message, Cascader, Form } from 'ant-design-vue'
import { ApiConfig } from '@/api/config'
import { useI18n } from 'vue-i18n'
import { modelOptions } from '@/config/modelInfo'
import SparkForm from './components/SparkForm.vue'
import OpenAiForm from './components/OpenAiForm.vue'

const { t } = useI18n()
const AForm = Form
const AFormItem = Form.Item

let modelConfigCache = null
const modelVersion = ref([])
const sparkModelConfigForm = reactive({
  appId: '',
  apiSecret: '',
  apiKey: ''
})

const openAiModelConfigForm = reactive({
  apiKey: ''
})

const initModelConfig = () => {
  chrome.storage.local.get(['modelConfig'], (result) => {
    const { modelConfig } = result
    if (modelConfig) {
      modelConfigCache = modelConfig
      const { model, modelName, sparkModelConfig, openAiModelConfig } = modelConfig
      modelVersion.value = [model, modelName]
      sparkModelConfigForm.appId = sparkModelConfig?.appId
      sparkModelConfigForm.apiSecret = sparkModelConfig?.apiSecret
      sparkModelConfigForm.apiKey = sparkModelConfig?.apiKey
      openAiModelConfigForm.apiKey = openAiModelConfig?.apiKey
      console.log(sparkModelConfigForm, openAiModelConfigForm)
    } else {
      modelConfigCache = {
        model: 'SparkApi',
        modelName: 'spark3_5',
        sparkModelConfig: null,
        openAiModelConfig: null
      }
    }
  })
}

onMounted(() => {
  initModelConfig()
})

watch(modelVersion, (newValue) => {
  const [model, modelName] = newValue
  modelConfigCache.model = model
  modelConfigCache.modelName = modelName
})

const handleSparkConfigFinish = (values) => {
  const { apiKey, apiSecret, appId } = values
  const modelName = modelVersion.value[1]
  if (ApiConfig[modelName]) {
    const { path, domain } = ApiConfig[modelName]
    sparkModelConfigForm.appId = appId
    sparkModelConfigForm.apiSecret = apiSecret
    sparkModelConfigForm.apiKey = apiKey
    const sparkModelConfig = {
      path,
      domain,
      appId,
      apiKey,
      apiSecret
    }
    modelConfigCache.sparkModelConfig = { ...sparkModelConfig }
    chrome.storage.local.set({
      modelConfig: modelConfigCache
    }, () => {
      message.success(t('popup.model.changeInfo'))
    })
  }
}

const handleOpenAiConfigFinish = (values) => {
  const { apiKey } = values
  openAiModelConfigForm.apiKey = apiKey
  const openAiModelConfig = {
    apiKey
  }
  modelConfigCache.openAiModelConfig = { ...openAiModelConfig }
  chrome.storage.local.set({
    modelConfig: modelConfigCache
  }, () => {
    message.success(t('popup.model.changeInfo'))
  })
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
</style>
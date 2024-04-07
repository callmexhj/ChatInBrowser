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
import { usePopupSystemSettingHome } from '@/store/popupSystemSettingHome'

const popupSystemSettingHomeStore = usePopupSystemSettingHome()
const { t } = useI18n()
const AForm = Form
const AFormItem = Form.Item

let modelConfigCache = null
const modelVersion = ref([])
const { sparkModelConfigForm, openAiModelConfigForm } = popupSystemSettingHomeStore

const initModelConfig = () => {
  chrome.storage.local.get(['modelConfig'], (result) => {
    const { modelConfig } = result
    if (modelConfig) {
      modelConfigCache = modelConfig
      const { model, modelName, sparkModelConfig, openAiModelConfig } = modelConfig
      modelVersion.value = [model, modelName]
      popupSystemSettingHomeStore.setSparkModelConfigForm(sparkModelConfig?.appId, sparkModelConfig?.apiSecret, sparkModelConfig?.apiKey)
      popupSystemSettingHomeStore.setOpenAiModelConfigForm(openAiModelConfig?.apiKey)
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
<template>
  <div class="home">
    <div class="content">
      <a-form layout="vertical">
        <a-form-item label="Model" ref="modelVersionRef">
          <Cascader :allowClear="false" v-model:value="modelVersion" :options="modelOptions"
            :placeholder="t('popup.model.placeholder.model')" />
        </a-form-item>
      </a-form>
      <spark-form ref="modelConfigRef"
        v-if="modelVersion.length > 0 && modelVersion[0] === 'SparkApi' || (modelVersion.length === 0 && tourStore.popupHomeTourOpen)"
        :modelConfig="sparkModelConfigForm" @finish="handleSparkConfigFinish" />
      <OpenAiForm ref="modelConfigRef" v-if="modelVersion.length > 0 && modelVersion[0] === 'OpenAI'"
        :modelConfig="openAiModelConfigForm" @finish="handleOpenAiConfigFinish" />
    </div>
    <Tour :open="tourStore.popupHomeTourOpen" v-model:current="currentTour" :steps="steps"
      @close="handleOpenTour(false)" />
  </div>
</template>

<script setup>
import { onMounted, watch, ref } from 'vue'
import { message, Cascader, Form, Tour } from 'ant-design-vue'
import { ApiConfig } from '@/api/config'
import { useI18n } from 'vue-i18n'
import { modelOptions } from '@/config/modelInfo'
import SparkForm from './components/SparkForm.vue'
import OpenAiForm from './components/OpenAiForm.vue'
import { usePopupSystemSettingHome } from '@/store/popupSystemSettingHome'
import '@/popup/commonStyles/tour.css'
import { useTour } from '@/store/tour'

const popupSystemSettingHomeStore = usePopupSystemSettingHome()
const { t } = useI18n()
const tourStore = useTour()
const AForm = Form
const AFormItem = Form.Item

let modelConfigCache = null
const modelVersion = ref([])
const currentTour = ref(0)
const modelVersionRef = ref(null)
const modelConfigRef = ref(null)
const { sparkModelConfigForm, openAiModelConfigForm } = popupSystemSettingHomeStore

const steps = [
  {
    title: t('popup.model.tour.modelVersionTitle'),
    description: t('popup.model.tour.modelVersionValue'),
    target: () => modelVersionRef.value && modelVersionRef.value.$el,
    nextButtonProps: { children: t('popup.model.tour.nextBtnText') }
  },
  {
    title: t('popup.model.tour.modelConfigTitle'),
    description: t('popup.model.tour.modelConfigValue'),
    target: () => modelConfigRef.value.$refs.modelConfigFormRef && modelConfigRef.value.$refs.modelConfigFormRef.$el,
    prevButtonProps: { children: t('popup.model.tour.prevBtnText') },
    nextButtonProps: { children: t('popup.model.tour.nextBtnText') }
  },
  {
    title: t('popup.model.tour.saveModelTitle'),
    description: t('popup.model.tour.saveModelValue'),
    target: () => modelConfigRef.value.$refs.modelConfigFormButtonRef && modelConfigRef.value.$refs.modelConfigFormButtonRef.$el,
    prevButtonProps: { children: t('popup.model.tour.prevBtnText') },
    nextButtonProps: { children: t('popup.model.tour.finalBtnText') }
  },
]

const handleOpenTour = (value) => {
  currentTour.value = 0
  tourStore.setHomeTourOpen(value)
}

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
    }, () => message.success(t('popup.model.changeInfo')))
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
  }, () => message.success(t('popup.model.changeInfo')))
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
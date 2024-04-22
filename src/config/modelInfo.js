import { ApiConfig } from '../api/config'

export const modelOptions = [
    {
      value: 'OpenAI',
      label: 'OpenAI',
      children: [
        {
          value: ApiConfig.gpt35_turbo.name,
          label: 'gpt-3.5-turbo'
        }
      ]
    },
    {
      value: 'SparkApi',
      label: '讯飞星火模型',
      children: [
        {
          value: ApiConfig.spark1_5.name,
          label: 'v1.5'
        },
        {
          value: ApiConfig.spark2.name,
          label: 'v2'
        },
        {
          value: ApiConfig.spark3.name,
          label: 'v3.1'
        },
        {
          value: ApiConfig.spark3_5.name,
          label: 'v3.5'
        }
      ]
    },
    {
      value: 'WenxinYiyan',
      label: '文心一言',
      children: [
        {
          value: ApiConfig.ernie_35.name,
          label: 'Ernie-3.5'
        },
        {
          value: ApiConfig.ernie_40.name,
          label: 'Ernie-4.0'
        }
      ]
    },
    {
      value: 'Tongyi',
      label: '通义千问',
      children: [
        {
          value: ApiConfig.qwen_turbo.name,
          label: 'qwen-turbo'
        },
        {
          value: ApiConfig.qwen_plus.name,
          label: 'qwen-plus'
        },
        {
          value: ApiConfig.qwen_max.name,
          label: 'qwen-max'
        }
      ]
    }
  ]
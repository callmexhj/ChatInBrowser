import { ApiConfig } from '../api/config'

export const modelOptions = [
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
    }
  ]
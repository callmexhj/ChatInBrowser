import { SparkApiConfig } from '../api/config'

export const modelOptions = [
    {
      value: '讯飞星火模型',
      label: '讯飞星火模型',
      children: [
        {
          value: SparkApiConfig.spark1_5,
          label: 'v1.5'
        },
        {
          value: SparkApiConfig.spark2,
          label: 'v2'
        },
        {
          value: SparkApiConfig.spark3,
          label: 'v3.1'
        },
        {
          value: SparkApiConfig.spark3_5,
          label: 'v3.5'
        }
      ]
    }
  ]
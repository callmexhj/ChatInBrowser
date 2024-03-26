<template>
  <div class="home">
    <div class="content">
      <a-form :model="modelForm" layout="vertical" @finish="handleFinish">
        <a-form-item label="Model" name="modelVersion">
          <Cascader v-model:value="modelForm.modelVersion" :options="modelOptions" placeholder="请选择模型" />
        </a-form-item>
        <a-form-item label="APPID" name="appId">
          <Input v-model:value="modelForm.appId" placeholder="请输入APPID" />
        </a-form-item>
        <a-form-item label="API_SECRET" name="apiSecret">
          <Input v-model:value="modelForm.apiSecret" placeholder="请输入API_SECRET" />
        </a-form-item>
        <a-form-item label="API_KEY" name="apiKey">
          <Input v-model:value="modelForm.apiKey" placeholder="请输入API_KEY" />
        </a-form-item>
        <a-form-item :wrapper-col="{ flex: 1 }">
          <Button type="primary" html-type="submit" class="submit-button">保存</Button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { Form, Input, Cascader, Button } from 'ant-design-vue'
import { modelOptions } from '../../../config/modelInfo'

const AForm = Form
const AFormItem = Form.Item

const modelForm = reactive({
  modelVersion: '',
  appId: '',
  apiSecret: '',
  apiKey: ''
})

const handleFinish = (values) => {
  console.log('Success:', values)
}

</script>

<style scoped>
.content {
  padding: 0 10px 0 0;
  margin: 10px;
  height: 430px;
  overflow: auto;
}
.submit-button {
  width: 100%;
}

::-webkit-scrollbar-track-piece {
  -webkit-border-radius: 0
}

::-webkit-scrollbar {
  width: 5px;
  height: 10px
}

::-webkit-scrollbar-thumb {
  height: 50px;
  background-color: #b8b8b8;
  -webkit-border-radius: 6px;
  outline-offset: -2px;
  filter: alpha(opacity=50);
  -moz-opacity: 0.5;
  -khtml-opacity: 0.5;
  opacity: 0.5
}

::-webkit-scrollbar-thumb:hover {
  height: 50px;
  background-color: #878987;
  -webkit-border-radius: 6px
}
</style>
<template>
    <div class="input-content">
        <Input class="input-content-input" />
        <Button shape="circle" type="primary">
            <template #icon>
                <SearchOutlined />
            </template>
        </Button>
    </div>
</template>

<script setup>
import { Input, Button } from 'ant-design-vue'
import { SearchOutlined } from '@ant-design/icons-vue'
</script>

<style scoped>
.input-content {
    width: 90%;
    display: flex;
    justify-content: space-between;
    margin: 10px 0 20px 0;
}
.input-content>>>.ant-btn-primary{
    box-shadow: none;
}
.input-content-input {
    width: 80%;
}
</style>
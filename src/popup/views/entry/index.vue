<template>
    <ConfigProvider :theme="{
        token: {
            colorPrimary: colorPrimary
        }
    }">
        <Header />
        <router-view />
        <PageNavigator :colorPrimary="colorPrimary" @change="handlePageChange" />
    </ConfigProvider>
</template>

<script setup>
import { ref } from 'vue'
import Header from '../../components/Header/index.vue'
import PageNavigator from '../../components/PageNavigator/index.vue'
import { ConfigProvider } from 'ant-design-vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const pageMap = [
    '/home',
    '/system',
    '/more'
]
const colorPrimary = ref('#135200')

const handlePageChange = (index) => {
    router.push(pageMap[index])
}

</script>

<style>
body {
    position: relative;
    width: 250px;
    height: 540px;
    margin: 0;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
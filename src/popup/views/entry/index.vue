<template>
    <ConfigProvider :theme="{
        token: {
            colorPrimary: primaryColor
        }
    }">
        <Header />
        <router-view />
        <PageNavigator :colorPrimary="primaryColor" @change="handlePageChange" />
    </ConfigProvider>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import Header from '../../components/Header/index.vue'
import PageNavigator from '../../components/PageNavigator/index.vue'
import { ConfigProvider } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { useSystemConfigStore } from '@/store/systemConfig'

const store = useSystemConfigStore()
const router = useRouter()
const pageMap = [
    '/home',
    '/system',
    '/more'
]

onMounted(() => {
    setPrimaryColorFromChromeStorage()
})

const setPrimaryColorFromChromeStorage = () => {
    chrome && chrome.storage.local.get('systemSetting', (result) => {
        if (result.systemSetting) {
            store.primaryColor = result.systemSetting.primaryColor
        }
    })
}

const primaryColor = computed(() => {
    return store.primaryColor
})

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
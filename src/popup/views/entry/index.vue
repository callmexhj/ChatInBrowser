<template>
    <ConfigProvider :theme="{
        token: {
            colorPrimary: primaryColor
        }
    }">
        <Header />
        <router-view />
        <PageNavigator :colorPrimary="primaryColor" :currentPage="currentPage" @change="handlePageChange" />
    </ConfigProvider>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue'
import Header from '../../components/Header/index.vue'
import PageNavigator from '../../components/PageNavigator/index.vue'
import { ConfigProvider } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { useSystemConfigStore } from '@/store/systemConfig'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const store = useSystemConfigStore()
const router = useRouter()
const currentPage = ref(0)
const pageMap = [
    '/home',
    '/system',
    '/more'
]

onMounted(() => {
    setSystemConfigFromChromeStorage()
    navToLastPage()
})

const navToLastPage = () => {
    chrome && chrome.storage.local.get('lastPage', (result) => {
        if (result.lastPage) {
            currentPage.value = pageMap.indexOf(result.lastPage)
            router.push(result.lastPage)
        }
        else {
            chrome.storage.local.set({
                lastPage: '/home'
            }, () => navToLastPage())
        }
    })
}

const setSystemConfigFromChromeStorage = () => {
    chrome && chrome.storage.local.get('systemSetting', (result) => {
        if (result.systemSetting) {
            store.setPrimaryColor(result.systemSetting.primaryColor)
            store.setLanguage(result.systemSetting.language)
            store.setFloatIco(result.systemSetting.floatIco)
            locale.value = result.systemSetting.language
        }
        else {
            chrome.storage.local.set({
                systemSetting: {
                    primaryColor: '#262626',
                    language: 'zh',
                    floatIco: {
                        opt: 100,
                        mode: 'color',
                        color: '#5b8c00',
                        img: ''
                    }
                }
            }, () => {
                setSystemConfigFromChromeStorage()
            })
        }
    })
}

const primaryColor = computed(() => {
    return store.primaryColor
})

const handlePageChange = (index) => {
    chrome.storage.local.set({
        lastPage: pageMap[index]
    })
    currentPage.value = index
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
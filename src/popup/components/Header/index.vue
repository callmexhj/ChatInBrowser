<template>
    <div class="header">
        <div class="header-left">
            <QuestionCircleOutlined v-if="showQuestionIco" @click="handleShowTour" />
        </div>
        <div class="header-mid">
            <div class="title">
                <h1>{{ title }}</h1>
            </div>
        </div>
        <div class="header-right"></div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { QuestionCircleOutlined } from '@ant-design/icons-vue'
import { useTour } from '@/store/tour'
import { useRoute } from 'vue-router'

const tourStore = useTour()
const route = useRoute()
const props = defineProps({
    title: {
        type: String,
        default: 'Chat In Browser'
    }
})

const handleShowTour = () => {
    if (route.path === '/system') {
        tourStore.setPopupSystemSettingTourOpen(true)
    } else if (route.path === '/home' || route.path === '/') {
        tourStore.setHomeTourOpen(true)
    }
}

const showQuestionIco = computed(() => {
    return route.path === '/system' || route.path === '/home' || route.path === '/'
})

</script>

<style scoped>
.header {
    height: 40px;
    background-color: #fff;
    border-bottom: 1px solid #f0f0f0;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
}

.header .header-mid {
    display: flex;
    align-items: center;
}

.header-left {
    cursor: pointer;
    display: flex;
}

.header h1 {
    margin: 0;
    font-size: 16px;
    font-weight: normal;
}
</style>
<template>
    <div class="page-navigator">
        <div class="nav-bar" @click="handleCheck(0)">
            <CommentOutlined :style="{ fontSize: '16px', color: checkedStyle(0) }" />
            <span :style="{ color: checkedStyle(0) }">{{ $t('popup.model.title') }}</span>
        </div>
        <div class="nav-bar" @click="handleCheck(1)">
            <ControlOutlined :style="{ fontSize: '16px', color: checkedStyle(1) }" />
            <span :style="{ color: checkedStyle(1) }">{{ $t('popup.system.title') }}</span>
        </div>
        <div class="nav-bar" @click="handleCheck(2)">
            <InfoCircleOutlined :style="{ fontSize: '16px', color: checkedStyle(2) }" />
            <span :style="{ color: checkedStyle(2) }">{{ $t('popup.more.title') }}</span>
        </div>
    </div>
</template>

<script setup>
import { CommentOutlined, InfoCircleOutlined, ControlOutlined } from '@ant-design/icons-vue'
import { computed, ref } from 'vue'

const emit = defineEmits(['change'])
const props = defineProps({
    colorPrimary: {
        type: String,
        default: '#820014'
    },
    currentPage: {
        type: Number,
        default: 0
    }
})

const handleCheck = (index) => {
    emit('change', index)
}

const checkedStyle = computed(() => {
    return (index) => {
        if (index === props.currentPage) {
            return props.colorPrimary
        }
    }
})

</script>

<style scoped>
.page-navigator {
    width: 100%;
    height: 50px;
    background-color: #fff;
    border-top: 1px solid #f0f0f0;
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: space-between;
}
.nav-bar {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
.nav-bar span {
    margin: 2px 0 0;
    font-size: 10px;
}
</style>
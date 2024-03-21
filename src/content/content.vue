<template>
    <drag-ball style="font-family: Arial 微软雅黑; font-size: 12px;" ref="dragBallRef" :showDialog="showContentBox">
        <chat-box />
    </drag-ball>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import DragBall from './components/DragBall/index.vue'
import ChatBox from './components/ChatBox/index.vue'
const showContentBox = ref(false)
const dragBallRef = ref()
</script>

<style scoped></style>
<template>
    <div class="chat-box">
        <div class="default-button"></div>
    </div>
</template>

<script setup>
const handhowMouseDown = () => {
    startTime = new Date().getTime()
}
const showDialog = () => {
    if (new Date().getTime() - startTime > 150) return
    emit('showDialog')
}
</script>

<style scoped>
.default-button {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: lightblue;
    cursor: pointer;
}
</style>
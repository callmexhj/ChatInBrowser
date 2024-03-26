<template>
    <div class="header">
        <div class="header-left"></div>
        <div class="header-mid">
            <div class="title">
                <h1>{{ title }}</h1>
            </div>
        </div>
        <div class="header-right"></div>
    </div>
</template>

<script setup>

const props = defineProps({
    title: {
        type: String,
        default: 'Chat In Browser'
    }
})

</script>

<style scoped>
.header {
    height: 40px;
    background-color: #fff;
    border-bottom: 1px solid #f0f0f0;
    display: flex;
    justify-content: space-between;
}
.header .header-mid {
    display: flex;
    align-items: center;
}
.header h1 {
    margin: 0;
    font-size: 16px;
    font-weight: normal;
}
</style>
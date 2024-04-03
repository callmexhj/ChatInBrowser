<template>
    <div class="menu-list">
        <div class="menu-list-item" @click="handleAboutExt">
            <div class="menu-list-item-left">
                <InfoOutlined />
                <span>{{ t('popup.more.buttons.aboutExt') }}</span>
            </div>
            <div class="menu-list-item-right hover-show">
                <RightOutlined />
            </div>
        </div>
        <div class="menu-list-item" @click="handleProjectHome">
            <div class="menu-list-item-left">
                <GithubOutlined />
                <span>{{ t('popup.more.buttons.projectHome') }}</span>
            </div>
            <div class="menu-list-item-right hover-show">
                <ExportOutlined />
            </div>
        </div>
        <div class="menu-list-item" @click="handleCreateIssue">
            <div class="menu-list-item-left">
                <CommentOutlined />
                <span>{{ t('popup.more.buttons.createIssue') }}</span>
            </div>
            <div class="menu-list-item-right hover-show">
                <ExportOutlined />
            </div>
        </div>
    </div>
</template>

<script setup>
import { GithubOutlined, ExportOutlined, CommentOutlined, InfoOutlined, RightOutlined } from '@ant-design/icons-vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const emit = defineEmits(['aboutExt', 'projectHome', 'createIssue'])

const handleAboutExt = () => {
    emit('aboutExt')
}

const handleProjectHome = () => {
    emit('projectHome')
}

const handleCreateIssue = () => {
    emit('createIssue')
}
</script>

<style scoped>
.menu-list:last-child {
    border-bottom: 1px solid #f0f0f0;
}
.menu-list-item {
    padding: 10px 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #f0f0f0;
    font-size: 14px;
    cursor: pointer;
    color: #404040;
}
.menu-list-item:hover {
    background-color: #f0f0f0;
}
.hover-show {
    opacity: 0;
    transition: opacity 0.3s;
}
.menu-list-item:hover .hover-show {
    opacity: 1;
}
.menu-list-item-left span {
    margin-left: 10px;
}
.menu-list-item-right {
    font-size: 12px;
    display: flex;
    align-items: center;
}
</style>
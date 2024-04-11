<template>
    <div class="more-content">
        <Modal v-model:open="isModalOpen" :title="t('popup.more.modalInfo.title')" :closable="false">
            {{ t('popup.more.modalInfo.content') }}
            <template #footer>
                <Button type="primary" @click="handleModalOk">{{ t('popup.more.modalInfo.okText') }}</Button>
            </template>
        </Modal>
        <div class="image-content">
            <img src="@/images/chatIco.png" />
        </div>
        <MenuList @aboutExt="handleAboutExt" @projectHome="handleProjectHome" @createIssue="handleCreateIssue" />
    </div>
</template>

<script setup>
import MenuList from './components/MenuList.vue'
import { Modal, Button } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'

const { t } = useI18n()
const isModalOpen = ref(false)

const handleAboutExt = () => {
    isModalOpen.value = true
}

const handleModalOk = () => {
    isModalOpen.value = false
}

const handleProjectHome = () => window.open('https://github.com/callmexhj/ChatInBrowser')

const handleCreateIssue = () => window.open('https://github.com/callmexhj/ChatInBrowser/issues')
</script>

<style scoped>
.image-content {
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.image-content img {
    width: 100px;
}
</style>
import { connectSparkWebSocket } from '@/tools/chat'
import { genPromptText } from '@/tools/genPromptText'

const checkModelConfig = () => {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get(['modelConfig'], (result) => {
            if (result.modelConfig) {
                resolve(result.modelConfig)
            } else {
                reject('请在插件设置界面配置模型参数后重试')
            }
        })
    })
}

chrome.contextMenus.create({
    id: 'search',
    title: 'ChatInBrowser',
    type: 'normal',
    contexts: ['selection']
})
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    console.log(info)
    if (info.menuItemId === "search") {
        await chrome.tabs.sendMessage(tab.id, {
            action: 'userCopy',
            data: info.selectionText
        })
    }
})
chrome.runtime.onMessage.addListener(async ({ action, data }, sender, sendResponse) => {
    if (action === 'search') {
        let modelConfig = null
        try {
            modelConfig = await checkModelConfig()
            const { messages, searchValue, copyValue } = data
            if (messages.length === 0) {
                messages.push({
                    role: "user",
                    content: genPromptText(searchValue, copyValue)
                })
            } else {
                messages.push({
                    role: "user",
                    content: searchValue
                })
            }
            if (modelConfig.model === 'SparkApi') {
                await connectSparkWebSocket(messages, sender, modelConfig)
            }
        } catch (error) {
            console.log(error)
            await chrome.tabs.sendMessage(sender.tab.id, {
                action: 'configError',
                data: error
            })
        }
    }
})
import { connectSparkWebSocket } from '@/tools/sparkchat'
import { genPromptText } from '@/tools/genPromptText'
import { chatFunc } from '@/tools/openaichat'

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
try{
    chrome.contextMenus.create({
        id: 'search',
        title: 'Chat in browser',
        type: 'normal',
        contexts: ['selection']
    })
} catch (e) {
    console.log(e)
}
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
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
                    content: await genPromptText(searchValue, copyValue)
                })
            } else {
                messages.push({
                    role: "user",
                    content: searchValue
                })
            }
            if (modelConfig.model === 'SparkApi') {
                await connectSparkWebSocket(messages, sender, modelConfig.sparkModelConfig)
            } else if (modelConfig.model === 'OpenAI') {
                await chatFunc(messages, sender, modelConfig.openAiModelConfig)
            }
        } catch (error) {
            await chrome.tabs.sendMessage(sender.tab.id, {
                action: 'configError',
                data: error
            })
        }
    }
})
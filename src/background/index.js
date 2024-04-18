import { connectSparkWebSocket } from '@/tools/sparkchat'
import { genPromptText } from '@/tools/genPromptText'
import { chatFunc } from '@/tools/openaichat'
import { wenxinCon } from '@/tools/wenxin'

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
    // 注入右键菜单
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
    // 右键菜单响应事件
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
            // 删除model字段以通过接口校验
            messages.forEach(obj => {
                delete obj.model
            })
            if (messages.length === 0) {
                // 第一条user消息需要构造prompt
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
            // 根据模型配置调用不同的接口方法
            if (modelConfig.model === 'SparkApi') {
                await connectSparkWebSocket(messages, sender, modelConfig.sparkModelConfig)
            } else if (modelConfig.model === 'OpenAI') {
                await chatFunc(messages, sender, modelConfig.openAiModelConfig)
            } else if (modelConfig.model === 'WenxinYiyan') {
                await wenxinCon(messages, sender, modelConfig.wenxinModelConfig, modelConfig.modelName)
            }
        } catch (error) {
            await chrome.tabs.sendMessage(sender.tab.id, {
                action: 'configError',
                data: error
            })
        }
    }
})
import { ApiConfig } from '@/api/config'

const findModelPath = (modelName) => {
    const modelPath = Object.values(ApiConfig).find(item => item.name === modelName)?.path
    return modelPath
}

const handleResult = async (value, sender, lastResultIndex, reject) => {
    const decoder = new TextDecoder('utf-8')
    const responseString = decoder.decode(value)
    // 按api接口格式截取字符串后转换成数组
    const jsonStringArray = responseString.split('data:')
    if (jsonStringArray.length > 1) {
        const { output: { text } } = JSON.parse(jsonStringArray[1])
        // 适应content message组件的文字递增模式进行改造，截取每次新增的字符串作为chrome消息传递内容
        const removedContent = text.substring(lastResultIndex)
        if (removedContent) {
            await chrome.tabs.sendMessage(sender.tab.id, {
                action: 'websocketMessage',
                data: removedContent
            })
        }
        return text.length
    } else {
        reject('No result, Please check your model config')
    }
}

const chatWithTongyi = (messages, sender, apiKey, modelName) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(findModelPath(modelName), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                    'X-DashScope-SSE': 'enable'
                },
                body: JSON.stringify({
                    model: modelName,
                    input: {
                        messages
                    }
                })
            })
            const responseReader = response.body.getReader()
            // 记录上次回答的长度以在后续步骤进行新增字符串切割
            let lastResultIndex = 0
            while (true) {
                const { done, value } = await responseReader.read()
                if (done) break
                lastResultIndex = await handleResult(value, sender, lastResultIndex, reject)
            }
        } catch (error) {
            reject(error)
        }
    })
}

export const tongyiChat = async (messages, sender, tongyiModelConfig, modelName) => {
    try {
        const { apiKey } = tongyiModelConfig
        await chatWithTongyi(messages, sender, apiKey, modelName)
    } catch (error) {
        await chrome.tabs.sendMessage(sender.tab.id, {
            action: 'configError',
            data: String(error)
        })
    }
}
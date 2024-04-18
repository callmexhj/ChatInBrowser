import { ApiConfig } from '@/api/config'

const getAccessTokenUrl = 'https://aip.baidubce.com/oauth/2.0/token'

const findModelPath = (modelName) => {
    const modelPath = Object.values(ApiConfig).find(item => item.name === modelName)?.path
    return modelPath
}

const buildAccessTokenFetchUrl = (apiKey, apiSecret) => {
    return `${getAccessTokenUrl}?grant_type=client_credentials&client_id=${apiKey}&client_secret=${apiSecret}`
}

const buildChatUrl = (accessToken, modelName) => {
    const baseUrl = findModelPath(modelName)
    const chatUrl = `${baseUrl}?access_token=${accessToken}`
    return chatUrl
}

// 获取文心一言API所需的AccessToken
const getAccessToken = (apiKey, apiSecret) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(buildAccessTokenFetchUrl(apiKey, apiSecret), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const responseData = await response.json()
            if (responseData.access_token) resolve(responseData.access_token)
            else reject('network error')
        } catch (error) {
            reject(error)
        }
    })
}

const handleResult = (value, sender) => {
    const decoder = new TextDecoder('utf-8')
    const responseString = decoder.decode(value)
    // 按api接口格式截取字符串后转换成数组
    const jsonStringArray = responseString.split('data:')
    jsonStringArray.forEach(jsonString => {
        if (jsonString) {
            const { result } = JSON.parse(jsonString)
            if (result) {
                chrome.tabs.sendMessage(sender.tab.id, {
                    action: 'websocketMessage',
                    data: result
                })
            }
        }
    })
}

// 对话核心函数
const chatWithWenxin = (messages, sender, accessToken, modelName) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(buildChatUrl(accessToken, modelName), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    messages: messages,
                    stream: true
                })
            })
            const responseReader = response.body.getReader()
            while (true) {
                const { done, value } = await responseReader.read()
                if (done) break
                handleResult(value, sender)
            }
        } catch (error) {
            reject(error)
        }
    })
}

export const wenxinCon = async (messages, sender, wenxinModelConfig, modelName) => {
    try {
        const { apiKey, apiSecret } = wenxinModelConfig
        const accessToken = await getAccessToken(apiKey, apiSecret)
        await chatWithWenxin(messages, sender, accessToken, modelName)
    } catch (error) {
        await chrome.tabs.sendMessage(sender.tab.id, {
            action: 'configError',
            data: String(error)
        })
    }
}
import CryptoJS from 'crypto-js'
import { ApiConfig } from '../api/config'
import { genPromptText } from './genPromptText'

const APPID = '3aa2ba1f'
const API_SECRET = 'ODZmNDFlODE4ZjEyNWNmYTBlMmE1MjMw'
const API_KEY = '4b4fb8e0d97bac047ba5ca89dafadd81'

// 链接配置
const sparkUrl = ApiConfig.spark3_5.path
const modelDomain = ApiConfig.spark3_5.domain
const pathName = new URL(sparkUrl).pathname

var total_res = ""
let ttsWS = null
async function result(resultData, sender) {
    const jsonData = JSON.parse(resultData)
    const { payload: { choices: { text } } } = jsonData
    const addText = text[text.length - 1].content
    chrome.tabs.sendMessage(sender.tab.id, {
        action:'websocketMessage',
        data: addText
    })
    // 提问失败
    if (jsonData.header.code !== 0) {
        console.log(`提问失败: ${jsonData.header.code}:${jsonData.header.message}`)
        console.error(`${jsonData.header.code}:${jsonData.header.message}`)
        return
    }
    if (jsonData.header.code === 0 && jsonData.header.status === 2) {
        ttsWS.close()
    }
}
function getWebsocketUrl() {
    return new Promise((resolve, reject) => {
        var apiKey = API_KEY
        var apiSecret = API_SECRET
        var url = sparkUrl
        var host = location.host
        var date = new Date().toGMTString()
        var algorithm = 'hmac-sha256'
        var headers = 'host date request-line'
        var signatureOrigin = `host: ${host}\ndate: ${date}\nGET ${pathName} HTTP/1.1`
        var signatureSha = CryptoJS.HmacSHA256(signatureOrigin, apiSecret)
        var signature = CryptoJS.enc.Base64.stringify(signatureSha)
        var authorizationOrigin = `api_key="${apiKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`
        var authorization = btoa(authorizationOrigin)
        url = `${url}?authorization=${authorization}&date=${date}&host=${host}`
        resolve(url)
    })
}

function connectWebSocket(messageArray, sender) {
    return getWebsocketUrl().then(url => {
        ttsWS = new WebSocket(url)
        ttsWS.onopen = e => {
            webSocketSend(messageArray)
        }
        ttsWS.onmessage = e => {
            result(e.data, sender)
        }
        ttsWS.onerror = e => {
            console.log('WebSocket报错，请f12查看详情')
            console.error(`详情查看：${encodeURI(url.replace('wss:', 'https:'))}`)
        }
        ttsWS.onclose = e => {
            console.log(e)
        }
    })
}

function webSocketSend(messageArray) {
    var params = {
        "header": {
            "app_id": APPID,
            "uid": "fd3f47e4-d"
        },
        "parameter": {
            "chat": {
                "domain": modelDomain
            }
        },
        "payload": {
            "message": {
                "text": [...messageArray]
            }
        }
    }
    console.log(params)
    ttsWS.send(JSON.stringify(params))
}

function start() {
    total_res = ""; // 请空回答历史
}
chrome.runtime.onMessage.addListener(async ({ action, data }, sender, sendResponse) => {
    if (action === 'search') {
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
        await connectWebSocket(messages, sender)
    }
})
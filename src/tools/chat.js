import CryptoJS from 'crypto-js'
import { ApiConfig } from '../api/config'

let APPID = null
let API_SECRET = null
let API_KEY = null

// 链接配置
let sparkUrl = null
let modelDomain = null
let pathName = null

var total_res = ""
let ttsWS = null

const initModel = (modelConfig) => {
    APPID = modelConfig.appId
    API_SECRET = modelConfig.apiSecret
    API_KEY = modelConfig.apiKey
    sparkUrl = modelConfig.path
    modelDomain = modelConfig.domain
    pathName = new URL(sparkUrl).pathname
}
async function result(resultData, sender) {
    const jsonData = JSON.parse(resultData)
    // 提问失败
    if (jsonData.header.code !== 0) {
        const errorMessage = `${jsonData.header.code}:${jsonData.header.message}`
        await chrome.tabs.sendMessage(sender.tab.id, {
            action: 'configError',
            data: errorMessage
        })
        return
    }
    console.log(jsonData)
    const { payload: { choices: { text } } } = jsonData
    const addText = text[text.length - 1].content
    chrome.tabs.sendMessage(sender.tab.id, {
        action: 'websocketMessage',
        data: addText
    })
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

export const connectSparkWebSocket = (messageArray, sender, modelConfig) => {
    initModel(modelConfig)
    return getWebsocketUrl().then(url => {
        ttsWS = new WebSocket(url)
        ttsWS.onopen = e => {
            webSocketSend(messageArray)
        }
        ttsWS.onmessage = e => {
            result(e.data, sender)
        }
        ttsWS.onerror = async e => {
            console.log('WebSocket报错，请f12查看详情')
            await chrome.tabs.sendMessage(sender.tab.id, {
                action: 'configError',
                data: 'WebSocket报错，请f12查看详情'
            })
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

import { has } from "markdown-it/lib/common/utils.mjs"
import OpenAI from "openai"

export const deepseekChatFunc = async (messages, sender, deepseekModelConfig, modelName) => {
    try {
        const openai = new OpenAI({
            baseURL: 'https://api.deepseek.com',
            apiKey: deepseekModelConfig.apiKey,
            dangerouslyAllowBrowser: true,
            timeout: 5000
        })
        const completion = await openai.chat.completions.create({
            model: modelName,
            messages,
            stream: true
        })
        for await (const chunk of completion) {
            if (chunk.choices) {
                chrome.tabs.sendMessage(sender.tab.id, {
                    action: 'websocketMessage',
                    data: chunk.choices[0].delta.content,
                    reasoningContent: chunk.choices[0].delta?.reasoning_content,
                    hasReasoningContent: modelName === 'deepseek-reasoner'
                })
            }
        }
    } catch (error) {
        console.log(error)
        await chrome.tabs.sendMessage(sender.tab.id, {
            action: 'configError',
            data: String(error)
        })
    }
}
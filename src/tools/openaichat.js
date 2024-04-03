import OpenAI from "openai"

export const chatFunc = async (messages, sender, openAiModelConfig) => {
    try {
        const openai = new OpenAI({
            apiKey: openAiModelConfig.apiKey,
            dangerouslyAllowBrowser: true
        })
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages,
            stream: true,
        })
        for await (const chunk of completion) {
            if (chunk.choices) {
                chrome.tabs.sendMessage(sender.tab.id, {
                    action: 'websocketMessage',
                    data: chunk.choices[0].delta.content
                })
            }
        }
    } catch (error) {
        await chrome.tabs.sendMessage(sender.tab.id, {
            action: 'configError',
            data: String(error)
        })
    }
}
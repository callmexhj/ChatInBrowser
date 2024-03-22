import '../tools/chat'

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
            action:'userCopy',
            data: info.selectionText
        })
    }
})
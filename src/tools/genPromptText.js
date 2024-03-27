export const genPromptText = (searchValue, copyValue) => {
    let content = `我复制了一段文字：${copyValue}，我的问题是：${searchValue}`
    if (copyValue === '') {
        content = searchValue
    }
    return content
}
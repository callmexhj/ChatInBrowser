export const zh = {
    popup: {
        model: {
            title: '模型设置',
            saveButton: '保存配置',
            placeholder: {
                model: '请选择模型',
                others: '请输入{0}'
            },
            changeInfo: '保存成功',
            tour: {
                nextBtnText: '下一步',
                prevBtnText: '上一步',
                finalBtnText: '知道啦',
                modelVersionTitle: '模型版本',
                modelVersionValue: '在此可以选择模型版本',
                modelConfigTitle: '模型配置',
                modelConfigValue: '在此可以配置模型供应商要求提供的各项参数（具体可查看模型API文档）',
                saveModelTitle: '保存配置',
                saveModelValue: '点击此按钮可以保存模型配置',
            }
        },
        system: {
            title: '系统设置',
            mask: {
                title: '角色面具',
                changeInfo: '面具保存成功',
                maskList: {
                    commonLabel: '通用助手',
                    translatorLabel: '翻译家',
                    programmerLabel: '程序员',
                    writerLabel: '作家'
                }
            },
            primaryColor: {
                title: '主题色',
                changeInfo: '主题色保存成功'
            },
            language: {
                title: '语言',
                changeInfo: '语言保存成功'
            },
            icoColor: {
                title: '悬浮球设置',
                changeInfo: '悬浮球保存成功',
                optTitle: '透明度',
                demoTitle: '悬浮球预览',
                colorMode: {
                    title: '十六进制颜色',
                    placeholder: '例如：#292929'
                },
                pictureMode: {
                    button: '选择图片'
                },
                icoModeRadio: {
                    colorMode: '纯色模式',
                    pictureMode: '图片模式'
                },
                changeInfo: '悬浮球保存成功'
            },
            tour: {
                nextBtnText: '下一步',
                prevBtnText: '上一步',
                finalBtnText: '知道啦',
                maskTitle: "修改角色面具",
                maskValue: "你可以通过修改角色，使用不同的Prompt来控制大语言模型输出更加符合您需求的回答",
                primaryColorTitle: '修改主题色',
                primaryColorValue: '可以点击下拉框选择插件的主题颜色',
                languageTitle: '修改插件语言',
                languageValue: '可以点击单选框来选择插件的语言',
                floatBallTitle: '修改悬浮球外观',
                floatBallValue: '此处可以修改悬浮球的外观'
            }
        },
        more: {
            title: '更多',
            buttons: {
                aboutExt: '关于项目',
                projectHome: '项目主页',
                createIssue: '一起改进'
            },
            modalInfo: {
                title: '关于项目',
                content: '如果您喜欢这个插件，请前往Gitgub主页点击star支持我吧',
                okText: '知道了'
            }
        }
    },
    content: {
        inputContent: {
            placeholder: '按shift+enter快捷发送',
            inputTip: '请输入搜索内容'
        },
        messageContent: {
            copyTitle: '点击复制',
            copySuccessInfo: '复制成功'
        },
        topButtonGroup: {
            tooltipTitle: '请点击插件图标进行设置'
        },
        defaultCopyValue: '可复制网页文字作为搜索内容',
        clearConfirmModal: {
            title: '此操作将清除ChatInBrowser的历史记录，请确认是否继续',
            okText: '确认',
            cancelText: '取消'
        },
        updateMask: {
            title: '面具更新',
            content: '面具已经更新，立刻使用新面具将会清空历史对话',
            okText: '立即使用',
            cancelText: '稍后使用'
        },
        defaultAssistantMessage: '分析中...',
        tour: {
            nextBtnText: '下一步',
            prevBtnText: '上一步',
            finalBtnText: '知道啦',
            clearButtonTitle: '清除按钮',
            clearButtonValue: '点击此按钮可以清除所有聊天记录。',
            closeButtonTitle: '缩小按钮',
            closeButtonValue: '点击此按钮可以最小化聊天框。',
            copyValueTitle: '选中内容',
            copyValueValue: '在网页中选择中一段文字后，可以点击鼠标右键菜单中的Chat In Browser,将该段文本作为大模型提示的一部分作为输入。',
            inputBoxTitle: '输入框',
            inputBoxValue: '在这可以输入你想和大模型交流的内容，按右边的按钮发送。同时你也可以使用键盘快捷键shift+enter来快速发送。'
        }
    }
}
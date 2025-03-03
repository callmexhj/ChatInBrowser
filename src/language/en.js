export const en = {
    popup: {
        model: {
            title: 'model setup',
            saveButton: 'Save configuration',
            placeholder: {
                model: 'please choose the model',
                others: 'please input {0}'
            },
            changeInfo: 'Saved successfully',
            tour: {
                nextBtnText: 'Next',
                prevBtnText: 'Previous',
                finalBtnText: 'Got it',
                modelVersionTitle: 'Model Version',
                modelVersionValue: 'You can select the model version here',
                modelConfigTitle: 'Model Configuration',
                modelConfigValue: 'You can configure various parameters required by the model provider here (refer to the model API documentation for specifics)',
                saveModelTitle: 'Save Configuration',
                saveModelValue: 'Click this button to save the model configuration',
            }            
        },
        system: {
            title: 'system setup',
            mask: {
                title: 'Mask',
                changeInfo: 'Saved successfully',
                maskList: {
                    commonLabel: "Common Assistant",
                    translatorLabel: "Translator",
                    programmerLabel: "Programmer",
                    writerLabel: "Writer"
                }
            },
            primaryColor: {
                title: 'Primary Color',
                changeInfo: 'Saved successfully'
            },
            language: {
                title: 'Language',
                changeInfo: 'Saved successfully'
            },
            icoColor: {
                title: 'Floating Ball Setting',
                changeInfo: 'Saved successfully',
                optTitle: 'Opacity',
                demoTitle: 'Floating Ball Preview',
                colorMode: {
                    title: 'Hex Color',
                    placeholder: 'Example: #292929'
                },
                pictureMode: {
                    button: 'Select Image'
                },
                icoModeRadio: {
                    colorMode: 'Color Mode',
                    pictureMode: 'Picture Mode'
                },
                changeInfo: 'Saved successfully'
            },
            tour: {
                nextBtnText: 'Next',
                prevBtnText: 'Previous',
                finalBtnText: 'Got it',
                maskTitle: "Change Mask",
                maskValue: "You can control the output of the large language model more closely to your needs by changing the role and using different prompts.",
                primaryColorTitle: "Change Theme Color",
                primaryColorValue: "You can click on the dropdown to select the plugin's theme color.",
                languageTitle: "Change Plugin Language",
                languageValue: "You can click on the radio button to select the plugin's language.",
                floatBallTitle: "Modify Float Ball Appearance",
                floatBallValue: "Here you can modify the appearance of the float ball."
            }
        },
        more: {
            title: 'more',
            buttons: {
                aboutExt: 'About project',
                projectHome: 'Project home page',
                createIssue: 'Improve together'
            },
            modalInfo: {
                title: 'About project',
                content: 'If you like this extension, you can consider going to the Gitgub homepage and clicking star to support me.',
                okText: 'Got it'
            }
        }
    },
    content: {
        inputContent: {
            placeholder: 'Shift + enter to send',
            inputTip: 'Please enter search content'
        },
        messageContent: {
            copyTitle: 'Click to copy',
            copySuccessInfo: 'Copied successfully',
            modelVersionTitle: '· From'
        },
        topButtonGroup: {
            tourTitle: 'Please click the plugin icon to configure',
            clearTitle: 'Click to clear all records',
            closeTitle: 'Click to minimize the chat box'
        },        
        defaultCopyValue: 'Web page text can be copied as search content',
        clearConfirmModal: {
            title: 'This operation will clear the history of ChatInBrowser, please confirm whether to continue.',
            okText: 'Confirm',
            cancelText: 'Cancel'
        },
        updateMask: {
            title: 'Mask Update',
            content: 'The mask has been updated. Using the new mask immediately will clear the history of conversations.',
            okText: 'Use Now',
            cancelText: 'Use Later'
        },
        defaultAssistantMessage: 'Analyzing...',
        thoughtContent: 'Thought content',
        tour: {
            nextBtnText: 'Next',
            prevBtnText: 'Previous',
            finalBtnText: 'Got it',
            clearButtonTitle: 'Clear Button',
            clearButtonValue: 'Clicking this button clears all chat records.',
            closeButtonTitle: 'Minimize Button',
            closeButtonValue: 'Clicking this button minimizes the chat box.',
            copyValueTitle: 'Selected Content',
            copyValueValue: 'After selecting a piece of text on the webpage, you can click on the "Chat In Browser" option in the right-click menu to use that text as part of the input for the large model prompt.',
            inputBoxTitle: 'Input Box',
            inputBoxValue: 'You can input the content you want to communicate with the large model here and send it by clicking the button on the right. You can also use the keyboard shortcut Shift+Enter to send quickly.'
        }
    }
}
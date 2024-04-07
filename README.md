![logo](markdown/chatIco64.png)
# ChatInBrowser
### <u>[English Document](README.en.md)</u>
ChatInBrowser可以让你在浏览器随时使用大模型进行聊天，更支持直接复制网页内容作为Prompt的一部分进行提问。
## 开发步骤
### 1. 移动至项目根目录
```bash
cd your_path/ChatInBrowser
```
### 2. 安装依赖
```bash
yarn install
```
### 3. 打包项目
```bash
yarn build
```
### 4. 调试Popup页面
由于部分接口不支持在浏览器环境运行，故该调试方法仅适用于UI界面的调试。功能和接口层面的调试建议打包项目后前往[chrome://extensions/](chrome://extensions/)进行。
```bash
yarn dev
```
浏览器打开调试链接[http://localhost:5173/](http://localhost:5173/)
## 安装流程
### 1. 克隆Github仓库
```bash
git clone https://github.com/callmexhj/ChatInBrowser.git
```
### 2. 安装Chrome插件
- 打开Chrome浏览器。
- 在地址栏中输入 chrome://extensions/ 并按下回车键。
- 在右上角开发者模式下勾选。
- 点击“加载已解压的扩展程序”按钮。
- 选择项目中的build文件夹。
- 点击“打开”按钮。
### 3. 检查插件是否安装成功
- 确保插件图标出现在Chrome浏览器的工具栏或扩展程序页面中。
- 建议点击固定按钮 ![fix](markdown/fixformd.png) 将插件固定在工具栏以方便日常设置和使用。
## 模型配置
目前仅支持科大讯飞星火模型v1.5, v2.0, v3.1和v3.5等四个模型，后期将新增更多模型的支持。
### 科大讯飞星火模型配置
#### 1. 注册科大讯飞星火模型账号，并申请API接入权限
#### 2. 申请开通对应版本的模型权限（新用户可获得免费Token）
#### 3. 在浏览器右上角Popup界面-模型设置中，选择模型版本
![popup step_3](markdown/popup_step3.png)
#### 4. 分别填入控制台提供的APPID，APISecret和APIKey后点击保存配置
![popup step_4](markdown/popup_step4.png)
## 模型使用示例
在完成模型配置后，可以进行模型使用。
### 1. 直接聊天
![using demo1](markdown/usingdemo1.png)
### 2. 选取网页文本后提问
- 选取文本后，点击鼠标右键-ChatInBrowser

    ![using demo2](markdown/usingdemo2.png)

- 在自动打开的聊天框中，提出问题

    ![using demo3](markdown/usingdemo3.png)

### 3. 其他功能
- 一键清空对话

    ![using demo4](markdown/usingdemo4.png)

- 系统设置

    ![using demo5](markdown/usingdemo5.png)

- 一键复制

    ![using demo6](markdown/usingdemo6.png)

- 支持主题色改变，国际化等能力

- 其他功能等你探索，正在不断迭代中

## 一起优化这个项目
欢迎大家提出ISSUE或者提交代码来改进这个项目！

## 更新记录
2024-4-7 支持DIY悬浮球外观
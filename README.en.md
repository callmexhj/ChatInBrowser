![logo](markdown/chatIco64.png)
# ChatInBrowser
### <u>[Chinese Document](README.md)</u>

ChatInBrowser allows you to chat anytime in your browser using a large model, and it even supports directly copying web content as part of the Prompt for querying.

## Development Steps
### 1. Navigate to the Project Root Directory
```bash
cd your_path/ChatInBrowser
```
### 2. Install Dependencies
```bash
yarn install
```
### 3. Build the Project
```bash
yarn build
```
### 4. Debug Popup Page
Due to some interfaces not supporting browser environment, this debugging method is only applicable to UI interface debugging. It is recommended to package the project and then go to [chrome://extensions/](chrome://extensions/) for functionality and interface-level debugging.
```bash
yarn dev
```
Open the debug link in the browser [http://localhost:5173/](http://localhost:5173/)

## Installation Process
### 1. Clone the Github Repository
```bash
git clone https://github.com/callmexhj/ChatInBrowser.git
```
### 2. Install Chrome Extension
- Open Chrome browser.
- Enter chrome://extensions/ in the address bar and press Enter.
- Enable Developer mode in the top right corner.
- Click on the "Load unpacked" button.
- Select the build folder in the project.
- Click "Open".
### 3. Check if the plugin is installed successfully
- Ensure that the plugin icon appears in the Chrome browser toolbar or extension page.
- It is recommended to click the pin button ![fix](markdown/fixformd.png) to pin the plugin to the toolbar for daily settings and usage.

## Model Configuration
Currently, only the models of iFLYTek Starfire v1.5, v2.0, v3.1, and v3.5 are supported, and more models will be added in the future.

### Configuration of iFLYTek Starfire Model
#### 1. Register an iFLYTek Starfire Model account and apply for API access permission.
#### 2. Apply for access to the corresponding version of the model (new users can get free tokens).
#### 3. In the Popup interface in the upper right corner of the browser, select the model version in the model settings.
![popup step_3](markdown/popup_step3.png)
#### 4. Fill in the provided APPID, APISecret, and APIKey in the console, then click Save Configuration.
![popup step_4](markdown/popup_step4.png)

## Model Usage Example
After completing the model configuration, you can use the model.

### 1. Chat Directly
![using demo1](markdown/usingdemo1.png)

### 2. Ask Questions After Selecting Web Page Text
- After selecting text, right-click and select ChatInBrowser.

    ![using demo2](markdown/usingdemo2.png)

- In the automatically opened chat box, ask your question.

    ![using demo3](markdown/usingdemo3.png)

### 3. Other Functions
- One-click Clear Dialogue

    ![using demo4](markdown/usingdemo4.png)

- System Settings

    ![using demo5](markdown/usingdemo5.png)

- One-click Copy

    ![using demo6](markdown/usingdemo6.png)

- Support for changing theme colors, internationalization, and other capabilities.

- Explore other features, continuously iterating.

## Let's Optimize This Project Together
Welcome everyone to raise issues or submit code to improve this project!
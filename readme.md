## 项目简介
一个简单的express后台项目
使用了websocket功能

## 部署步骤
### 添加全局依赖
npm install express-generator -g
### 初始化服务器
express socket-server
### 添加依赖 
npm install socket.io --save
npm install cors --save
npm install body-parser --save
### 安装依赖
npm install
### 后续部署
全局启用cors（app.js）
新建socket文件夹存放websocket接口并在www中调用
在routes中设计http接口
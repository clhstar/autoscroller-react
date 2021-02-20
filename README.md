## autoscroller-react 组件

autoscroller-react 使用 React 和 typescript 开发 实现自动滚动功能

### 安装

```javascript
npm install autoscroller-react --save
```

### React 版本兼容

```javascript
    "react": ">=16.0.0",
    "react-dom": ">=16.0.0"
```

### 浏览器兼容

Chrome 分辨率需调至 100%

### 使用

```javascript
// 引入组件
import { AutoScroll } from "autoscroller-react";

<AutoScroll ref={(r) => (this.autoScroll = r)} component={<img src={logo} alt="logo" />} height={400} />;
//异步请求数据完成时需要手动注册滚动
this.autoScroll.registerAutoRun();
```

Api

| 参数           | 说明           |       类型       | 默认值  |
| -------------- | -------------- | :--------------: | :-----: |
| component      | 组件           |   reactElement   |   无    |
| speed          | 滚动速度       |      number      |    1    |
| height         | 高             | string or number |  100%   |
| mouseOverPause | 鼠标浮停       |     Boolean      |  true   |
| delayLoad      | 第一次延迟加载 |    number(ms)    | 500(ms) |

### 一些本地开发命令

```bash
//启动本地环境
npm run start

//build可发布静态文件
npm run build

//发布到 npm
npm run publish
```

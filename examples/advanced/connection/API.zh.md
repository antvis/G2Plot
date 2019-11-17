---
title: API
---

## stateManager - 状态管理机

stateManager 是一个可插拔的抽象中间层，主要负责三件事：(1). 状态量的存储 （2). 状态量的更新和更新事件的分发   （3). 获取状态量。

stateManager 可用于多个图表之间，以及图表与外部组件的联动。g2plot 提供`bindStateManager()`方法用以将 stateManager 实例绑定到图表。

### stateManager 的创建与使用

新建一个 stateManager 实例：

```typescript
import { StateManager } from '@antv/g2plot';

const stateManager = new StateManager();
```

#### setState(name,exp)

设置和更新状态量。

`name: string`  状态量名字<br />
`exp: string | number | function`    状态量条件，可以设为一个值或回调函数

#### getState(name)

获取状态量。

`name: string`  状态量名字

#### getAllState()

获取 stateManager 存储的当前所有状态量。

#### clear()

清空状态量。

### 将 stateManager 绑定到图表

图表支持 bindStateManager 方法，将一个 stateManager 实例绑定到图表，并传入相应的配置项。一个 stateManager 实例可以绑定到多个图表，从而支持多图表联动。

#### bindStateManager(cfg)

可配置属性如下：

- `setState`:  更新状态量 <br/>
  `event:string`:  可选，指定 event 时，状态量的更新由事件驱动，如不指定，则直接更新 stateManager 中的状态量<br />
  `state`: 要更新的状态量 name 和 value，支持函数式<br />
  `state: function`   通过回调函数设置状态量条件<br />
  `state: { name: string, exp: string | number }`  设置单值的状态量条件，name 一般为图表数据中的字段名称，exp 为单值数据<br />
  `state: { name: string, exp: function }`   设置多值的状态量，name 一般为图表数据中的字段名称，exp 为一个回调函数

- `onStateChange`:  状态量更新时如何响应 <br/>
  `name:string`:  状态量的名字  <br />
  `callback: function`: 状态量更新后图表如何响应

代码示例：

```typescript
plot.bindStateManager(manager,{
  setState:[
    {
      event:'column:click',
      state: {name:'xxx',exp } || ()=>{}
    }
  ],
  onStateChange: [
    {
      name:'xxx',
      callback:()=>{}
    }
  ]
});
```


- Modern browsers and Internet Explorer 9+ (with [polyfills](https:// ant.design/docs/react/getting-started#Compatibility))
- Server-side Rendering
- [Electron](http:// electron.atom.io/)

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http:// godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png" alt="Electron" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Electron |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IE9, IE10, IE11, Edge                                                                                                                                                                                            | last 2 versions                                                                                                                                                                                                   | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                           | last 2 versions                                                                                                                                                                                                       |

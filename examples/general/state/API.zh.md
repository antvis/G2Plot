---
title: API
---

## 状态量

<br/>
状态量被用于驱动图表内各元素元子级的 UI 状态变化。在 g2plot 中，元子级 UI 状态是可以枚举的，共有以下四种：

- 图形 default 状态：`normal`
- 图形高亮：`active`
- 图形置灰：`disable`
- 图形选中：`selected`

UI 状态的变化是数据驱动的，能够响应状态量的图表元素记录所对应的数据，而状态量本身是一个数据判断条件。当图表元素对应的数据符合状态量的判断条件时，它的 UI 就会切换到状态量所对应的图形样式。

## 状态量的使用

### 快捷方法

g2plot 提供了状态量变化的快捷方法：`setActive()`  `setDisable()`  `setSelected()` `setNormal()`

#### setActive(condition,style?)

`condition`: function | object  设置状态量的条件<br/>
`condition: function`  通过回调函数设置状态量条件<br/>
`condition: { name: string, exp: string | number }`  设置单值的状态量条件，name 一般为图表数据中的字段名称，exp 为单值数据<br/>
`condition: { name: string, exp: function }` 设置多值的状态量，name 一般为图表数据中的字段名称，exp 为一个回调函数

`style: object`  可选，设置状态量驱动的 UI 样式。如不配置，则会默认去取 theme 中的状态样式。

代码示例：

```typescript
// 通过回调函数设置状态量
plot.setActive((shapeData) => {
  return shapeData.type !== 'a';
});

// 设置单值状态量
plot.setActive({ name: 'type', exp: 'a' });

// 设置多值状态量
plot.setActive({
  name: 'type',
  exp: (value) => {
    return value !== 'a';
  },
});

// 设置状态量样式
plot.setActive({ name: 'type', exp: 'a' }, { stroke: 'black', lineWidth: 2 });
```

#### setDisable(condition,style?)

配置项与用法同 setActive。

#### setSelected(condition,style?)

配置项与用法同 setActive。

#### setNormal(condition)

清空状态样式，使图表元素回到 default 状态。g2plot 会记录图表元素的 default 样式，因此不需另外配置 style。

用法同 setActive。

### 初始化设置

通过`defaultState`配置项配置图表初始化时的状态。

#### defaultState: object

`active: object`<br />
`condition: { name: string, exp: string | number | function }`  设置状态量条件<br />
`related: string[]`  设置同状态量联动的组件，如 axis、label、tooltip 等<br />

`disable: object`    用法同 active<br />
`selected: object`    用法同 active<br />

用法：

```typescript
defaultState:{
    active:{
      condition:{
        name: 'value',
        exp: 5
      },
      related: ['axis','label']
    },
    disable:{
      condition: {
        name: 'type',
        exp: (d)=>{
          return d !== 'a';
        }
      },
      related: ['tooltip','label','axis']
    }
}
```

### 在图表主题中定义状态样式

```typescript
plot.registerTheme('line', {
  lineStyle: {
    normal: {} | Function,
    active: {} | Function,
    disable: {} | Function,
    selected: {} | Function,
  },
});
```

- Modern browsers and Internet Explorer 9+ (with [polyfills](https:// ant.design/docs/react/getting-started#Compatibility))
- Server-side Rendering
- [Electron](http:// electron.atom.io/)

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http:// godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png" alt="Electron" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Electron |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IE9, IE10, IE11, Edge                                                                                                                                                                                            | last 2 versions                                                                                                                                                                                                   | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                           | last 2 versions                                                                                                                                                                                                       |

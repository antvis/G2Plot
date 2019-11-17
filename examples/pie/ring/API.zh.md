---
title: API
---

说明： **required** 标签代表生成图表的必选配置项，**optional** 标签代表生成图表的可选配置项。

### 特殊配置

#### innerRadius: number

**optional**

环图的内环半径，原点为画布中心。半径和内环半径决定了环图的厚度 (thickness)。

配置范围为 [0,1]，0 代表环图被完全填充，变为饼图，没有中心挖空部分，1 代表环图的厚度为 0。默认值为 0.8。

#### annotation

**optional**

图表的辅助标注

##### centralText

中心文本

`content: string|object`  中心文本内容

用户可以指定一段文字(此时中心文本单行显示)或一组数据(此时中心文本分两行显示)，指定数据时需采用`{ name:xxx, value:xxx }`的格式。如不配置 content，则默认显示第一行数据。

`htmlContent: string` 自定义中心文本

用户可以根据 htmlContent 方法的 data 参数定义中心文本 dom 节点的构成和显示方式。

`onActive: boolean` 是否自动响应鼠标交互

当设置为 true 时，鼠标滑过弧形切片时中心文本显示当前弧形切片内容，此时 tooltip 默认不再显示。

用法：

```typescript
annotation: [
  {
    type: 'centralText',
    onActive: true,
  },
];
```

### 通用图表配置

#### title

**optional** 见[通用图表配置](../../../../zh/docs/manual/general-config#title)。

#### description

**optional** 见[通用图表配置](../../../../zh/docs/manual/general-config#description)。

#### width

**optional** 见[通用图表配置](../../../../zh/docs/manual/general-config#width)。

#### height

**optional** 见[通用图表配置](../../../../zh/docs/manual/general-config#height)。

#### forceFit

**optional** 见[通用图表配置](../../../../zh/docs/manual/general-config#forceFit)。

#### padding

**optional** 见[通用图表配置](../../../../zh/docs/manual/general-config#padding)。

#### theme

**optional** 见[通用图表配置](../../../../zh/docs/manual/general-config#theme)。

### tooltip

**optional** 见[通用图表配置](../../../../zh/docs/manual/general-config#tooltip)。

### legend

**optional** 见[通用图表配置](../../../../zh/docs/manual/general-config#legend)。

---

## 与饼图相同的配置

#### data: collection

**required**

数据源为对象集合，例如：[{ segment: 分类一，value: 20 }, { segment: 分类二，value: 20 }]。

#### radius: number

**optional**

饼图的半径，原点为画布中心。配置值域为[0,1]，0 代表饼图大小为 0，即不显示，1 代表饼图撑满绘图区域。默认值为 0.8, 即 `width / 2 * 0.8`。

#### angleField: string

**required**

扇形切片大小（弧度）所对应的数据字段名。

#### colorField: string

**optional**

扇形切片颜色所对应的数据字段名。

#### color: string | string[] | function

**optional**

指定切片颜色。如不进行配置则采用 theme 中的配色。

#### label

**optional**

`visible: boolean`    图形标签是否显示<br />
`type: 'inner' | 'outer' | 'spider'`    图形标签的类型<br />
`formatter: function`  对 label 的显示文本进行格式化。

> 注意：当配置了 colorField，即扇形切片接受分类类型的颜色映射，此时 spider label 的文本为上下显示，此时 formatter 方法入参为 angleField 及 colorField 两个字段对应的值，返回值应为数组。

```typescript
label: {
  type: 'spider',
  formatter: (angleField, colorField) => {
    return ['value1','value2'];
  }
}
```

#### events

**optional**

- 图形事件

  `onPieClick: function`  图形点击事件<br />
  `onPieDoubleClick: function`    图形双击事件<br />
  `onPieMousemove: function`  图形鼠标移动事件<br />
  `onPieContextmenu: function`    图形右键事件<br />

- 其他事件类型见[通用图表配置](../../../../zh/docs/manual/general-config#events)。


- Modern browsers and Internet Explorer 9+ (with [polyfills](https:// ant.design/docs/react/getting-started#Compatibility))
- Server-side Rendering
- [Electron](http:// electron.atom.io/)

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http:// godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png" alt="Electron" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Electron |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IE9, IE10, IE11, Edge                                                                                                                                                                                            | last 2 versions                                                                                                                                                                                                   | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                           | last 2 versions                                                                                                                                                                                                       |

---
title: API
---

说明： **required** 标签代表生成图表的必选配置项，**optional** 标签代表生成图表的可选配置项。

### title

**optional** 见[通用图表配置](../../../../zh/docs/manual/general-config#title)。

### description

**optional** 见[通用图表配置](../../../../zh/docs/manual/general-config#description)。

### width

**optional** 见[通用图表配置](../../../../zh/docs/manual/general-config#width)。

### height

**optional** 见[通用图表配置](../../../../zh/docs/manual/general-config#height)。

### forceFit

**optional** 见[通用图表配置](../../../../zh/docs/manual/general-config#forceFit)。

### padding

**optional** 见[通用图表配置](../../../../zh/docs/manual/general-config#padding)。

### theme

**optional** 见[通用图表配置](../../../../zh/docs/manual/general-config#theme)。

### style:string

**optional**

'standard' | 'meter' | 'fan'
仪表盘不同类型集合，'standard' 为标准仪表盘，'meter' 为刻度仪表盘，'fan' 为扇形仪表盘

### data:number

**required**

数据源为对象集合，数据类型为 number。

### min:number

**optional**

仪表盘刻度最小值。默认为 0。

### max:number

**optional**

仪表盘刻度最大值。默认为 1。

### range:number[]

**optional**

仪表的色条范围区间，数组的前后两项组成的元组将对应一个颜色区间，例如：[0, 40, 60, 100]。

### label:number

**optional**

当 label 为 boolean 值时，为指示文字标签是否显示；

当 label 为一个 function 时，则该函数的两个入参分别是将要显示的数值 value，以及经过了格式化函数后的 formatted，该函数返回 html 字符串。

### formatter:number

**optional**

显示文字标签时对数值文本进行格式化的函数。该函数的入参为原本显示的数值。

示例如下：

```
format = (value) => `${value}%`;
```

- Modern browsers and Internet Explorer 9+ (with [polyfills](https:// ant.design/docs/react/getting-started#Compatibility))
- Server-side Rendering
- [Electron](http:// electron.atom.io/)

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http:// godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png" alt="Electron" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Electron |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IE9, IE10, IE11, Edge                                                                                                                                                                                            | last 2 versions                                                                                                                                                                                                   | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                           | last 2 versions                                                                                                                                                                                                       |

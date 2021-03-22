---
title: 坐标轴 - Axis
order: 1
---

`markdown:docs/styles/component.md`

🏷️  坐标轴指二维空间中统计图表中的轴，它用来定义坐标系中数据在方向和值的映射关系的图表组件。

🎨  前往墨者学院 [AntV 设计 | 坐标轴 Axis](https://www.yuque.com/mo-college/vis-design/twx9oi) 查看**设计指引**

#### 坐标轴组成

<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*o64XRZfivrEAAAAAAAAAAABkARQnAQ" alt="axis" class="component-img" />

#### 使用方式

坐标轴通常有 `xAxis`, `yAxis` 两种，会根据具体 `Plot` 有所差异。

<b>配置坐标轴有两种方式：</b>

第一种，传入 `false` 设置隐藏坐标轴。

```ts
xAxis: false; // 隐藏 x 轴
```

第二种，传入 _AxisCfg_ 对坐标轴进行整体配置。


```ts
xAxis: {
  text: 'x 轴标题'
}
```

#### 配置项 (_AxisCfg_)

`markdown:docs/common/axis.zh.md`
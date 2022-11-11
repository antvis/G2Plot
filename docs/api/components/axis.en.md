---
title: Axis
order: 1
contributors:
  [
    {
      author: '新茗',
      github: 'visiky',
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/KAeYPA3TV0/avatar.jpeg',
    },
     {
      author: 'BBSQQ',
      github: 'BBSQQ',
      avatar: 'https://avatars.githubusercontent.com/u/35586469',
    },
     {
      author: 'lxfu1',
      github: 'lxfu1',
      avatar: 'https://avatars.githubusercontent.com/u/31396322',
    },
  ]
---

<embed src="@/docs/styles/component.md"></embed>

🏷️  Coordinate axis refers to the axis of statistical chart in two-dimensional space, which is used to define the mapping relationship between **direction** and **value of data** in coordinate system.

🎨  Go to [AntV Design | 坐标轴 Axis](https://www.yuque.com/mo-college/vis-design/twx9oi) of 墨者学院 to learn more about **Design guide**.

#### Axes

![axis](https://gw.alipayobjects.com/zos/antfincdn/9%265Yc6tQuN/648d2019-aee9-4a17-8567-6bbc5910c38d.png)

#### Usage

There are two kinds of coordinate axes: `xAxis` and `yAxis`, which vary according to the specific `Plot`.

<b>There are two ways to configure axes: </b>

Method 1, pass in 'Boolean' to set whether to display a legend.

```ts
xAxis: false; // hide xAxis
```

Method 2, pass in _AxisCfg_ to configure the axis as a whole.

```ts
xAxis: {
  text: 'title of xAxis'
}
```

#### Properties - _AxisCfg_

<embed src="@/docs/common/axis.en.md"></embed>
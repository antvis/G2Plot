---
title: 坐标轴 - Axis
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

🏷️  坐标轴指二维空间中统计图表中的轴，它用来定义坐标系中数据在方向和值的映射关系的图表组件。

🎨  前往墨者学院 [AntV 设计 | 坐标轴 Axis](https://www.yuque.com/mo-college/vis-design/twx9oi) 查看**设计指引**

#### 构成元素

![axis](https://gw.alipayobjects.com/zos/antfincdn/9%265Yc6tQuN/648d2019-aee9-4a17-8567-6bbc5910c38d.png)

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

#### 配置属性 - _AxisCfg_

<embed src="@/docs/common/axis.zh.md"></embed>
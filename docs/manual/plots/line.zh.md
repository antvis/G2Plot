---
title: 折线图
order: 0
---

<div class="manual-docs">

# 设计指引

`markdown:examples/line/basic/design.zh.md`

# 快速上手

<playground path='line/basic/demo/line.ts' rid='rect1'></playground>

查看更多<a href="/zh/examples/line/basic" target='blank'>示例</a>.

## 配置项

折线图相关的配置参考 [API 文档](/zh/docs/api/plots/line)。

# 折线图特性

## 曲线图

曲线图是用曲线将一系列的数据点连接的图表。

<playground path='line/basic/demo/spline.ts' rid='rect2'></playground>

对应的只需要配置 `smooth: true` 属性即可。


## 阶梯型直线图

<playground path='line/step/demo/line.ts' rid='rect3'></playground>

对应的只需要配置 `stepType` 属性即可。

```ts
options: {
  stepType: 'vh' // 可选项：hv | vh | hvh | vhv
}
```

</div>
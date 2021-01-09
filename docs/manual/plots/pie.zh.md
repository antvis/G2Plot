---
title: 饼图
order: 6
---

<div class="manual-docs">

# 设计指引

`markdown:examples/pie/basic/design.zh.md`

# 快速上手

<playground path='pie/basic/demo/basic.ts' rid='rect1'></playground>

查看更多<a href="/zh/examples/pie/basic" target='blank'>示例</a>.

## 配置项

饼图相关的配置参考 [API 文档](/zh/docs/api/plots/pie)。

# 饼图特性

## 环图

在 G2Plot 中，只需要指定 `innerRadius` 就可以创建环形饼图

<playground path='pie/donut/demo/basic.ts' rid='rect2'></playground>

## 扇形图

通过设置饼图的 `startAngle`(开始角度) 和 `endAngle`(结束角度)，我们可以将饼图变成扇形图

<playground path='pie/basic/demo/quarter-circle.ts' rid='rect3'></playground>

</div>
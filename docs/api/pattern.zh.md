---
title: 贴图图案
order: 12
---

### 介绍

使用 Pattern 可以很有用地对相似的项目进行分组，例如，假设您想要构建一个显示各种食物的饼图，您可以使用颜色比例尺为每种食物指定一种唯一的颜色，然后您可以对蔬菜/水果/肉类/进行分组，为每组使用类似的 pattern（同时保持颜色）。

### 在 G2Plot 中使用 pattern

G2Plot 内置了 `'dot' ｜ 'line' | 'square'` 等若干贴图, 图案颜色默认从当前 element 继承。

<playground path="plugin/pattern/demo/pie-pattern.ts" rid="pie-pattern"></playground>

一些场景使用：

- [Demo1](/zh/examples/plugin/pattern#legend-marker-with-pattern): 图例(legend) marker 使用 pattern
- [Demo2](/zh/examples/plugin/pattern#bar-pattern): 通过回调设置不同的 pattern


<!-- 补充 案例说明 和 案例 -->

### API 说明

`markdown:docs/common/pattern.zh.md`

### 注意事项

请注意 pattern 的使用，目前有一些限制：

1. `svg` 的渲染方式下，暂不支持 pattern 图案填充
2. Tooltip, Legend 的 marker 使用的是依旧是纯颜色（plain color）. 对于 Legend marker 可以考虑使用回调的方式来设置，参考：[Demo](/zh/examples/plugin/pattern#pie-pattern-callback)
3. pattern 暂时不支持渐变色
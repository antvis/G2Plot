---
title: 贴图图案
order: 12
---

### 介绍
pattern 是附着在图形上的贴图样式。
- 我们内置了默认的、区分度较高的三种贴图：点、线、方形。在颜色区分度不高的图表中，pattern 能够作为「直观的、视觉上的分类属性」来区分每个项目，对色盲人士友好。
- 扩充颜色分组：pattern 还可以作为颜色的「补充项」。遇到和谐的颜色「不够用」、颜色占比小「区分不明显」等情况，pattern 可以帮助颜色扩充分类。
- 结合颜色分组：我们可以用 pattern 作为「组」，然后用颜色在该组下进行细粒度的分类。
- 程度分组：圆形和方形的大小、线的粗细可以用来表示「程度」。
- 突出重点、丰富表现力：pattern 不仅有「好看」的皮囊，还可以作为讲故事的「点睛之笔」，高亮某个项目。

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
2. pattern 默认继承元素（element）的填充色，但不支持 pattern 填充色为渐变色，即元素（element）为渐变色时，pattern 背景色无法继承，需要手动指定。参考：[Demo](/zh/examples/tiny/tiny-area#pattern)
3. Tooltip, Legend 的 marker 使用的是依旧是纯颜色（plain color）. 对于 Legend marker 可以考虑使用回调的方式来设置，参考：[Demo](/zh/examples/plugin/pattern#pie-pattern-callback)


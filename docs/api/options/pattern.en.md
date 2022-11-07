---
title: Pattern
order: 8
---

### Introduction

We can set patterns for geometries.
- We provide the default, high contrast patterns: dot, line, and square. For charts with poor color differentiation, pattern can be used as an "intuitive, visual classification attribute" to distinguish each item, making it color-blind friendly.
- add grouping for color: Pattern can help to expand the classification of colors when there are not enough harmonious colors, or when the color has a small proportion, the distinction is not obvious.
- Subdivision and grouping with color: We can use pattern as a "group", and the color as sub classification in this group.
- Grouping as degree: The size of a circle or square, the thickness of a line can indicate "degree".
- Highlight key points and enrich expression: Pattern not only has a "good-looking" skin, but also can highlight a certain items for storytelling.

### Use pattern in G2Plot

G2Plot with built-in `'dot' | 'line' | 'square'` several patterns, the pattern inherits the current element's fill color by default.

<playground path="plugin/pattern/demo/pie-pattern.ts" rid="pie-pattern"></playground>

Usage for scenes:

- [Demo1](/zh/examples/plugin/pattern#legend-marker-with-pattern): Set pattern for legend marker
- [Demo2](/zh/examples/plugin/pattern#bar-pattern): Set pattern with callback for each geometry 


<!-- 补充 案例说明 和 案例 -->

### API

<embed src="@/docs/common/pattern.en.md"></embed>

### Attention

Please note the use of pattern, which currently has some limitations.

1. Pattern is not supported in the `svg` rendering mode.
2. Pattern inherits the fill color of element by default, but does not support gradient color for pattern fill color, i.e. when we needs gradient color for element, pattern background color cannot be inherited and needs to be specified manually. See: [Demo](/zh/examples/tiny/tiny-area#pattern)
3. Tooltip, the legend marker is still in plain color. For the legend marker, consider using a callback to set it, see:[Demo](/zh/examples/plugin/pattern#pie-pattern-callback)



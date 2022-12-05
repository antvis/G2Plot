#### Add interactions

Usage:

```ts
// Enable the Active interaction when the mouse moves over a chart element (bar in a bar, dot in a dot, etc.)
interactions: [{ type: 'element-active' }];

// Enable multiple interactions
interactions: [{ type: 'element-active' }, { type: 'brush' }];
```

#### Config interactions

通过 `cfg` 可以对交互行为进行配置，详细参考 [G2 | 修改交互的默认交互](https://g2.antv.vision/en/docs/api/general/interaction/#修改交互的默认交互)

```ts
// 修改 tooltip 触发事件
interactions: [
  { 
    type: 'tooltip',
    cfg: { start: [{ trigger: 'element:click', action: 'tooltip:show' }] } 
  }
]
```

#### Remove the interaction

```ts
// 方式1: 关闭 tooltip 交互
interactions: [{ type: 'tooltip', enable: false }]

// 方式2:
plot.chart.removeInteraction('interaction-type');
```

Example:

```ts
// Removes legend filtering interaction
plot.chart.removeInteraction('legend-filter');
```

# G2 v5 API 速查

> 适用版本：`@antv/g2` ^5。生成任何图表代码前，以此文件为 API 规范。
> 代码块约定：`ts` 为可完整编译的代码，`ts-snippet` 为省略上下文的教学片段。

## 创建图表

```ts-snippet
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container', // DOM 元素 id 或 HTMLElement
  width: 640,
  height: 360,
  autoFit: false,         // true 时尺寸随容器自适应
  theme: 'light',         // 'light' | 'dark' | 'academy' 等
});
```

## 两种渲染写法

### spec 写法（推荐，声明式）

```ts-snippet
chart.options({
  type: 'line',
  data,
  encode: { x: 'month', y: 'value' },
});
chart.render();
```

### 链式写法（等价）

```ts-snippet
chart
  .line()
  .data(data)
  .encode('x', 'month')
  .encode('y', 'value');
chart.render();
```

## spec 核心属性

| 属性 | 说明 | 示例 |
|---|---|---|
| `type` | 图形标记类型 | `'line'`、`'interval'`、`'point'`、`'area'` |
| `data` | 数据，对象数组 | `[{ month: 'Jan', value: 100 }]` |
| `encode` | 字段 → 视觉通道映射 | `{ x: 'month', y: 'value', color: 'series' }` |
| `transform` | 数据变换（堆叠/分组/排序） | `[{ type: 'stackY' }]` |
| `scale` | 比例尺（颜色枚举、值域） | `{ color: { range: ['#5B8FF9'] } }` |
| `axis` | 坐标轴，`false` 关闭 | `{ x: { title: '月份' } }` |
| `legend` | 图例，`false` 关闭 | `{ color: { position: 'top' } }` |
| `tooltip` | 提示，`false` 关闭 | `{ title: '销售额' }` |
| `labels` | 数据标签 | `[{ text: 'value', position: 'top' }]` |
| `style` | 图形样式 | `{ lineWidth: 2 }` |
| `coordinate` | 坐标系（饼图用 theta） | `{ type: 'theta' }` |
| `interaction` | 交互 | `[{ type: 'elementHighlight' }]` |
| `animate` | 动画，`false` 关闭 | `{ enter: { type: 'fadeIn' } }` |
| `children` | 子视图（组合图） | 见下文「组合视图」 |

## encode 常用通道

| 通道 | 说明 |
|---|---|
| `x` | 水平位置（时间/类别字段） |
| `y` | 垂直位置（数值字段） |
| `color` | 颜色，同时承担系列分组 |
| `shape` | 图形形状（如折线 `'smooth'`） |
| `size` | 大小（气泡图等） |
| `series` | 系列分组键（堆叠/对称变换场景） |
| `text` | 文本内容 |
| `tooltip` | 自定义提示字段（数组） |

## 组合视图（双轴、柱线混合）

```ts-snippet
chart.options({
  type: 'view',
  data,
  children: [
    { type: 'interval', encode: { x: 'month', y: 'sales' } },
    { type: 'line', encode: { x: 'month', y: 'profit' }, scale: { y: { independent: true } } },
  ],
});
```

## 生命周期

- `chart.render()` → `Promise<Chart>`，渲染
- `chart.changeSize(width, height)` → 改尺寸
- `chart.destroy()` → 销毁（框架组件卸载时必须调用）

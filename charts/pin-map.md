# Pin Map 图钉地图

> 组件用途：在地理底图上按经纬度标注离散地点，展示门店、设备、服务站等实体的空间分布。

## 何时使用

- 地点分布：门店、仓库、售后网点、充电站、物联网设备的位置标注
- 地理业务对比：用颜色区分类别或状态，用气泡大小表示订单量、设备数等数值
- 已有经纬度与 GeoJSON 底图，需要保留真实空间位置关系

## 何时不用

- 只有两个数值变量、不需要地理底图 → 用 scatter 散点图
- 大量点主要表达聚集密度 → 用 heatmap 渐变热力图
- 按行政区比较数值、不关注具体地点 → 用 `geoPath` 区域着色地图（choropleth）
- 地点之间的路径、迁移或流量关系 → 用带连线的地理流向图

## 数据要求

- 底图：标准 GeoJSON `FeatureCollection`，交给 `geoPath`；可内联，也可从本地或远程加载
- 标注数据：长表数据，每行一个地点，见 [数据模式](../references/data-patterns.md)
- `longitude` / `latitude` 字段：数值（number），分别映射 `encode.x` / `encode.y`；顺序不要颠倒
- `name` 字段：地点名称，用于标签或 tooltip 标题
- `category` 字段（可选）：字符串，用于 `encode.color` 分类着色
- `value` 字段（可选）：非负数值，用于 `encode.size` 气泡大小编码
- 底图与标注点应使用同一坐标基准；案例使用 WGS84 经纬度与简化的内联 GeoJSON

## 基础实现（G2 v5）

图钉地图 = `type: 'geoView'` + `geoPath` 地理底图 + `point` 经纬度标注。底图与标注数据分开声明，不要多次调用 `chart.options()`。

```ts
/**
 * 基础图钉地图
 * 场景：在地理底图上标注售后服务站的位置，快速查看站点空间分布
 * 要点：geoView 组合 geoPath 底图与 point 标注；经纬度分别映射 x/y；
 *       底图使用内联 GeoJSON，案例无需请求远程数据
 */
import { Chart } from '@antv/g2';

// 简化的冰岛轮廓，仅用于演示内联 GeoJSON 底图
const serviceArea = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { name: 'Iceland' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-24.5, 65.4],
            [-23.0, 66.4],
            [-19.0, 66.5],
            [-15.0, 65.8],
            [-13.8, 64.8],
            [-16.0, 63.7],
            [-20.0, 63.3],
            [-23.5, 63.8],
            [-24.5, 65.4],
          ],
        ],
      },
    },
  ],
};

const serviceSites = [
  { siteName: 'Reykjavik', longitude: -21.9426, latitude: 64.1466 },
  { siteName: 'Selfoss', longitude: -20.9971, latitude: 63.9335 },
  { siteName: 'Akureyri', longitude: -18.1, latitude: 65.6835 },
  { siteName: 'Egilsstadir', longitude: -14.3948, latitude: 65.2669 },
  { siteName: 'Isafjordur', longitude: -23.126, latitude: 66.0749 },
  { siteName: 'Vestmannaeyjar', longitude: -20.2734, latitude: 63.4427 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'geoView',
  children: [
    {
      type: 'geoPath',
      data: serviceArea,
      style: { fill: '#EAF2F8', stroke: '#8CB3D9', lineWidth: 1 },
      tooltip: false,
    },
    {
      type: 'point',
      data: serviceSites,
      encode: { x: 'longitude', y: 'latitude', size: 7 },
      style: { fill: '#F4664A', stroke: '#fff', lineWidth: 1.5 },
      tooltip: { title: 'siteName' },
    },
  ],
});

chart.render();
```

## 常见变体

| 变体 | 关键改动 | 完整案例 |
|---|---|---|
| 分类着色 | `point` 的 `encode` 增加 `color: 'storeType'`，用 `scale.color.range` 指定色板 | [bubble.ts](../examples/pin-map/bubble.ts) |
| 数值气泡 | `encode.size` 映射数值字段，`scale.size` 用 `sqrt` 并限制 `range` | [bubble.ts](../examples/pin-map/bubble.ts) |
| 地点名称标签 | `labels` 设置 `text` 与 `position`，用 `overlapDodgeY` 减少重叠 | [bubble.ts](../examples/pin-map/bubble.ts) |

分类气泡核心差异（位置、类别和数值分别使用独立通道）：

```ts-snippet
{
  type: 'point',
  data: retailStores,
  encode: {
    x: 'longitude',
    y: 'latitude',
    color: 'storeType',
    size: 'monthlyOrders',
  },
  scale: { size: { type: 'sqrt', range: [6, 18] } },
}
```

## 样式自定义

常用视觉定制项均配置在对应 child 上；底图样式属于 `geoPath`，标注样式属于 `point`。完整示例见 [bubble.ts](../examples/pin-map/bubble.ts)。

| 定制项 | 写法 | 说明 |
|---|---|---|
| 底图填充与边界 | `geoPath.style: { fill: '#F3F6F9', stroke: '#A9B7C6' }` | 底图保持低强调，避免抢过标注点 |
| 固定标注大小 | `point.encode: { size: 7 }` | 固定大小用数值；字符串表示字段名 |
| 分类色板 | `point.scale: { color: { range: ['#5B8FF9', '#5AD8A6'] } }` | 配合 `encode.color` 使用 |
| 气泡大小 | `point.scale: { size: { type: 'sqrt', range: [6, 18] } }` | 限制视觉范围，避免大气泡遮住地图 |
| 标注透明度与描边 | `point.style: { fillOpacity: 0.85, stroke: '#fff' }` | 描边用于从底图中分离标注 |
| 分类图例位置 | `point.legend: { color: { position: 'top' } }` | 隐藏尺寸图例用 `legend.size: false` |
| 名称标签 | `point.labels: [{ text: 'storeName', position: 'top' }]` | 密集标签可加 `overlapDodgeY` |

Tooltip 显示业务名称与格式化数值：

```ts-snippet
tooltip: {
  title: 'storeName',
  items: [
    { field: 'storeType', name: '门店类型' },
    {
      field: 'monthlyOrders',
      name: '月订单量',
      valueFormatter: (value) => `${Number(value).toLocaleString()} 单`,
    },
  ],
},
```

## 易错点（v4 → v5）

| ❌ 错误（幻觉高发） | ✅ 正确 |
|---|---|
| `import { PinMap } from '@antv/g2plot'` + `new PinMap(...)` | `import { Chart } from '@antv/g2'` + `new Chart({ container })` |
| 顶层只写 `type: 'point'`，却期待出现地理底图 | 顶层用 `type: 'geoView'`，children 同时包含 `geoPath` 与 `point` |
| 顶层直接写 `type: 'geoPath'` | `geoPath` 放在 `geoView.children` 中 |
| 把门店长表数组传给 `geoPath.data` | `geoPath` 接收 GeoJSON；门店数组交给 `point.data` |
| `encode: { longitude: 'longitude', latitude: 'latitude' }` | 经纬度使用位置通道：`encode: { x: 'longitude', y: 'latitude' }` |
| `x` 映射纬度、`y` 映射经度 | 经度是 x，纬度是 y |
| 经纬度使用字符串数字 | 渲染前用 `Number()` 转成数值 |
| `.position('longitude*latitude')`（v4 链式） | `encode: { x: 'longitude', y: 'latitude' }` |
| 连续调用两次 `chart.options()` 分别添加底图与标注 | 只调用一次，通过 `geoView.children` 叠加图层 |
| `size: '7'` 想表示固定 7px | 固定大小用 `size: 7`；字符串会被解释为数据字段名 |

更多对照见 [v4-to-v5-migration.md](../references/v4-to-v5-migration.md)。

## 完整案例

每个案例的元信息（场景与关键配置），代码均通过 `npm run validate` 校验：

| 案例 | 场景 | 关键配置 |
|---|---|---|
| [basic.ts](../examples/pin-map/basic.ts) | 售后服务站位置标注，最简起步 | `geoView` + `geoPath`/`point` children、`encode: { x: longitude, y: latitude }`、内联 GeoJSON |
| [bubble.ts](../examples/pin-map/bubble.ts) | 门店类型分布与月订单量对比 | `encode.color/size`、`scale.size: sqrt`、`labels`、`tooltip.items` |

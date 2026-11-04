# Dot Map 点地图

> 组件用途：把地理对象（城市、省份、国家）画成图上的点，用点位表达经纬度，用颜色和大小编码业务指标。

## 何时使用

- 地理点位分布：门店、网点、客户、订单在不同城市的分布
- 点密度地图：每个点代表一个固定单位（如 1 点 = 500 万人），用点的数量表达总量
- 气泡点地图：在同一张图上比较各地量级（点的大小 = 订单量/用户数）
- 只需要地理相对位置、不需要行政区边界填色时（无 GeoJSON 底图也能画）

## 何时不用

- 需要按行政区整体填色（choropleth）→ 用 `geoView` + `geoPath`，把数值映射到区域颜色；点地图只表达点位，不表达面
- 大量经纬度点云的连续密度 → 用 heatmap 渐变热力图，点会互相遮挡
- 两个数值变量的相关性 → 用 scatter 散点图
- 精确的类别排名对比 → 用 bar 条形图
- 点位过密（同一城市成百上千个点）→ 先聚合到城市级，或改用热力图/分级统计

## 数据要求

- 长表数据，每行一个地理点位，见 [数据模式](../references/data-patterns.md)
- `longitude` / `latitude` 字段：数值（number），WGS84 经纬度；**不要**传字符串
- 指标字段：数值（number），用于 `encode.size` / `encode.color` / tooltip
- 分类字段（如 `region`、`province`）：字符串，用于 `encode.color` 分组
- 点密度场景：先确定「每个点代表多少单位」，再由中心坐标展开出多个点（见 [density.ts](../examples/dot-map/density.ts)）
- 用 `scale.x.domain` / `scale.y.domain` 固定经纬度范围（中国约 `[73, 136] × [17, 54]`），否则不同批次数据的点位会整体漂移

## 基础实现（G2 v5）

点地图本质是 `type: 'point'`：x 通道映射经度、y 通道映射纬度，关闭坐标轴。

```ts
import { Chart } from '@antv/g2';

/**
 * 基础点地图
 * 场景：城市门店/网点的地理分布，用点的位置表达经纬度，用颜色区分区域
 * 要点：x 映射经度、y 映射纬度；关闭坐标轴（axis: false）；
 *       scale.x / scale.y 固定经纬度范围，保证不同批次数据的相对位置一致
 */
const data = [
  { city: '北京', region: '华北', longitude: 116.41, latitude: 39.9, orderCount: 12800 },
  { city: '上海', region: '华东', longitude: 121.47, latitude: 31.23, orderCount: 15600 },
  { city: '广州', region: '华南', longitude: 113.26, latitude: 23.13, orderCount: 11200 },
  { city: '深圳', region: '华南', longitude: 114.06, latitude: 22.55, orderCount: 13400 },
  { city: '杭州', region: '华东', longitude: 120.16, latitude: 30.27, orderCount: 9600 },
  { city: '南京', region: '华东', longitude: 118.8, latitude: 32.06, orderCount: 7400 },
  { city: '成都', region: '西南', longitude: 104.07, latitude: 30.57, orderCount: 8800 },
  { city: '重庆', region: '西南', longitude: 106.55, latitude: 29.56, orderCount: 7200 },
  { city: '武汉', region: '华中', longitude: 114.3, latitude: 30.59, orderCount: 7600 },
  { city: '西安', region: '西北', longitude: 108.94, latitude: 34.34, orderCount: 5400 },
  { city: '沈阳', region: '东北', longitude: 123.43, latitude: 41.8, orderCount: 4200 },
  { city: '乌鲁木齐', region: '西北', longitude: 87.62, latitude: 43.82, orderCount: 1800 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'point',
  data,
  encode: { x: 'longitude', y: 'latitude', color: 'region', size: 5 },
  scale: {
    // 固定中国经纬度范围，避免数据变化导致点位整体漂移
    x: { domain: [73, 136] },
    y: { domain: [17, 54] },
    color: {
      range: ['#5B8FF9', '#5AD8A6', '#F6BD16', '#E8684A', '#9270CA', '#6DC8EC', '#FF9D4D'],
    },
  },
  axis: false,
  legend: { color: { position: 'top' } },
  style: { fillOpacity: 0.85, stroke: '#fff', lineWidth: 1 },
  tooltip: {
    title: 'city',
    items: [{ field: 'orderCount', name: '订单量' }],
  },
});

chart.render();
```

## 常见变体

| 变体 | 关键改动 | 完整案例 |
|---|---|---|
| 气泡点地图 | `encode.size` 映射数值，`scale.size` 用 `sqrt` 防止面积失真 | [bubble-map.ts](../examples/dot-map/bubble-map.ts) |
| 点密度地图 | 每个点代表固定单位，按省份中心坐标螺旋展开后画点 | [density.ts](../examples/dot-map/density.ts) |
| 分类着色 | `encode.color` 映射区域字段 | [basic.ts](../examples/dot-map/basic.ts) |
| 叠加行政区底图 | `type: 'geoView'` + `geoPath`（GeoJSON）+ `point` | 见下方片段 |

气泡点地图核心差异（大小比例尺用 `sqrt`，图例只保留颜色）：

```ts-snippet
encode: { x: 'longitude', y: 'latitude', size: 'orderCount', color: 'region' },
scale: {
  size: { type: 'sqrt', range: [6, 34] },
  x: { domain: [73, 136] },
  y: { domain: [17, 54] },
},
axis: false,
legend: { color: { position: 'top' }, size: false },
```

叠加行政区底图（点位与底图共用同一套投影，GeoJSON 需自备或从 CDN 加载）：

```ts-snippet
chart.options({
  type: 'geoView',
  coordinate: { type: 'mercator' }, // 中国常用 mercator；美国可用 albersUsa
  children: [
    {
      type: 'geoPath',
      data: { type: 'fetch', value: './china.geojson' }, // GeoJSON FeatureCollection
      style: { fill: '#f0f2f5', stroke: '#fff', lineWidth: 0.5 },
    },
    {
      type: 'point',
      data,
      encode: { x: 'longitude', y: 'latitude', size: 'orderCount', color: 'region' },
      scale: { size: { type: 'sqrt', range: [4, 24] } },
      style: { fillOpacity: 0.85, stroke: '#fff', lineWidth: 1 },
    },
  ],
});
```

`geoView` 内不需要再给 point 设置 `scale.x` / `scale.y`，投影会统一处理经纬度。只画底图时可直接用顶层 `type: 'geoPath'`，它会自动包一层 `geoView`。

## 样式自定义

| 定制项 | 写法 | 说明 |
|---|---|---|
| 固定点大小 | `encode: { size: 5 }` | 所有点等大，适合分类点位分布 |
| 大小比例尺 | `scale: { size: { type: 'sqrt', range: [6, 34] } }` | 气泡图必用 `sqrt`，否则面积感知失真 |
| 点颜色 | `scale: { color: { range: ['#5B8FF9'] } }` | 自定义颜色数组用 `range`；`palette` 只接受调色板名字符串 |
| 白色描边 | `style: { stroke: '#fff', lineWidth: 1 }` | 点重叠时更容易区分 |
| 透明度 | `style: { fillOpacity: 0.8 }` | 点密度图建议 0.6~0.8 |
| 关闭坐标轴 | `axis: false` | 地图不需要经纬度刻度 |
| 图例位置 | `legend: { color: { position: 'top' } }` | `'top'` / `'bottom'` / `'left'` / `'right'` |
| 城市名标签 | `labels: [{ text: 'city', position: 'top' }]` | 点密集时用 `transform: [{ type: 'overlapDodgeY' }]` 防重叠 |
| tooltip 单位 | `items: [{ field: 'orderCount', name: '订单量', valueFormatter: (v) => v + ' 单' }]` | 格式化数值 |
| 暗色大屏 | `theme: 'classicDark'` | 坐标轴、图例、标题文字自动适配 |

点密集时给标签加防重叠变换，完整示例见 [bubble-map.ts](../examples/dot-map/bubble-map.ts)：

```ts-snippet
labels: [
  {
    text: 'city',
    position: 'top',
    transform: [{ type: 'overlapDodgeY' }],
    style: { fontSize: 10, fill: '#595959' },
  },
],
```

## 易错点（v4 → v5）

| ❌ 错误（幻觉高发） | ✅ 正确 |
|---|---|
| `type: 'dot-map'` / `type: 'map'`（G2 没有这两个 mark） | `type: 'point'`；需要底图时用 `type: 'geoView'` + `geoPath` |
| 经纬度存成字符串 `'116.41'` | 转成 `number`，否则点位全部堆在原点或直接不渲染 |
| 不设 `scale.x/y.domain` | 显式固定经纬度范围，保证地理相对位置稳定 |
| 只传 `x` / `y` 用 `'city'` 分类字段 | 地图必须用 `longitude` / `latitude` 数值字段定位 |
| 在 `geoView` 里给 point 再设 `scale.x/y` | `geoView` 已接管投影，point 只传经纬度字段 |
| `geoView` 的 children 里再套 `type: 'view'` | children 直接放 `geoPath` / `point` 等 mark |
| 用 cell / heatmap 画点地图 | 点位分布用 `point`；连续点云密度才用 `heatmap` |
| 点大小直接线性映射大数值 | `scale.size.type: 'sqrt'`，否则大小差异被夸大 |
| `new DotMap('container', {...})`（G2Plot v2） | `new Chart({ container })` + `chart.options({ type: 'point' })` |

更多对照见 [v4-to-v5-migration.md](../references/v4-to-v5-migration.md)。

## 完整案例

每个案例的元信息（场景与关键配置），代码均通过 `npm run validate` 校验：

| 案例 | 场景 | 关键配置 |
|---|---|---|
| [basic.ts](../examples/dot-map/basic.ts) | 城市网点分布，按区域着色，最简起步 | `type: 'point'` + `encode.x/y` 经纬度 + `axis: false` + 固定 `scale.x/y.domain` |
| [bubble-map.ts](../examples/dot-map/bubble-map.ts) | 城市订单量大小对比 + 城市名标签 | `encode.size: 'orderCount'` + `scale.size.type: 'sqrt'` + `labels` + `legend.size: false` |
| [density.ts](../examples/dot-map/density.ts) | 各省人口点密度（1 点 = 500 万人） | 数据预计算（黄金角螺旋展开）+ 固定点大小 + `encode.color` 区分区域 |

export const version = '2.4.31';

// G2 自定义能力透出
import * as G2 from '@antv/g2';
/** 开放一些通用的 adaptor 通道方法，实验阶段：不保证稳定性 */
import { animation, annotation, interaction, legend, scale, theme, tooltip } from './adaptor/common';
// 国际化处理
import { registerLocale } from './core/locale';
import { EN_US_LOCALE } from './locales/en_US';
import { ZH_CN_LOCALE } from './locales/zh_CN';
/** 各个 geometry 的 adaptor，可以让开发者更快的构造图形 */
export { area, interval, line, point, polygon, schema } from './adaptor/geometries';
export type {
  AreaGeometryOptions,
  IntervalGeometryOptions,
  LineGeometryOptions,
  PointGeometryOptions,
  PolygonGeometryOptions,
  SchemaGeometryOptions,
} from './adaptor/geometries';
/** Adaptor 及其参数的类型定义 */
export type { Adaptor, Params } from './core/adaptor';
/** 全局变量 */
export { setGlobal } from './core/global';
/** G2Plot 的 Plot 基类 */
export { Plot } from './core/plot';
/** 对于没有开发完成的图表，可以暂时先放到 Lab 下面，先做体验，稳定后放到根 export */
export { Lab } from './lab';
// 面积图及类型定义 | author by [hustcc](https://github.com/hustcc)
export { Area } from './plots/area';
export type { AreaOptions } from './plots/area';
// 条形图及类型定义 | author by [BBSQQ](https://github.com/BBSQQ)
export { Bar } from './plots/bar';
export type { BarOptions } from './plots/bar';
// 对称条形图及类型定义 | author by [arcsin1](https://github.com/arcsin1)
export { BidirectionalBar } from './plots/bidirectional-bar';
export type { BidirectionalBarOptions } from './plots/bidirectional-bar';
// 箱线图及类型定义 | author by [BBSQQ](https://github.com/BBSQQ), [visiky](https://github.com/visiky)
export { Box } from './plots/box';
export type { BoxOptions } from './plots/box';
// 子弹图及类型定义 | author by [arcsin1](https://github.com/arcsin1)
export { Bullet } from './plots/bullet';
export type { BulletOptions } from './plots/bullet';
// 弦图及类型定义 | author by [MrSmallLiu](https://github.com/MrSmallLiu), [visiky](https://github.com/visiky)
export { Chord } from './plots/chord';
export type { ChordOptions } from './plots/chord';
// circle-packing 及类型定义 | author by [visiky](https://github.com/visiky), [Angeli](https://github.com/Angelii)
export { CirclePacking } from './plots/circle-packing';
export type { CirclePackingOptions } from './plots/circle-packing';
// 柱形图及类型定义 | author by [zqlu](https://github.com/zqlu)
export { Column } from './plots/column';
export type { ColumnOptions } from './plots/column';
// 混合图形 | author by [liuzhenying](https://github.com/liuzhenying)
export { DualAxes } from './plots/dual-axes';
export type { DualAxesOptions } from './plots/dual-axes';
// 分面图及类型定义 | author by [visiky](https://github.com/visiky)
export { Facet } from './plots/facet';
export type { FacetOptions } from './plots/facet';
// 漏斗图及类型定义
export { Funnel, FUNNEL_CONVERSATION_FIELD } from './plots/funnel';
export type { FunnelOptions } from './plots/funnel';
// 仪表盘及类型定义 | author by [hustcc](https://github.com/hustcc)
export { Gauge } from './plots/gauge';
export type { GaugeOptions } from './plots/gauge';
// 热力图及类型定义 | author by [jiazhewang](https://github.com/jiazhewang)
export { Heatmap } from './plots/heatmap';
export type { HeatmapOptions } from './plots/heatmap';
// 直方图及类型定义 | author by [arcsin1](https://github.com/arcsin1), [visiky](https://github.com/visiky)
export { Histogram } from './plots/histogram';
export type { HistogramOptions } from './plots/histogram';
// 折线图及类型定义 | author by [hustcc](https://github.com/hustcc)
export { Line } from './plots/line';
export type { LineOptions } from './plots/line';
// 水波图及类型定义 | author by [CarisL](https://github.com/CarisL), [hustcc](https://github.com/hustcc), [pearmini](https://github.com/pearmini)
export { addWaterWave, Liquid } from './plots/liquid';
export type { LiquidOptions } from './plots/liquid';
// 已经废弃，更名为 Mix
export { Mix as Mix, Mix as MultiView } from './plots/mix';
export type { MixOptions, MixOptions as MultiViewOptions } from './plots/mix';
// 饼图及类型定义 | author by [visiky](https://github.com/visiky)
export { Pie } from './plots/pie';
export type { PieOptions } from './plots/pie';
// 进度图及类型定义 | author by [connono](https://github.com/connono)
export { Progress } from './plots/progress';
export type { ProgressOptions } from './plots/progress';
// 雷达图及类型定义 | author by [visiky](https://github.com/visiky)
export { Radar } from './plots/radar';
export type { RadarOptions } from './plots/radar';
// 玉珏图 | author by [yujs](https://github.com/yujs) | updated by [visiky](https://github.com/visiky)
export { RadialBar } from './plots/radial-bar';
export type { RadialBarOptions } from './plots/radial-bar';
// 环形进度图及类型定义 | author by [connono](https://github.com/connono)
export { RingProgress } from './plots/ring-progress';
export type { RingProgressOptions } from './plots/ring-progress';
// 玫瑰图及类型定义 | author by [zhangzhonghe](https://github.com/zhangzhonghe)
export { Rose } from './plots/rose';
export type { RoseOptions } from './plots/rose';
// 桑基图及类型定义 | author by [hustcc](https://github.com/hustcc)
export { Sankey } from './plots/sankey';
export type { SankeyOptions } from './plots/sankey';
// 散点图及类型定义 | author by [lxfu1](https://github.com/lxfu1)
export { Scatter } from './plots/scatter';
export type { ScatterOptions } from './plots/scatter';
// K线图及类型定义 | author by [jhwong](https://github.com/jinhuiWong), [visiky](https://github.com/visiky)
export { Stock } from './plots/stock';
export type { StockOptions } from './plots/stock';
// 旭日图及类型定义 | author by [lxfu1](https://github.com/lxfu1), [visiky](https://github.com/visiky)
export { Sunburst } from './plots/sunburst';
export type { SunburstOptions } from './plots/sunburst';
// 迷你面积图及类型定义 | author by [connono](https://github.com/connono)
export { TinyArea } from './plots/tiny-area';
export type { TinyAreaOptions } from './plots/tiny-area';
// 迷你柱形图及类型定义 | author by [connono](https://github.com/connono)
export { TinyColumn } from './plots/tiny-column';
export type { TinyColumnOptions } from './plots/tiny-column';
// 迷你折线图及类型定义 | author by [connono](https://github.com/connono)
export { TinyLine } from './plots/tiny-line';
export type { TinyLineOptions } from './plots/tiny-line';
// 矩形树图
export { Treemap } from './plots/treemap';
export type { TreemapOptions } from './plots/treemap';
// 韦恩图及类型定义 | author by [visiky](https://github.com/visiky)
export { Venn } from './plots/venn';
export type { VennOptions } from './plots/venn';
// 小提琴图及类型定义 | author by [YiSiWang](https://github.com/YiSiWang), [visiky](https://github.com/visiky)
export { Violin } from './plots/violin';
export type { ViolinOptions } from './plots/violin';
// 瀑布图 | author by [visiky](https://github.com/visiky)
export { Waterfall } from './plots/waterfall';
export type { WaterfallOptions } from './plots/waterfall';
// 词云图及类型定义 | author by [zhangzhonghe](https://github.com/zhangzhonghe)
export { WordCloud } from './plots/word-cloud';
export type { WordCloudOptions } from './plots/word-cloud';
// 以下开放自定义图表开发的能力（目前仅仅是孵化中）
/** 所有开放图表都使用 G2Plot.P 作为入口开发，理论上官方的所有图表都可以走 G2Plot.P 的入口（暂时不处理） */
export { P } from './plugin';
// 类型定义导出
export * from './types';
/** 开发 adaptor 可能会用到的方法或一些工具方法，不强制使用 */
export { flow, measureTextWidth } from './utils';
/** 开放 getCanvasPatterng 方法 */
export { getCanvasPattern } from './utils/pattern';
export { G2 };
/** 透出 国际化 工具函数，便于使用 */
export { registerLocale };

/** default locale register */
registerLocale('en-US', EN_US_LOCALE);
registerLocale('zh-CN', ZH_CN_LOCALE);

export const adaptors = { scale, legend, tooltip, annotation, interaction, theme, animation };

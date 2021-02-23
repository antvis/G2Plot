export const version = '2.3.12';

// G2 自定义能力透出
import * as G2 from '@antv/g2';
export { G2 };

/** G2Plot 的 Plot 基类 */
export { Plot } from './core/plot';

/** Adaptor 及其参数的类型定义 */
export { Adaptor, Params } from './core/adaptor';

// 类型定义导出
export * from './types';

// 折线图及类型定义 | author by [hustcc](https://github.com/hustcc)
export { Line, LineOptions } from './plots/line';

// 面积图及类型定义 | author by [hustcc](https://github.com/hustcc)
export { Area, AreaOptions } from './plots/area';

// 柱形图及类型定义 | author by [zqlu](https://github.com/zqlu)
export { Column, ColumnOptions } from './plots/column';

// 条形图及类型定义 | author by [BBSQQ](https://github.com/BBSQQ)
export { Bar, BarOptions } from './plots/bar';

// 饼图及类型定义 | author by [visiky](https://github.com/visiky)
export { Pie, PieOptions } from './plots/pie';

// 玫瑰图及类型定义 | author by [zhangzhonghe](https://github.com/zhangzhonghe)
export { Rose, RoseOptions } from './plots/rose';

// 词云图及类型定义 | author by [zhangzhonghe](https://github.com/zhangzhonghe)
export { WordCloud, WordCloudOptions } from './plots/word-cloud';

// 散点图及类型定义 | author by [lxfu1](https://github.com/lxfu1)
export { Scatter, ScatterOptions } from './plots/scatter';

// 雷达图及类型定义 | author by [visiky](https://github.com/visiky)
export { Radar, RadarOptions } from './plots/radar';

// 混合图形 | author by [liuzhenying](https://github.com/liuzhenying)
export { DualAxes, DualAxesOptions } from './plots/dual-axes';

// 迷你折线图及类型定义 | author by [connono](https://github.com/connono)
export { TinyLine, TinyLineOptions } from './plots/tiny-line';

// 迷你柱形图及类型定义 | author by [connono](https://github.com/connono)
export { TinyColumn, TinyColumnOptions } from './plots/tiny-column';

// 迷你面积图及类型定义 | author by [connono](https://github.com/connono)
export { TinyArea, TinyAreaOptions } from './plots/tiny-area';

// 直方图及类型定义 | author by [arcsin1](https://github.com/arcsin1)
export { Histogram, HistogramOptions } from './plots/histogram';

// 进度图及类型定义 | author by [connono](https://github.com/connono)
export { Progress, ProgressOptions } from './plots/progress';

// 环形进度图及类型定义 | author by [connono](https://github.com/connono)
export { RingProgress, RingProgressOptions } from './plots/ring-progress';

// 热力图及类型定义 | author by [jiazhewang](https://github.com/jiazhewang)
export { Heatmap, HeatmapOptions } from './plots/heatmap';

// 箱线图及类型定义 | author by [BBSQQ](https://github.com/BBSQQ)
export { Box, BoxOptions } from './plots/box';

// K线图及类型定义 | author by [jhwong](https://github.com/jinhuiWong)
export { Stock, StockOptions } from './plots/stock';

// 漏斗图及类型定义
export { Funnel, FunnelOptions, FUNNEL_CONVERSATION_FIELD } from './plots/funnel';

// 水波图及类型定义 | author by [CarisL](https://github.com/CarisL), [hustcc](https://github.com/hustcc)
export { Liquid, LiquidOptions } from './plots/liquid';

// 子弹图及类型定义 | author by [arcsin1](https://github.com/arcsin1)
export { Bullet, BulletOptions } from './plots/bullet';

// 旭日图及类型定义 | author by [lxfu1](https://github.com/lxfu1)
export { Sunburst, SunburstOptions } from './plots/sunburst';

// 仪表盘及类型定义 | author by [hustcc](https://github.com/hustcc)
export { Gauge, GaugeOptions } from './plots/gauge';

// 瀑布图 | author by [visiky](https://github.com/visiky)
export { Waterfall, WaterfallOptions } from './plots/waterfall';

// 玉珏图 | author by [yujs](https://github.com/yujs) | updated by [visiky](https://github.com/visiky)
export { RadialBar, RadialBarOptions } from './plots/radial-bar';

// 对称条形图及类型定义 | author by [arcsin1](https://github.com/arcsin1)
export { BidirectionalBar, BidirectionalBarOptions } from './plots/bidirectional-bar';

// 矩形树图
export { Treemap, TreemapOptions } from './plots/treemap';

// 桑基图及类型定义 | author by [hustcc](https://github.com/hustcc)
export { Sankey, SankeyOptions } from './plots/sankey';

// 弦图及类型定义 | author by [MrSmallLiu](https://github.com/MrSmallLiu)
export { Chord, ChordOptions } from './plots/chord';

// 以下开放自定义图表开发的能力（目前仅仅是孵化中）
/** 所有开放图表都使用 G2Plot.P 作为入口开发，理论上官方的所有图表都可以走 G2Plot.P 的入口（暂时不处理） */
export { P } from './plugin';

/** 开放多图层图表 (multi-view) */
export { MultiView, MultiViewOptions } from './plots/multi-view';

/** 开发 adaptor 可能会用到的方法或一些工具方法，不强制使用 */
export { flow, measureTextWidth } from './utils';

/** 各个 geometry 的 adaptor，可以让开发者更快的构造图形 */
export { line, interval, area, point, polygon } from './adaptor/geometries';
/** 开放一些通用的 adaptor 通道方法，实验阶段：不保证稳定性 */
import { scale, legend, tooltip, annotation, interaction, theme, animation } from './adaptor/common';
export const adaptors = { scale, legend, tooltip, annotation, interaction, theme, animation };

/** 对于没有开发完成的图表，可以暂时先放到 Lab 下面，先做体验，稳定后放到根 export */
export { Lab } from './lab';

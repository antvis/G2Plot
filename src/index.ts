export const version = '2.0.0-beta.2';

// G2 自定义能力透出
export * as G2 from '@antv/g2';

/** G2Plot 的 Plot 基类 */
export { Plot } from './core/plot';

/** Adaptor 及其参数的类型定义 */
export { Adaptor, Params } from './core/adaptor';

// 类型定义导出
export * from './types';

// 折线图及类型定义
export { Line, LineOptions } from './plots/line';

// 面积图及类型定义
export { Area, AreaOptions } from './plots/area';

// 柱形图及类型定义
export { Column, ColumnOptions } from './plots/column';

// 条形图及类型定义
export { Bar, BarOptions } from './plots/bar';

// 饼图及类型定义
export { Pie, PieOptions } from './plots/pie';

// 散点图及类型定义
export { Scatter, ScatterOptions } from './plots/scatter';

// 雷达图及类型定义
export { Radar, RadarOptions } from './plots/radar';

// 混合图形
export { DualAxes, DualAxesOption } from './plots/dual-axes';

// 迷你折线图及类型定义
export { TinyLine, TinyLineOptions } from './plots/tiny-line';

// 迷你柱形图及类型定义
export { TinyColumn, TinyColumnOptions } from './plots/tiny-column';

// 迷你面积图及类型定义
export { TinyArea, TinyAreaOptions } from './plots/tiny-area';

// 直方图及类型定义
export { Histogram, HistogramOptions } from './plots/histogram';

// 进度图及类型定义
export { Progress, ProgressOptions } from './plots/progress';

// 环形进度图及类型定义
export { RingProgress, RingProgressOptions } from './plots/ring-progress';

// 热力图及类型定义
export { Heatmap, HeatmapOptions } from './plots/heatmap';

// 箱线图及类型定义
export { Box, BoxOptions } from './plots/box';

// 漏斗图及类型定义
export { Funnel, FunnelOptions } from './plots/funnel';

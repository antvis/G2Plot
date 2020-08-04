export const version = '2.0.0';

// G2 自定义能力透出
export { registerTheme } from '@antv/g2';

// 类型定义导出
export * from './types';

// 折线图及类型定义
export { Line, LineOptions } from './plots/line';

// 面积图及类型定义
export { Area, AreaOptions } from './plots/area';

// 柱形图及类型定义
export { Column, ColumnOptions } from './plots/column';

// 饼图及类型定义
export { Pie, PieOptions } from './plots/pie';

// 散点图及类型定义
export { Scatter, ScatterOptions } from './plots/scatter';

// 混合图形
export { Biax, BiaxOption } from './plots/biax';

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

// 条形图及类型定义
export { Bar, BarOptions } from './plots/bar';

// 雷达图及类型定义
export { Radar, RadarOptions } from './plots/radar';

// 热力图及类型定义
export { Heatmap, HeatmapOptions } from './plots/heatmap';

// 瀑布图及类型定义
export { Waterfall, WaterfallOptions } from './plots/waterfall';

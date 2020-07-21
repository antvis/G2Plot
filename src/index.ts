export const version = '2.0.0';

// 类型定义导出
export * from './types';

// 折线图及类型定义
export { Line, LineOptions } from './plots/line';

export { Column } from './plots/column';

// 饼图及类型定义
export { Pie, PieOptions } from './plots/pie';

// 散点图及类型定义
export { Scatter, ScatterOptions } from './plots/scatter';

// 迷你折线图及类型定义
export { TinyLine, TinyLineOptions } from './plots/tiny-line';

// 迷你柱形图及类型定义
export { TinyColumn, TinyColumnOptions } from './plots/tiny-column';

// 迷你面积图及类型定义
export { TinyArea, TinyAreaOptions } from './plots/tiny-area';

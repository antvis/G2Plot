// 通用配置
export * from './interface/config';
export { default as Layer, LayerConfig } from './base/layer';
export { default as ViewLayer, ViewConfig } from './base/view-layer';
export { default as Base, PlotConfig } from './base/plot';

// 图形
export * from './plots';

// MINI 图形
export { TinyLayerConfig } from './sparkline/tiny-layer';
export { default as Progress, ProgressConfig } from './sparkline/progress';
export { default as RingProgress, RingProgressConfig } from './sparkline/ring-progress';
export { default as TinyColumn, TinyColumnConfig } from './sparkline/tiny-column';
export { default as TinyArea, TinyAreaConfig } from './sparkline/tiny-area';
export { default as TinyLine, TinyLineConfig } from './sparkline/tiny-line';

// 混合图形
export { default as DualLine, DualLineConfig } from './combo/dual-line';
export { default as ColumnLine, ColumnLineConfig } from './combo/column-line';
export { default as GroupedColumnLine, GroupedColumnLineConfig } from './combo/groupedColumn-line';
export { default as StackedColumnLine, StackedColumnLineConfig } from './combo/stackedColumn-line';

// 主题
export { registerTheme, registerGlobalTheme } from './theme';
export { registerResponsiveConstraint, IConstraint } from './util/responsive/constraints';
export { registerResponsiveRule } from './util/responsive/rules';
export { registerResponsiveTheme, getResponsiveTheme } from './util/responsive/theme';

export { default as StateManager } from './util/state-manager';

// 导出 g2 上层需要使用
import * as G2 from '@antv/g2';

export { G2 };

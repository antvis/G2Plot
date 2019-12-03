// 通用配置
export * from './interface/config';

// 图形
export { default as Layer, LayerConfig } from './base/layer';
export { default as ViewLayer, ViewConfig } from './base/view-layer';
export { default as Base, PlotConfig } from './base/plot';
export { default as Line, LineConfig } from './plots/line';
export { default as Density, DensityConfig } from './plots/density';
export { default as Column, ColumnConfig } from './plots/column';
export { default as Bubble, BubbleConfig } from './plots/bubble';
export { default as Scatter, ScatterConfig } from './plots/scatter';
export { default as GroupColumn, GroupColumnConfig } from './plots/group-column';
export { default as StackColumn, StackColumnConfig } from './plots/stack-column';
export { default as PercentageStackColumn, PercentageStackColumnConfig } from './plots/percentage-stack-column';
export { default as Histogram, HistogramConfig } from './plots/histogram';
export { default as Bar, BarConfig } from './plots/bar';
export { default as StackBar, StackBarConfig } from './plots/stack-bar';
export { default as PercentageStackBar, PercentageStackBarConfig } from './plots/percentage-stack-bar';
export { default as GroupBar, GroupBarConfig } from './plots/group-bar';
export { default as Pie, PieConfig } from './plots/pie';
export { default as Ring, RingConfig } from './plots/ring';
export { default as Radar, RadarConfig } from './plots/radar';
export { default as Liquid, LiquidConfig } from './plots/liquid';
export { default as Gauge, GaugeConfig } from './plots/gauge';
export { default as Area, AreaConfig } from './plots/area';
export { default as StackArea, StackAreaConfig } from './plots/stack-area';
export { default as PercentageStackArea, PercentageStackAreaConfig } from './plots/percentage-stack-area';

// MINI 图形
export { TinyLayerConfig } from './tiny-plots/tiny-layer';
export { default as Progress, ProgressConfig } from './tiny-plots/progress';
export { default as RingProgress } from './tiny-plots/ring-progress';
export { default as TinyColumn } from './tiny-plots/tiny-column';
export { default as TinyArea } from './tiny-plots/tiny-area';
export { default as TinyLine } from './tiny-plots/tiny-line';

// 主题
export { registerTheme, registerGlobalTheme } from './theme';
export { registerResponsiveConstraint, IConstraint } from './util/responsive/constraints';
export { registerResponsiveRule } from './util/responsive/rules';
export { registerResponsiveTheme, getResponsiveTheme } from './util/responsive/theme';

export { default as StateManager } from './util/state-manager';

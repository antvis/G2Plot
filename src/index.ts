// 通用配置
export { default as Config } from './interface/config';
export * from './interface/config';

// 图形
export { default as Layer } from './base/layer';
export { default as ViewLayer } from './base/view-layer';
export { default as Base } from './base/plot';
// export { default as Line, LineConfig } from './plots/line';
export { default as Line, LineConfig } from './plots/line/index-refactor';
// export { default as Density, DensityConfig } from './plots/density';
export { default as Density, DensityConfig } from './plots/density/index-refactor';
// export { default as Column, ColumnConfig } from './plots/column';
export { default as Column, ColumnConfig } from './plots/column/index-refactor';
// export { default as GroupColumn, GroupColumnConfig } from './plots/group-column';
export { default as GroupColumn, GroupColumnConfig } from './plots/group-column/index-refactor';
// export { default as StackColumn, StackColumnConfig } from './plots/stack-column';
export { default as StackColumn, StackColumnConfig } from './plots/stack-column/index-refactor';
export { default as PercentageStackColumn, PercentageStackColumnConfig } from './plots/percentage-stack-column';
// export { default as Histogram, HistogramConfig } from './plots/histogram';
export { default as Histogram, HistogramConfig } from './plots/histogram/index-refactor';
// export { default as Bar, BarConfig } from './plots/bar';
export { default as Bar, BarConfig } from './plots/bar/index-refactor';
// export { default as StackBar, StackBarConfig } from './plots/stack-bar';
export { default as StackBar, StackBarConfig } from './plots/stack-bar/index-refactor';
export { default as PercentageStackBar, PercentageStackBarConfig } from './plots/percentage-stack-bar';
// export { default as GroupBar, GroupBarConfig } from './plots/group-bar';
export { default as GroupBar, GroupBarConfig } from './plots/group-bar/index-refactor';
export { default as Pie, PieConfig } from './plots/pie';
export { default as Ring, RingConfig } from './plots/ring';
export { default as Radar, RadarConfig } from './plots/radar';
export { default as Liquid, LiquidConfig } from './plots/liquid';
export { default as Gauge, GaugeConfig } from './plots/gauge';
// export { default as Area, AreaConfig } from './plots/area';
export { default as Area, AreaConfig } from './plots/area/index-refactor';
// export { default as StackArea, StackAreaConfig } from './plots/stack-area';
export { default as StackArea, StackAreaConfig } from './plots/stack-area/index-refactor';
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

import { COLOR_PALETTE } from './color';
import * as AxisTheme from './components/axis';
import { legend as LegendTheme } from './components/legend';
import { label as LabelTheme } from './components/label';
import { guideLine as GuidelineThme } from './components/guideline';
import { title as TitleTheme, description as DescriptionTheme } from './components/title';
import { slider as SliderTheme } from './components/slider';
import { tooltipIndicator as IndicatorTheme } from './components/tooltipIndicator';

export const GLOBAL_DARK_THEME = {
  /* 图表级 */
  width: 400,
  height: 400,
  bleeding: [24, 24, 24, 24],
  forceFit: true,
  backgroundStyle: {
    fill: '#262626',
  },
  panelStyle: null,
  /* 图形级 */
  defaultColor: COLOR_PALETTE.default,
  colorPalette: {
    type: 'qualitative',
    colors: [COLOR_PALETTE.qualitative['10'], COLOR_PALETTE.qualitative['20']],
  },
  /** 组件级 */
  title: TitleTheme('dark'),
  description: DescriptionTheme('dark'),
  xAxis: {
    base: AxisTheme['xAxis_base']('dark'),
    value: AxisTheme['xAxis_value']('dark'),
    category: AxisTheme['xAxis_category']('dark'),
    time: AxisTheme['xAxis_time']('dark'),
  },
  yAxis: {
    base: AxisTheme['yAxis_base']('dark'),
    value: AxisTheme['yAxis_value']('dark'),
    category: AxisTheme['yAxis_category']('dark'),
    time: AxisTheme['yAxis_time']('dark'),
  },
  angleAxis: AxisTheme['angleAxis']('dark'),
  radiusAxis: AxisTheme['radiusAxis']('dark'),
  legend: LegendTheme('dark'),
  label: LabelTheme('dark'),
  /* 统计分析组件 */
  guideLine: GuidelineThme('dark'),
  /* 交互组件 */
  slider: SliderTheme,
  scrollbar: {},
  breadcrumb: {},
  timeline: {},
  tooltipIndicator: IndicatorTheme,
};

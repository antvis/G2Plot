import { COLOR_PALETTE } from './color';
import * as AxisTheme from './components/axis';
import { legend as LegendTheme } from './components/legend';
import { label as LabelTheme } from './components/label';
import { guideLine as GuidelineThme } from './components/guideline';
import { title as TitleTheme, description as DescriptionTheme } from './components/title';

export const GLOBAL_LIGHT_THEME = {
  /* 图表级 */
  width: 400,
  height: 400,
  bleeding: [24, 24, 24, 24],
  forceFit: true,
  backgroundStyle: null,
  panelStyle: null,
  /* 图形级 */
  defaultColor: COLOR_PALETTE.default,
  colorPalette: {
    type: 'qualitative',
    colors: [COLOR_PALETTE.qualitative['10'], COLOR_PALETTE.qualitative['20']],
  },
  /** 组件级 */
  title: TitleTheme('light'),
  description: DescriptionTheme('light'),
  xAxis: {
    value: AxisTheme['xAxis_value']('light'),
    category: AxisTheme['xAxis_category']('light'),
    time: AxisTheme['xAxis_time']('light'),
  },
  yAxis: {
    value: AxisTheme['yAxis_value']('light'),
    category: AxisTheme['yAxis_category']('light'),
    time: AxisTheme['yAxis_time']('light'),
  },
  angleAxis: AxisTheme['angleAxis']('light'),
  radiusAxis: AxisTheme['radiusAxis']('light'),
  legend: LegendTheme('light'),
  label: LabelTheme('light'),
  /* 统计分析组件 */
  guideLine: GuidelineThme('light'),
  /* 交互组件 */
  slider: {},
  scrollbar: {},
  breadcrumb: {},
  timeline: {},
};

import { ViewConfig } from '../../base/view-layer';

export interface GaugeViewConfig extends ViewConfig {
  style: 'standard' | 'fan' | 'meter';
  /** 主指标显示形式：数值 | 占比 */
  labelType: 'value' | 'percent';
  /** 刻度指标显示形式：数值 | 占比 */
  scaleType: 'value' | 'percent';
  /** 显示副标签 */
  showSubLabel: boolean;
  /** 占比的小数点位数 */
  precision: number;
  /** 深浅主题色 */
  theme: 'light' | 'dark';
  /** 显示内部刻度 （仅标准仪表盘有） */
  showInsideAxis: boolean;
  /** 显示分档 */
  showRange: boolean;
  /** 显示分档标签 */
  showRangeLabel: boolean;
  /** 分档 */
  range?: {
    rangeLabel: string;
    rangeValues: number[];
  }[];
  /** 颜色配置 */
  colors: string[];

  /** 最大值 */
  maxValue: number;
  /** 最小值 */
  minValue: number;

  /** 指标描述 */
  description: string;

  /** 获取指标名称 */
  getName: Function;

  /** 获取指标格式化后的数值 */
  getValue: Function;
}


/**
 * 仪表盘默认配置
 */
export const DEFAULT_GAUGE_CONFIG = {
  style: 'standard',
  // labelType: 'value',
  // scaleType: 'value',
  showSubLabel: true,
  showInsideAxis: true,
  // precision: 1,
  // minValue: 0,
  // maxValue: 300000,
  // showRange: false,
  // showRangeLabel: true,
  // description: '',
  startAngle: -7 / 6,
  endAngle: 1 / 6,
  range: [0, 25, 50, 75, 100],
  gaugeStyle: {
    tickLineColor: 'rgba(0,0,0,0)',
    pointerColor: '#bfbfbf',
    statisticPos: ['50%', '100%'],
  },
};
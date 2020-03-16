/**
 * @author linhuiw
 * @description 仪表盘定义文件
 */
import { ViewConfig } from '../../base/view-layer';

interface GaugeStyle {
  fontColor?: string;
  fontOpacity?: number;
  fontSize?: number;
  borderOpacity?: number;
  borderWidth?: number;
  colors?: string[];
  size?: number;
  tickLabelOffset?: number[];
  pointerColor?: string;
}

export interface GaugeViewConfig extends ViewConfig {
  startAngle?: number;
  endAngle?: number;
  min?: number;
  max?: number;
  value?: number;
  showValue?: boolean;
  format?: (...args: any[]) => string;
  gaugeStyle?: GaugeStyle;
  range?: number[];
  styleMix?: any;
  valueText?: string;
  statistic?: any;
}

/**
 * 仪表盘默认配置
 */
export const DEFAULT_GAUGE_CONFIG = {
  style: 'standard',
  startAngle: -7 / 6,
  endAngle: 1 / 6,
  gaugeStyle: {
    tickLineColor: 'rgba(0,0,0,0)',
    pointerColor: '#bfbfbf',
  },
  statistic: {
    position: ['50%', '80%'],
  },
};

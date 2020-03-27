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

interface GaugeStatistic {
  visible?: boolean;
  position?: [string, string];
  size?: number;
  text?: string;
  color?: string;
}

export interface GaugeViewConfig extends ViewConfig {
  startAngle?: number;
  endAngle?: number;
  min?: number;
  max?: number;
  value?: number;
  /** @ignore */
  format?: (...args: any[]) => string;
  /** @ignore */
  gaugeStyle?: GaugeStyle;
  range?: number[];
  /** @ignore */
  styleMix?: any;
  statistic?: GaugeStatistic;
}

/**
 * 仪表盘默认配置
 */
export const DEFAULT_GAUGE_CONFIG = {
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

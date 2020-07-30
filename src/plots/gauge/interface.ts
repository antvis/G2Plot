import { GraphicStyle, TextStyle, LineStyle } from '../../interface/config';
import { ViewConfig } from '../../base/view-layer';

export interface GaugeAxis {
  visible?: boolean;
  offset?: number;
  tickCount?: number;
  tickLine?: {
    visible?: boolean;
    length?: number;
    thickness?: number;
    style?: LineStyle;
  };
  label?: {
    visible?: boolean;
    offset?: number;
    style?: TextStyle;
    formatter?: () => string;
  };
}

export interface GaugePivot {
  visible?: boolean;
  thickness?: number;
  pointer?: {
    visible?: boolean;
    style?: GraphicStyle;
  };
  pin?: {
    visible?: boolean;
    size?: number;
    style?: GraphicStyle;
  };
  base?: {
    visible?: boolean;
    size?: number;
    style?: GraphicStyle;
  };
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
  range?: number[];
  color?: string[] | string;
  rangeSize?: number;
  rangeStyle?: GraphicStyle;
  rangeBackgroundStyle?: GraphicStyle;
  format?: (...args: any[]) => string;
  axis?: GaugeAxis;
  pivot?: GaugePivot;
  statistic?: GaugeStatistic;
}

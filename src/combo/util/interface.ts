import { IValueAxis, TextStyle, GraphicStyle, LineStyle } from '../../interface/config';
import { PointShape } from '../../plots/line/layer';
import { DataItem } from '../../interface/config';
import { IDescription, ITitle, Meta } from '../../interface/config';
import { LooseMap } from '../../interface/types';

export interface ComboViewConfig {
  title?: ITitle;
  description?: IDescription;
  data: DataItem[][];
  meta?: LooseMap<Meta>;
  xField: string;
  yField: string[];
  yAxis?: ComboYAxis;
  legend?: ComboLegendConfig;
  events?: {
    [k: string]: ((...args: any[]) => any) | boolean;
  };
}

export interface ComboYAxisConfig extends IValueAxis {
  colorMapping?: boolean;
}

export interface ComboYAxis {
  max?: number;
  min?: number;
  tickCount?: number;
  leftConfig?: ComboYAxisConfig;
  rightConfig?: ComboYAxisConfig;
}

export interface ComboLegendConfig {
  visible?: boolean;
  marker?: {
    symbol?: string;
    style?: any;
  };
  text?: {
    style?: TextStyle;
    formatter?: (value: string) => string;
  };
}

export interface LineConfig {
  color?: string | string[];
  lineSize?: number;
  smooth?: boolean;
  connectNull?: boolean;
  point?: {
    visible?: boolean;
    shape?: PointShape;
    size?: number;
    color?: string;
    style?: GraphicStyle;
  };
  lineStyle?: LineStyle | ((...args: any[]) => LineStyle);
  label?: any;
}

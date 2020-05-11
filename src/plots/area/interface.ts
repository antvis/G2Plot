import {
  Label,
  LineStyle,
  TextStyle,
  GraphicStyle,
  ICatAxis,
  ITimeAxis,
  IValueAxis,
  ISliderInteractionConfig,
  IScrollbarInteractionConfig,
} from '../../interface/config';
import { ViewConfig } from '../../base/view-layer';

export interface IAreaPointLabel extends Label {
  type: 'area-point';
}

export interface IAreaPointAutoLabel extends Label {
  type: 'area-point-auto';
  /** area-point-auto 暗色配置 */
  darkStyle?: TextStyle;
  /** area-point-auto 亮色配置 */
  lightStyle?: TextStyle;
}

export type IAreaLabel = IAreaPointLabel | IAreaPointAutoLabel | Label;

export type AreaInteraction =
  | { type: 'slider'; cfg: ISliderInteractionConfig }
  | { type: 'scrollbar'; cfg?: IScrollbarInteractionConfig };

export interface AreaViewConfig extends ViewConfig {
  areaStyle?: GraphicStyle | ((...args: any) => GraphicStyle);
  seriesField?: string;
  xAxis?: ICatAxis | ITimeAxis | IValueAxis;
  yAxis?: IValueAxis;
  line?: {
    visible?: boolean;
    color?: string;
    size?: number;
    style?: LineStyle;
  };
  point?: {
    visible?: boolean;
    color?: string;
    size?: number;
    shape?: string;
    style?: GraphicStyle;
  };
  smooth?: boolean;
  interactions?: AreaInteraction[];
  label?: IAreaLabel;
}

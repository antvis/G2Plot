import { ConversionTagOptions } from '../../components/conversion-tag';
import {
  TextStyle,
  Label,
  GraphicStyle,
  ICatAxis,
  IValueAxis,
  ISliderInteractionConfig,
  IScrollbarInteractionConfig,
} from '../../interface/config';
import { ViewConfig } from '../../base/view-layer';

export interface IColumnLabel extends Label {
  position?: string | 'top' | 'middle' | 'bottom';
  adjustPosition?: boolean;
  adjustColor?: boolean;
}

export interface IColumnAutoLabel extends Label {
  /** column-auto 下暗色配置 */
  darkStyle?: TextStyle;
  /** column-auto 下亮色配置 */
  lightStyle?: TextStyle;
}

export type ColumnInteraction =
  | { type: 'slider'; cfg: ISliderInteractionConfig }
  | { type: 'scrollbar'; cfg?: IScrollbarInteractionConfig };

export interface ColumnViewConfig extends ViewConfig {
  colorField?: string;
  // 百分比, 数值, 最小最大宽度
  columnSize?: number;
  columnStyle?: GraphicStyle | ((...args: any[]) => GraphicStyle);
  xAxis?: ICatAxis;
  yAxis?: IValueAxis;
  conversionTag?: ConversionTagOptions;
  label?: IColumnLabel | IColumnAutoLabel;
  interactions?: ColumnInteraction[];
}

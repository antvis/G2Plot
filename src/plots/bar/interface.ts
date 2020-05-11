import { ConversionTagOptions } from '../../components/conversion-tag';
import {
  TextStyle,
  Label,
  GraphicStyle,
  ICatAxis,
  IValueAxis,
  IInteractions,
  IScrollbarInteractionConfig,
} from '../../interface/config';
import { ViewConfig } from '../../base/view-layer';

export interface IBarLabel extends Label {
  position?: string | 'left' | 'middle' | 'right';
  adjustPosition?: boolean;
  adjustColor?: boolean;
}

export interface IBarAutoLabel extends Label {
  /** column-auto 下暗色配置 */
  darkStyle?: TextStyle;
  /** column-auto 下亮色配置 */
  lightStyle?: TextStyle;
}

export type BarInteraction = { type: 'scrollbar'; cfg?: IScrollbarInteractionConfig } | IInteractions;

export interface BarViewConfig extends ViewConfig {
  colorField?: string;
  barSize?: number;
  barStyle?: GraphicStyle | ((...args: any[]) => GraphicStyle);
  xAxis?: IValueAxis;
  yAxis?: ICatAxis;
  label?: IBarLabel | IBarAutoLabel;
  conversionTag?: ConversionTagOptions;
  interactions?: BarInteraction[];
}

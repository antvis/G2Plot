import { TooltipOption } from '@antv/g2/lib/interface';
import { Datum } from './common';

export type Tooltip = TooltipOption;

export type TinyTooltipOption = {
  /** tootip body模版语言 */
  readonly formatter?: (datum: Datum) => string;
  /** 获取tooltip内部dom节点覆写样式 */
  readonly domStyles?: object;
  /** tooltip定位位置 */
  readonly position?: 'top' | 'bottom' | 'left' | 'right';
  /** tooltip偏移位置 */
  readonly offset?: number;
  /** 是否显示交叉线 */
  readonly showCrosshairs?: boolean;
  /** 是否显示 tooltip 数据点 marker */
  readonly showMarkers?: boolean;
};

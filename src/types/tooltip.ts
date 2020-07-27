import { TooltipOption } from '@antv/g2/lib/interface';

export type Tooltip = TooltipOption;

export type TinyTooltipOption = {
  /** tootip body模版语言 */
  readonly formatter?: (x: number, y: number) => string;
  /** 获取tooltip内部dom节点覆写样式 */
  readonly domStyles?: object;
  /** tooltip定位位置 */
  readonly position?: 'top' | 'bottom' | 'left' | 'right';
  /** tooltip偏移位置 */
  readonly offset?: number;
  /** 是否显示交叉线 */
  readonly showCrosshairs?: boolean;
};

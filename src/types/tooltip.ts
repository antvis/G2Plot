import { TooltipCfg } from '@antv/g2/lib/interface';
import { TooltipAttr } from '../types/attr';

export type TooltipMapping = {
  /** 指定需要显示 tooltip 中的字段，默认是包含 x seriesFields y  */
  readonly fields?: string[];
  /** value 格式化 **/
  readonly formatter?: TooltipAttr;
};

export type TooltipOptions = TooltipCfg & TooltipMapping;

export type Tooltip = false | TooltipOptions;

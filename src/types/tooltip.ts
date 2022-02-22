import { Types } from '@antv/g2';
import { TooltipAttr } from '../types/attr';

export type TooltipMapping = {
  /**
   * @title 映射字段
   * @description 指定需要显示 tooltip 中的字段，默认是包含 x seriesFields y
   */
  readonly fields?: string[] | false;
  /**
   * @title value 格式化
   */
  readonly formatter?: TooltipAttr;
};

export type TooltipOptions = Types.TooltipCfg & TooltipMapping;

export type Tooltip = false | TooltipOptions;

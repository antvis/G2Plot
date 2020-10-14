import { TooltipCfg } from '@antv/g2/lib/interface';

export type Tooltip =
  | false
  | (TooltipCfg & {
      /** 兼容 v1 formatter **/
      readonly formatter?: TooltipCfg['customContent'];
    });

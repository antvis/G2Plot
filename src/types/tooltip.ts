import { TooltipCfg } from '@antv/g2/lib/interface';

export type Tooltip =
  | false
  | (TooltipCfg & {
      /** value 格式化 **/
      readonly formatter?: (item: any) => string;
    });

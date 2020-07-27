import { TooltipOption } from '@antv/g2/lib/interface';

export type Tooltip = TooltipOption;

export type TinyTooltipOption = {
  formatter?: (x: number, y: number) => string;
  domStyles?: object;
  position?: 'top' | 'bottom' | 'left' | 'right';
  offset?: number;
  showCrosshairs?: boolean;
};

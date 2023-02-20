import { ConditionRangeProps } from 'adaptor/conditionRange';
import type { Options } from '../../types/common';

export type ColumnOptions = Options & {
  type?: 'G2PlotColumn' | ((...args: any) => any);
  width?: number;
  height?: number;
  conditionRangeY?: ConditionRangeProps;
  style?: {
    /** Whether to show background. */
    background?: boolean;
    [k: string]: any;
  };
};

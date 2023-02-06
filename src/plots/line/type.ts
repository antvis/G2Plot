import type { Options } from '../../types/common';
import type { ConditionRangeProps } from '../../adaptor/conditionRange';

export type LineOptions = Options & {
  type?: 'G2PlotLine' | Function;
  width?: number;
  height?: number;
  conditionRangeY?: ConditionRangeProps;
  style?: {
    /** Whether to display the point mark. */
    point?: boolean;
    /** Whether to display the area mark. */
    area?: boolean;
    [k: string]: any;
  };
};

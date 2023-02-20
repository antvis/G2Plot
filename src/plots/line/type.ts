import type { ConditionRangeProps } from '../../adaptor/conditionRange';
import type { Options } from '../../types/common';

export type LineOptions = Options & {
  type?: string | ((...args: any) => any);
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

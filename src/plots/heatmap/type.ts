import { MarkTypes } from '@antv/g2';
import type { Options } from '../../types/common';

export type HeatmapOptions = Options & {
  /** 热力图类型 */
  mark?: MarkTypes;
};

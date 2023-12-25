import type { Options } from '../../types/common';

export type HistogramOptions = Options & {
  binField: string;
  binWidth: number;
  binNumber: number;
  /**
   * @title 通道
   */
  channel?: string;
};

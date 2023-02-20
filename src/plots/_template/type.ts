import type { Options } from '../../types/common';

export type PlotOptions = Options & {
  type?: string | ((...args: any) => any);
  width?: number;
  height?: number;
};

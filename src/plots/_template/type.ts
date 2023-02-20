import type { Options } from '../../types/common';

export type PlotOptions = Options & {
  type?: 'G2PlotXXX' | ((...args: any) => any);
  width?: number;
  height?: number;
};

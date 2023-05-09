import type { Chart, G2Spec } from '@antv/g2';

export type Options = G2Spec & {
  [key: string]: any;
};

export type Adaptor<P = Options> = {
  chart: Chart;
  options: P;
};

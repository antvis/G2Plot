import { Chart, G2Spec, ChartOptions } from '@antv/g2';

export type Options = G2Spec & ChartOptions;

export type Adaptor<P = Options> = {
  chart: Chart;
  options: P;
};

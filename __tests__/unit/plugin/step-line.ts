import { Params, Options } from '../../../src';

export interface StepLineOption extends Options {
  readonly xField: string;
  readonly yField: string;
  readonly stepType?: 'vh' | 'hv' | 'vhv' | 'hvh';
}

/** 这个方法作为一个包 export 出去 */
export function StepLineAdaptor(params: Params<StepLineOption>): Params<StepLineOption> {
  const { chart, options } = params;
  const { xField, yField, stepType = 'vh', data } = options;

  chart.line().position(`${xField}*${yField}`).shape(stepType);
  chart.data(data);

  return params;
}

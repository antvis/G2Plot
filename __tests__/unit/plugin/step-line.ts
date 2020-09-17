import { Params, Options } from '../../../src';

type StepType = 'vh' | 'hv' | 'vhv' | 'hvh';

export interface StepLineOption extends Options {
  readonly xField: string;
  readonly yField: string;
  readonly stepType?: StepType;
}

/** 这个方法作为一个包 export 出去 */
export function adaptor(params: Params<StepLineOption>): Params<StepLineOption> {
  const { chart, options } = params;
  const { xField, yField, stepType, data } = options;

  chart.line().position(`${xField}*${yField}`).shape(stepType);
  chart.data(data);

  return params;
}

/** 默认配置 */
export const defaultOptions = {
  stepType: 'vh' as StepType,
};

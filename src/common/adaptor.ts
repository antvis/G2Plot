/**
 * @file 通用的一些 adaptor
 */
import { Params } from '../core/adaptor';
import { Options } from '../types';

/**
 * 通用 tooltip 配置
 * @param params
 */
export function tooltip<O extends Options>(params: Params<O>): Params<O> {
  const { chart, options } = params;
  const { tooltip } = options;

  if (tooltip) {
    chart.tooltip(tooltip);
  }

  return params;
}

/**
 * @file 通用的一些 adaptor
 */
import { each } from '@antv/util';
import { Params } from '../core/adaptor';
import { Options } from '../types';
import { Interaction } from '../types/interaction';

/**
 * 通用 tooltip 配置
 * @param params
 */
export function tooltip<O extends Options>(params: Params<O>): Params<O> {
  const { chart, options } = params;
  const { tooltip } = options;

  if (tooltip !== undefined) {
    chart.tooltip(tooltip);
  }

  return params;
}

/**
 * Interaction 配置
 * @param params
 */
export function interaction<O extends Options>(params: Params<O>): Params<O> {
  const { chart, options } = params;
  const { interactions } = options;

  each(interactions, (i: Interaction) => {
    chart.interaction(i.name, i.cfg || {});
  });

  return params;
}

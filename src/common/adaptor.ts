/**
 * @file 通用的一些 adaptor
 */
import { Geometry } from '@antv/g2';
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

/**
 * 动画
 * @param params
 */
export function animation<O extends Options>(params: Params<O>): Params<O> {
  const { chart, options } = params;
  const { animation } = options;

  // 所有的 Geometry 都使用同一动画（各个图形如有区别，自行覆盖）
  each(chart.geometries, (g: Geometry) => {
    g.animate(animation);
  });

  return params;
}

/**
 * 设置全局主题配置
 * @param params
 */
export function theme<O extends Options>(params: Params<O>): Params<O> {
  const { chart, options } = params;
  const { theme } = options;

  // 存在主题才设置主题
  if (theme) {
    chart.theme(theme);
  }
  return params;
}

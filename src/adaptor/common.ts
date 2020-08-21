/**
 * @file 通用的一些 adaptor
 */
import { Geometry } from '@antv/g2';
import { each } from '@antv/util';
import { Params } from '../core/adaptor';
import { Options } from '../types';
import { Interaction } from '../types/interaction';

/**
 * 通用 legend 配置, 适用于带 colorField 的图表
 * @param params
 */
export function legend<O extends Pick<Options, 'legend'> & { colorField?: string }>(params: Params<O>): Params<O> {
  const { chart, options } = params;
  const { legend, colorField } = options;

  if (legend === false) {
    chart.legend(false);
  } else if (colorField) {
    chart.legend(colorField, legend);
  }

  return params;
}

/**
 * 通用 tooltip 配置
 * @param params
 */
export function tooltip<O extends Pick<Options, 'tooltip'>>(params: Params<O>): Params<O> {
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
export function interaction<O extends Pick<Options, 'interactions'>>(params: Params<O>): Params<O> {
  const { chart, options } = params;
  const { interactions } = options;

  each(interactions, (i: Interaction) => {
    chart.interaction(i.type, i.cfg || {});
  });

  return params;
}

/**
 * 动画
 * @param params
 */
export function animation<O extends Pick<Options, 'animation'>>(params: Params<O>): Params<O> {
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
export function theme<O extends Pick<Options, 'theme'>>(params: Params<O>): Params<O> {
  const { chart, options } = params;
  const { theme } = options;

  // 存在主题才设置主题
  if (theme) {
    chart.theme(theme);
  }
  return params;
}

/**
 * 状态 state 配置
 * @param params
 */
export function state(params: Params<Options>): Params<Options> {
  const { chart, options } = params;
  const { state } = options;

  if (state) {
    each(chart.geometries, (geometry: Geometry) => {
      geometry.state(state);
    });
  }

  return params;
}

/**
 * 处理缩略轴的 adaptor
 * @param params
 */
export function slider(params: Params<Options>): Params<Options> {
  const { chart, options } = params;
  const { slider } = options;

  chart.option('slider', slider);

  return params;
}

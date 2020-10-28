import { interaction, animation, theme, scale, tooltip, legend } from '../../adaptor/common';
import { Params } from '../../core/adaptor';
import { flow } from '../../utils';
import { RadialBarOptions } from './types';

/**
 * geometry 处理
 * @param params
 */
function geometry(params: Params<RadialBarOptions>): Params<RadialBarOptions> {
  const { chart, options } = params;
  const { data, xField, yField, barStyle, color } = options;
  chart.data(data);
  const interval = chart.interval().position(`${xField}*${yField}`);
  if (barStyle) {
    interval.style(barStyle);
  }
  if (color) {
    interval.color(`${yField}`, color);
  }
  return params;
}

/**
 * meta 配置
 * @param params
 */
export function meta(params: Params<RadialBarOptions>): Params<RadialBarOptions> {
  const { options } = params;
  const { xField, yField } = options;
  return flow(
    scale({
      [xField]: false,
      [yField]: {
        min: 0,
        max: 2,
      },
    })
  )(params);
}

/**
 * coordinate 配置
 * @param params
 */
function coordinate(params: Params<RadialBarOptions>): Params<RadialBarOptions> {
  const { chart } = params;
  chart
    .coordinate({
      type: 'polar',
      cfg: {
        innerRadius: 0.1,
      },
    })
    .transpose();
  return params;
}

/**
 * axis 配置
 * @param params
 */
export function axis(params: Params<RadialBarOptions>): Params<RadialBarOptions> {
  const { chart, options } = params;
  const { xField } = options;
  chart.axis(xField, {
    grid: null,
    tickLine: null,
    line: null,
  });
  return params;
}

/**
 * 图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<RadialBarOptions>) {
  // flow 的方式处理所有的配置到 G2 API
  return flow(
    geometry,
    meta,
    axis,
    coordinate,
    interaction,
    animation,
    theme,
    tooltip,
    legend
    // ... 其他的 adaptor flow
  )(params);
}

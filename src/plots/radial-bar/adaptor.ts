import { deepMix } from '@antv/util';
import { interaction, animation, theme, scale, tooltip, legend } from '../../adaptor/common';
import { Params } from '../../core/adaptor';
import { flow } from '../../utils';
import { interval } from '../../adaptor/geometries';
import { RadialBarOptions } from './types';
import { getScaleMax } from './utils';

/**
 * geometry 处理
 * @param params
 */
function geometry(params: Params<RadialBarOptions>): Params<RadialBarOptions> {
  const { chart, options } = params;
  const { data, barStyle: style, color, tooltip } = options;
  chart.data(data);
  const p = deepMix({}, params, {
    options: {
      tooltip,
      interval: {
        style,
        color,
      },
    },
  });
  interval(p);
  return params;
}

/**
 * meta 配置
 * @param params
 */
export function meta(params: Params<RadialBarOptions>): Params<RadialBarOptions> {
  const { options } = params;
  const { xField, yField, data, maxRadian } = options;
  return flow(
    scale({
      [yField]: {
        min: 0,
        // max:2,
        max: getScaleMax(maxRadian, yField, data),
      },
    })
  )(params);
}

/**
 * coordinate 配置
 * @param params
 */
function coordinate(params: Params<RadialBarOptions>): Params<RadialBarOptions> {
  const { chart, options } = params;
  const { radius, innerRadius } = options;

  chart
    .coordinate({
      type: 'polar',
      cfg: {
        radius,
        innerRadius,
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
  return flow(geometry, meta, axis, coordinate, interaction, animation, theme, tooltip, legend)(params);
}

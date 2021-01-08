import { interaction, animation, theme, scale, tooltip, legend, annotation } from '../../adaptor/common';
import { Params } from '../../core/adaptor';
import { flow, deepAssign } from '../../utils';
import { interval, point } from '../../adaptor/geometries';
import { RadialBarOptions } from './types';
import { getScaleMax } from './utils';

/**
 * geometry 处理
 * @param params
 */
function geometry(params: Params<RadialBarOptions>): Params<RadialBarOptions> {
  const { chart, options } = params;
  const { data, barStyle: style, color, tooltip, colorField, type, xField, yField } = options;
  chart.data(data);
  const p = deepAssign({}, params, {
    options: {
      tooltip,
      seriesField: colorField,
      interval: {
        style,
        color,
        shape: type === 'line' ? 'line' : 'intervel',
      },
      // 柱子的一些样式设置：柱子最小宽度、柱子最大宽度、柱子背景
      minColumnWidth: options.minBarWidth,
      maxColumnWidth: options.maxBarWidth,
      columnBackground: options.barBackground,
    },
  });
  interval(p);
  if (type === 'line') {
    point({
      chart,
      options: { xField, yField, seriesField: colorField, point: { shape: 'circle', color } },
    });
  }
  return params;
}

/**
 * meta 配置
 * @param params
 */
export function meta(params: Params<RadialBarOptions>): Params<RadialBarOptions> {
  const { options } = params;
  const { yField, data, maxAngle } = options;
  return flow(
    scale({
      [yField]: {
        min: 0,
        max: getScaleMax(maxAngle, yField, data),
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
  const { xField, xAxis } = options;
  chart.axis(xField, xAxis);
  return params;
}

/**
 * 图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<RadialBarOptions>) {
  return flow(geometry, meta, axis, coordinate, interaction, animation, theme, tooltip, legend, annotation())(params);
}

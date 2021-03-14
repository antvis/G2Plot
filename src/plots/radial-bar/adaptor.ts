import { filter, isNil } from '@antv/util';
import { interaction, animation, theme, scale, tooltip, legend, annotation } from '../../adaptor/common';
import { Params } from '../../core/adaptor';
import { flow, deepAssign } from '../../utils';
import { interval } from '../../adaptor/geometries';
import { log, LEVEL } from '../../utils';
import { RadialBarOptions } from './types';
import { getScaleMax } from './utils';

function data(params: Params<RadialBarOptions>): Params<RadialBarOptions> {
  const { chart, options } = params;
  const { data } = options;
  const { yField } = options;
  // 处理不合法的数据
  const processData = filter(data, (d) => typeof d[yField] === 'number' || isNil(d[yField]));

  // 打印异常数据情况
  log(LEVEL.WARN, processData.length === data.length, 'illegal data existed in chart data.');

  chart.data(processData);

  return params;
}
/**
 * geometry 处理
 * @param params
 */
function geometry(params: Params<RadialBarOptions>): Params<RadialBarOptions> {
  const { chart, options } = params;
  const { barStyle: style, color, tooltip, colorField, type, xField, yField } = options;
  const p = deepAssign({}, params, {
    options: {
      tooltip,
      seriesField: colorField,
      interval: {
        style,
        color,
        shape: type === 'line' ? 'line' : 'intervel',
      },
    },
  });
  interval(p);
  if (type === 'line') {
    chart.point().position(`${xField}*${yField}`).shape('circle');
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
  return flow(
    data,
    geometry,
    meta,
    axis,
    coordinate,
    interaction,
    animation,
    theme,
    tooltip,
    legend,
    annotation()
  )(params);
}

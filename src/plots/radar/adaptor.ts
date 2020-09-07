import { deepMix } from '@antv/util';
import { Params } from '../../core/adaptor';
import { tooltip, interaction, animation, theme, scale } from '../../adaptor/common';
import { area, point, line } from '../../adaptor/geometries';
import { flow } from '../../utils';
import { RadarOptions } from './types';

/**
 * geometry 配置处理
 * @param params
 */
function geometry(params: Params<RadarOptions>): Params<RadarOptions> {
  const { chart, options } = params;
  const { data, lineStyle, smooth } = options;

  chart.data(data);

  // line geometry 处理
  return flow(line)(deepMix({}, params, { options: { line: { smooth, style: lineStyle } } }));
}

/**
 * meta 配置
 * @param params
 */
function meta(params: Params<RadarOptions>): Params<RadarOptions> {
  const { options } = params;
  const { xAxis, yAxis, xField, yField } = options;

  return flow(
    scale({
      [xField]: xAxis,
      [yField]: yAxis,
    })
  )(params);
}

/**
 * coord 配置
 * @param params
 */
function coord(params: Params<RadarOptions>): Params<RadarOptions> {
  const { chart, options } = params;
  const { radius } = options;

  chart.coordinate('polar', {
    radius,
  });
  return params;
}

/**
 * axis 配置
 * @param params
 */
function axis(params: Params<RadarOptions>): Params<RadarOptions> {
  const { chart, options } = params;
  const { xField, xAxis, yField, yAxis } = options;

  chart.axis(xField, xAxis);
  chart.axis(yField, yAxis);

  return params;
}

/**
 * legend 配置
 * @param params
 */
function legend(params: Params<RadarOptions>): Params<RadarOptions> {
  return params;
}

/**
 * label 配置
 * @param params
 */
function label(params: Params<RadarOptions>): Params<RadarOptions> {
  return params;
}

/**
 * 雷达图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<RadarOptions>) {
  // flow 的方式处理所有的配置到 G2 API
  return flow(
    geometry,
    meta,
    // 雷达图 point geometry 处理
    point,
    // 雷达图 area geometry 处理
    area,
    theme,
    coord,
    axis,
    legend,
    tooltip,
    label,
    interaction,
    animation
  )(params);
}

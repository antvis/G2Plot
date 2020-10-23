import { interaction, animation, theme, scale } from '../../adaptor/common';
import { Params } from '../../core/adaptor';
import { flow } from '../../utils';
import { RadialBarOptions } from './types';

/**
 * geometry 处理
 * @param params
 */
function geometry(params: Params<RadialBarOptions>): Params<RadialBarOptions> {
  const { chart, options } = params;
  const { data, xField, yField } = options;

  chart.data(data);

  chart.interval().position(`${xField}*${yField}`);

  return params;
}

/**
 * meta 配置
 * @param params
 */
export function meta(params: Params<RadialBarOptions>): Params<RadialBarOptions> {
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
 * 图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<RadialBarOptions>) {
  // flow 的方式处理所有的配置到 G2 API
  return flow(
    geometry,
    meta,
    interaction,
    animation,
    theme
    // ... 其他的 adaptor flow
  )(params);
}

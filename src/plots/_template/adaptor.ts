import { animation, interaction, scale, theme } from '../../adaptor/common';
import { Params } from '../../core/adaptor';
import { flow } from '../../utils';
import { TemplateOptions } from './types';

/**
 * geometry 处理
 * @param params
 */
function geometry(params: Params<TemplateOptions>): Params<TemplateOptions> {
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
export function meta(params: Params<TemplateOptions>): Params<TemplateOptions> {
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
export function adaptor(params: Params<TemplateOptions>) {
  // flow 的方式处理所有的配置到 G2 API
  return flow(
    theme,
    geometry,
    meta,
    interaction,
    animation
    // ... 其他的 adaptor flow
  )(params);
}

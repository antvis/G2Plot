import { interaction, animation, theme, scale } from '../../adaptor/common';
import { Params } from '../../core/adaptor';
import { flow } from '../../utils';
import { SankeyOptions } from './types';

/**
 * geometry 处理
 * @param params
 */
function geometry(params: Params<SankeyOptions>): Params<SankeyOptions> {
  const { chart, options } = params;
  const { data, sourceField, targetField, weightField } = options;

  chart.data(data);

  chart.interval().position(`${sourceField}*${targetField}`).color(weightField);

  return params;
}

/**
 * 图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<SankeyOptions>) {
  // flow 的方式处理所有的配置到 G2 API
  return flow(
    geometry,
    scale({}),
    interaction,
    animation,
    theme
    // ... 其他的 adaptor flow
  )(params);
}

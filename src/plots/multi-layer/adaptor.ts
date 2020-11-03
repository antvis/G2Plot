import { interaction, animation, theme, scale } from '../../adaptor/common';
import { Params } from '../../core/adaptor';
import { flow } from '../../utils';
import { MultiLayerOptions } from './types';

/**
 * geometry 处理
 * @param params
 */
function geometry(params: Params<MultiLayerOptions>): Params<MultiLayerOptions> {
  const { chart, options } = params;

  return params;
}

/**
 * meta 配置
 * @param params
 */
export function meta(params: Params<MultiLayerOptions>): Params<MultiLayerOptions> {
  const { options } = params;

  return flow(scale({}))(params);
}
/**
 * 图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<MultiLayerOptions>) {
  return flow(
    animation,
    geometry,
    meta,
    interaction,
    animation,
    theme
    // ... 其他的 adaptor flow
  )(params);
}

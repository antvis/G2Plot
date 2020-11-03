import { interaction, animation, theme, scale } from '../../adaptor/common';
import { Params } from '../../core/adaptor';
import { flow } from '../../utils';
import { MultiViewOptions } from './types';

/**
 * geometry 处理
 * @param params
 */
function geometry(params: Params<MultiViewOptions>): Params<MultiViewOptions> {
  const { chart, options } = params;

  return params;
}

/**
 * 图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<MultiViewOptions>) {
  return flow(
    animation, // 多 view 的图，动画配置放到最前面
    geometry,
    interaction,
    animation,
    theme
    // ... 其他的 adaptor flow
  )(params);
}

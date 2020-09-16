import { Params } from '../../core/adaptor';
import { flow } from '../../utils';
import { scale, animation, theme, annotation } from '../../adaptor/common';
import { geometry } from '../progress/adaptor';
import { RingProgressOptions } from './types';

/**
 * coordinate 配置
 * @param params
 */
function coordinate(params: Params<RingProgressOptions>): Params<RingProgressOptions> {
  const { chart, options } = params;
  const { innerRadius, radius } = options;

  // coordinate
  chart.coordinate('theta', {
    innerRadius,
    radius,
  });

  return params;
}

/**
 * statistic 配置
 * @param params
 */
function statistic(params: Params<RingProgressOptions>): Params<RingProgressOptions> {
  const { chart, options } = params;
  const { statistic, percent } = options;

  // 先不处理 title 了，mini 应该没有 title 的需求了。
  const { content } = statistic;

  if (content) {
    const { style, formatter, offsetX, offsetY, rotate } = content;
    chart.annotation().text({
      position: ['50%', '50%'],
      content: formatter ? formatter({ percent }) : percent,
      style,
      offsetX,
      offsetY,
      rotate,
    });
  }

  return params;
}

/**
 * 环形进度图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<RingProgressOptions>) {
  return flow(geometry, scale({}), coordinate, statistic, animation, theme, annotation())(params);
}

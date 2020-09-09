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
 * 环形进度图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<RingProgressOptions>) {
  return flow(geometry, scale({}), coordinate, animation, theme, annotation())(params);
}

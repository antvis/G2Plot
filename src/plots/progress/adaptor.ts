import { isNil } from '@antv/util';
import { Params } from '../../core/adaptor';
import { flow } from '../../utils';
import { scale, animation, theme } from '../../adaptor/common';
import { geometry } from '../ring-progress/adaptor';
import { ProgressOptions } from './types';

/**
 * coordinate 配置
 * @param params
 */
function coordinate(params: Params<ProgressOptions>): Params<ProgressOptions> {
  const { chart } = params;

  chart.coordinate('rect').transpose();

  return params;
}

/**
 * widthRatio 配置
 * @param params
 */
function widthRatio(params: Params<ProgressOptions>): Params<ProgressOptions> {
  const { chart, options } = params;
  const { barWidthRatio } = options;

  if (!isNil(widthRatio)) {
    chart.theme({
      columnWidthRatio: barWidthRatio,
    });
  }

  return params;
}

/**
 * 进度图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<ProgressOptions>) {
  return flow(geometry, scale({}), coordinate, widthRatio, animation, theme)(params);
}

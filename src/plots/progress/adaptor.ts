import { isFunction } from '@antv/util';
import { Params } from '../../core/adaptor';
import { flow } from '../../utils';
import { ProgressOptions } from './types';
import { scale } from '../../adaptor/common';

/**
 * 字段
 * @param params
 */
function field(params: Params<ProgressOptions>): Params<ProgressOptions> {
  const { chart, options } = params;
  const { percent, color } = options;

  const data = [
    {
      type: 'current',
      percent: percent,
    },
    {
      type: 'target',
      percent: 1 - percent,
    },
  ];

  chart.data(data);

  const geometry = chart.interval().position('1*percent').adjust('stack');
  const values = isFunction(color) ? color(percent) : color || ['#FAAD14', '#E8EDF3'];

  geometry.color('type', values);

  return params;
}

/**
 * axis 配置
 * @param params
 */
function axis(params: Params<ProgressOptions>): Params<ProgressOptions> {
  const { chart } = params;

  chart.axis(false);

  return params;
}

/**
 * legend 配置
 * @param params
 */
function legend(params: Params<ProgressOptions>): Params<ProgressOptions> {
  const { chart } = params;

  chart.legend(false);

  return params;
}

/**
 * tooltip 配置
 * @param params
 */
function tooltip(params: Params<ProgressOptions>): Params<ProgressOptions> {
  const { chart } = params;

  chart.tooltip(false);

  return params;
}

/**
 * 样式
 * @param params
 */
function style(params: Params<ProgressOptions>): Params<ProgressOptions> {
  const { chart, options } = params;
  const { progressStyle } = options;

  const geometry = chart.geometries[0];
  if (progressStyle && geometry) {
    if (isFunction(progressStyle)) {
      geometry.style('1*percent*type', progressStyle);
    } else {
      geometry.style(progressStyle);
    }
  }
  return params;
}

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
 * 进度图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<ProgressOptions>) {
  return flow(field, scale({}), axis, legend, tooltip, style, coordinate)(params);
}

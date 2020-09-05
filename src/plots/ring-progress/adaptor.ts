import { isFunction, isArray } from '@antv/util';
import { Params } from '../../core/adaptor';
import { flow } from '../../utils';
import { scale, animation, theme } from '../../adaptor/common';
import { RingProgressOptions } from './types';

/**
 * 图形
 * @param params
 */
export function geometry(params: Params<RingProgressOptions>): Params<RingProgressOptions> {
  const { chart, options } = params;
  const { percent, color, progressStyle } = options;

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

  // geometry
  const geometry = chart.interval().position('1*percent').adjust('stack');

  // color
  if (color) {
    if (isArray(color)) {
      geometry.color('type', color);
    } else {
      geometry.color('type', (type: string): string => {
        return isFunction(color) ? color(percent, type) : color;
      });
    }
  }

  // style
  if (progressStyle) {
    geometry.style('percent*type', (percent: number, type: string) => {
      return isFunction(progressStyle) ? progressStyle(percent, type) : progressStyle;
    });
  }

  chart.tooltip(false);
  chart.axis(false);
  chart.legend(false);

  return params;
}

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
  return flow(geometry, scale({}), coordinate, animation, theme)(params);
}

import { isFunction, isArray } from '@antv/util';
import { Params } from '../../core/adaptor';
import { flow } from '../../utils';
import { scale, animation, theme } from '../../adaptor/common';
import { RingProgressOptions } from './types';

/**
 * 字段
 * @param params
 */
function field(params: Params<RingProgressOptions>): Params<RingProgressOptions> {
  const { chart, options } = params;
  const { percent, color, progressStyle, innerRadius, radius } = options;

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

  // coordinate
  chart.coordinate('theta', {
    innerRadius,
    radius,
  });

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
 * 环形进度图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<RingProgressOptions>) {
  return flow(field, scale({}), animation, theme)(params);
}

import { isString, clamp } from '@antv/util';
import { Params } from '../../core/adaptor';
import { flow, deepAssign } from '../../utils';
import { scale, animation, theme, annotation } from '../../adaptor/common';
import { interval } from '../../adaptor/geometries';
import { ProgressOptions } from './types';
import { DEFAULT_COLOR } from './constant';

/**
 * 字段
 * @param params
 */
export function geometry(params: Params<ProgressOptions>): Params<ProgressOptions> {
  const { chart, options } = params;
  const { percent, progressStyle, color, barWidthRatio } = options;

  const clampPercent = clamp(percent, 0, 1);
  const data = [
    {
      type: 'current',
      percent: clampPercent,
    },
    {
      type: 'target',
      percent: 1 - clampPercent,
    },
  ];

  chart.data(data);

  const p = deepAssign({}, params, {
    options: {
      xField: '1',
      yField: 'percent',
      seriesField: 'type',
      isStack: true,
      widthRatio: barWidthRatio,
      interval: {
        style: progressStyle,
        color: isString(color) ? [color, DEFAULT_COLOR[1]] : color,
      },
    },
  });

  interval(p);

  // 关闭组件
  chart.tooltip(false);
  chart.axis(false);
  chart.legend(false);

  return params;
}

/**
 * other 配置
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
  // @ts-ignore
  return flow(geometry, scale({}), coordinate, animation, theme, annotation())(params);
}

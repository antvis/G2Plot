import { deepMix } from '@antv/util';
import { Params } from '../../core/adaptor';
import { flow } from '../../utils';
import { scale, animation, theme, annotation } from '../../adaptor/common';
import { interval } from '../../adaptor/geometries';
import { ProgressOptions } from './types';

/**
 * 字段
 * @param params
 */
function geometry(params: Params<ProgressOptions>): Params<ProgressOptions> {
  const { chart, options } = params;
  const { percent, progressStyle, color, barWidthRatio } = options;

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

  const p = deepMix({}, params, {
    options: {
      xField: '1',
      yField: 'percent',
      seriesField: 'type',
      isStack: true,
      widthRatio: barWidthRatio,
      interval: {
        style: progressStyle,
        color,
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

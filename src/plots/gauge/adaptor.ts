import { get } from '@antv/util';
import { interaction, animation, theme, scale } from '../../adaptor/common';
import { Params } from '../../core/adaptor';
import { Data } from '../../types';
import { flow } from '../../utils';
import { GaugeOptions } from './types';
import { processRangeData } from './utils';

/**
 * geometry 处理
 * @param params
 */
function geometry(params: Params<GaugeOptions>): Params<GaugeOptions> {
  const { chart, options } = params;
  const { percent, range } = options;

  // 指标
  const indicatorData = [{ percent }];
  const v1 = chart.createView();
  v1.data(indicatorData);

  // 辅助 range
  const rangeData: Data = processRangeData(get(range, 'ticks', []) as number[], 'range');
  const v2 = chart.createView();
  v2.data(rangeData);

  return params;
}

/**
 * meta 配置
 * @param params
 */
export function meta(params: Params<GaugeOptions>): Params<GaugeOptions> {
  return flow(
    scale({
      range: {
        min: 0,
        max: 1,
      },
    })
  )(params);
}
/**
 * 图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<GaugeOptions>) {
  // flow 的方式处理所有的配置到 G2 API
  return flow(
    geometry,
    meta,
    interaction,
    animation,
    theme
    // ... 其他的 adaptor flow
  )(params);
}

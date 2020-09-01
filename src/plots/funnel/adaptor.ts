import { deepMix } from '@antv/util';
import { isFunction } from '@antv/util';
import { Params } from '../../core/adaptor';
import { tooltip, interaction, animation, theme } from '../../adaptor/common';
import { flow, findGeometry } from '../../utils';
import { FunnelAdaptorOptions } from './types';
import basicFunnel from './geometries/basic';
import compareFunnel from './geometries/compare';
import dynamicHeightFunnel from './geometries/dynamic-height';

/**
 *
 * 各式漏斗图实现细节有较大不同
 * 1. 普通漏斗图：interval.shape('funnel')
 * 2. 对比漏斗图：分面
 * 3. 动态高度漏斗图：polypon
* /

/**
 * geometry处理
 * @param params
 */
function geometry(params: Params<FunnelAdaptorOptions>): Params<FunnelAdaptorOptions> {
  const { options } = params;
  const { compareField, dynamicHeight } = options;
  if (compareField) {
    return compareFunnel(params);
  }
  if (dynamicHeight) {
    return dynamicHeightFunnel(params);
  }

  return basicFunnel(params);
}

/**
 * 坐标轴
 * @param params
 */
function axis(params: Params<FunnelAdaptorOptions>): Params<FunnelAdaptorOptions> {
  const { chart } = params;
  chart.axis(false);
  return params;
}

/**
 * 漏斗图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<FunnelAdaptorOptions>) {
  // flow 的方式处理所有的配置到 G2 API
  return flow(geometry, axis, tooltip, interaction, animation, theme)(params);
}

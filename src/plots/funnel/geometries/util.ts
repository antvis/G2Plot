import { Params } from '../../../core/adaptor';
import { FunnelAdaptorOptions } from '../types';

/**
 * 转置处理, 适用于普通折线图，动态高度折线图
 * @param params
 */
export function transpose(params: Params<FunnelAdaptorOptions>): Params<FunnelAdaptorOptions> {
  const { chart, options } = params;
  const { transpose } = options;
  if (!transpose) {
    chart.coordinate('rect').transpose().scale(1, -1);
  }
  return params;
}

import { Params } from '../../core/adaptor';
import { RoseOptions } from './types';
import { flow } from '../../utils';

/**
 * 玫瑰图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<RoseOptions>) {
  // flow 的方式处理所有的配置到 G2 API
  flow()(params);
}

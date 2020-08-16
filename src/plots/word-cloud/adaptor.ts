import { Params } from '../../core/adaptor';
import { WordCloudOptions } from './types';
import { flow } from '../../utils';

/**
 * 词云图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<WordCloudOptions>) {
  // flow 的方式处理所有的配置到 G2 API
  flow()(params);
}

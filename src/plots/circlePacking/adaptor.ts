import { flow, transformOptions } from '../../utils';
import type { Adaptor } from '../../types';
import type { CirclePackingOptions } from './type';

type Params = Adaptor<CirclePackingOptions>;

/**
 * @param chart
 * @param options
 */
export function adaptor(params: Params) {
  return flow(transformOptions)(params);
}

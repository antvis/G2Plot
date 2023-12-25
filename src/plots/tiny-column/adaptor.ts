import { flow, transformOptions } from '../../utils';
import { mark } from '../../adaptor';
import type { Adaptor } from '../../types';
import type { TinyColumnOptions } from './type';

type Params = Adaptor<TinyColumnOptions>;

/**
 * @param chart
 * @param options
 */
export function adaptor(params: Params) {
  return flow(mark, transformOptions)(params);
}

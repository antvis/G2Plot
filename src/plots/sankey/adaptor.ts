import { mark } from '../../adaptor';
import type { Adaptor } from '../../types';
import { flow, transformOptions } from '../../utils';
import type { SankeyOptions } from './type';

type Params = Adaptor<SankeyOptions>;

/**
 * @param chart
 * @param options
 */
export function adaptor(params: Params) {
  return flow(mark, transformOptions)(params);
}

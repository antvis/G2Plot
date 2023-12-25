import { flow, transformOptions } from '../../utils';
import { mark } from '../../adaptor';

import type { Adaptor } from '../../types';
import type { ScatterOptions } from './type';

type Params = Adaptor<ScatterOptions>;

/**
 * @param chart
 * @param options
 */
export function adaptor(params: Params) {
  return flow(mark, transformOptions)(params);
}

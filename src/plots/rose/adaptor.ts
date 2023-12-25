import { flow, transformOptions } from '../../utils';
import { coordinate } from '../../adaptor';

import type { Adaptor } from '../../types';
import type { RoseOptions } from './type';

type Params = Adaptor<RoseOptions>;

/**
 * @param chart
 * @param options
 */
export function adaptor(params: Params) {
  return flow(coordinate, transformOptions)(params);
}

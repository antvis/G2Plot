import { flow, transformOptions } from '../../utils';
import { mark } from '../../adaptor';
import type { Adaptor } from '../../types';
import type { ColumnOptions } from './type';

type Params = Adaptor<ColumnOptions>;

/**
 * @param chart
 * @param options
 */
export function adaptor(params: Params) {
  return flow(mark, transformOptions)(params);
}

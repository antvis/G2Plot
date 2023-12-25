import { coordinate } from '../../adaptor';
import { flow, transformOptions } from '../../utils';

import type { Adaptor } from '../../types';
import type { SunburstOptions } from './type';

type Params = Adaptor<SunburstOptions>;

/**
 * @param chart
 * @param options
 */
export function adaptor(params: Params) {
  /**
   * 图表差异化处理
   */
  const init = (params: Params) => {
    return params;
  };

  return flow(init, coordinate, transformOptions)(params);
}

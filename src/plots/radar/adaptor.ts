import { flow, transformOptions, get, set } from '../../utils';
import { coordinate } from '../../adaptor';

import type { Adaptor } from '../../types';
import type { RadarOptions } from './type';

type Params = Adaptor<RadarOptions>;

/**
 * @param chart
 * @param options
 */
export function adaptor(params: Params) {
  /**
   * 图表差异化处理
   */
  const init = (params: Params) => {
    set(params, 'options.coordinate', { type: get(params, 'options.coordinateType', 'polar') });
    return params;
  };

  return flow(init, coordinate, transformOptions)(params);
}

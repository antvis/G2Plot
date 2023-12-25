import { flow, transformOptions } from '../../utils';
import { mark } from '../../adaptor';
import type { Adaptor } from '../../types';
import type { BoxOptions } from './type';

type Params = Adaptor<BoxOptions>;

/**
 * @param chart
 * @param options
 */
export function adaptor(params: Params) {
  /**
   * 图表差异化处理
   */
  const init = (params: Params) => {
    const { boxType = 'box' } = params.options;
    params.options.children[0].type = boxType;
    return params;
  };

  return flow(init, mark, transformOptions)(params);
}

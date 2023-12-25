import { flow, transformOptions, set } from '../../utils';
import { mark } from '../../adaptor';
import type { Adaptor } from '../../types';
import type { TreemapOptions } from './type';

type Params = Adaptor<TreemapOptions>;

/**
 * @param chart
 * @param options
 */
export function adaptor(params: Params) {
  /**
   * 图表差异化处理
   */
  const init = (params: Params) => {
    const { options } = params;
    const { data } = options;
    if (data) {
      set(options, 'data', {
        value: data,
      });
    }
    return params;
  };

  return flow(init, mark, transformOptions)(params);
}

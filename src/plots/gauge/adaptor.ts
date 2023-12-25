import { flow, transformOptions } from '../../utils';
import { mark } from '../../adaptor';
import type { Adaptor } from '../../types';
import type { GaugeOptions } from './type';

type Params = Adaptor<GaugeOptions>;

/**
 * @param chart
 * @param options
 */
export function adaptor(params: Params) {
  /**
   * 图表差异化处理
   */
  const init = (params: Params) => {
    const { data } = params.options;

    params.options.data = {
      value: data,
    };

    return params;
  };

  return flow(init, mark, transformOptions)(params);
}

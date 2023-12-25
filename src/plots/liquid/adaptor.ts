import { flow, transformOptions, isNumber, set } from '../../utils';
import { mark } from '../../adaptor';
import type { Adaptor } from '../../types';
import type { LiquidOptions } from './type';

type Params = Adaptor<LiquidOptions>;

/**
 * @param chart
 * @param options
 */
export function adaptor(params: Params) {
  /**
   * 图表差异化处理
   */
  const init = (params: Params) => {
    const {
      options: { percent },
    } = params;

    if (isNumber(percent)) {
      set(params, 'options.data', percent);
    }
    return params;
  };

  return flow(init, mark, transformOptions)(params);
}

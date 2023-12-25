import { flow, transformOptions, set } from '../../utils';
import { mark } from '../../adaptor';
import type { Adaptor } from '../../types';
import type { TinyRingOptions } from './type';

type Params = Adaptor<TinyRingOptions>;

/**
 * @param chart
 * @param options
 */
export function adaptor(params: Params) {
  /**
   * @description radius
   */
  const radius = (params: Params) => {
    const { options } = params;
    const { radius = 0.8 } = options;
    set(params, 'options.coordinate.innerRadius', radius);
    return params;
  };

  /**
   * @description 数据转换
   */
  const transformData = (params: Params) => {
    const { options } = params;
    const { percent, color = [] } = options;
    if (!percent) return params;

    const transformOption = {
      scale: {
        color: { range: color.length ? color : [] },
      },
      data: [1, percent],
    };

    Object.assign(options, { ...transformOption });
    return params;
  };

  return flow(radius, transformData, mark, transformOptions)(params);
}

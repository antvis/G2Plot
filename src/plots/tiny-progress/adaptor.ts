import { flow, transformOptions } from '../../utils';
import { mark } from '../../adaptor';
import type { Adaptor } from '../../types';
import type { TinyProgressOptions } from './type';

type Params = Adaptor<TinyProgressOptions>;

/**
 * @param chart
 * @param options
 */
export function adaptor(params: Params) {
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

  return flow(transformData, mark, transformOptions)(params);
}

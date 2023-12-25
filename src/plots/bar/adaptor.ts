import { mark } from '../../adaptor';
import type { Adaptor } from '../../types';
import { flow, transformOptions, get, isArray, set } from '../../utils';
import type { BarOptions } from './type';

type Params = Adaptor<BarOptions>;

/**
 * @param chart
 * @param options
 */
export function adaptor(params: Params) {
  /**
   * @title 背景图
   * @description 通过新增 interval 实现
   */
  const background = (params: Params) => {
    const { options } = params;
    /**
     * @description 解决更新问题
     */
    if (get(options, 'children.length') > 1) {
      set(options, 'children', [{ type: 'interval' }]);
    }
    const { scale, markBackground, data, children } = options;
    const domain = get(scale, 'y.domain', []);
    if (markBackground && domain.length && isArray(data)) {
      const domainMax = 'domainMax';
      const backgroundData = data.map((item) => {
        return {
          ...item,
          [domainMax]: domain[domain.length - 1],
        };
      });
      children.unshift({
        type: 'interval',
        data: backgroundData,
        yField: domainMax,
        tooltip: false,
        legend: false,
        style: {
          fill: '#eee',
        },
        label: false,
        ...markBackground,
      });
    }
    return params;
  };

  return flow(background, mark, transformOptions)(params);
}

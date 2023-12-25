import { flow, transformOptions } from '../../utils';
import { mark } from '../../adaptor';
import type { Adaptor } from '../../types';
import type { HeatmapOptions } from './type';

type Params = Adaptor<HeatmapOptions>;

/**
 * @param chart
 * @param options
 */
export function adaptor(params: Params) {
  /**
   * @description 添加 tooltip 默认值
   */
  const tooltip = (params: Params) => {
    const { options } = params;
    const { tooltip, colorField, sizeField } = options;
    if (!tooltip.field) {
      tooltip.field = colorField || sizeField;
    }
    return params;
  };

  /**
   * @description 根据 mark 修改图表类型
   */
  const transformMark = (params: Params) => {
    const { options } = params;
    const { mark, children } = options;
    if (mark) {
      children[0].type = mark;
    }
    return params;
  };

  return flow(tooltip, transformMark, mark, transformOptions)(params);
}

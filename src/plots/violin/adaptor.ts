import { flow, transformOptions, set } from '../../utils';
import { mark } from '../../adaptor';
import type { Adaptor } from '../../types';
import type { ViolinOptions } from './type';

type Params = Adaptor<ViolinOptions>;

/**
 * @param chart
 * @param options
 */
export function adaptor(params: Params) {
  /**
   * 图表差异化处理
   */
  const customTransform = (params: Params) => {
    const { options } = params;
    const { xField, yField, seriesField, children } = options;

    const newChildren = children
      ?.map((item) => {
        return {
          ...item,
          xField,
          yField,
          seriesField,
          colorField: seriesField,
          data:
            item.type === 'density'
              ? {
                  transform: [
                    {
                      type: 'kde',
                      field: yField,
                      groupBy: [xField, seriesField],
                    },
                  ],
                }
              : item.data,
        };
      })
      .filter((item) => options.violinType !== 'density' || item.type === 'density');
    set(options, 'children', newChildren);
    // 默认‘normal’类型数据格式
    if (options.violinType === 'polar') {
      set(options, 'coordinate', { type: 'polar' });
    }
    // 底层不消费violinType字段。
    set(options, 'violinType', undefined);
    return params;
  };

  return flow(customTransform, mark, transformOptions)(params);
}

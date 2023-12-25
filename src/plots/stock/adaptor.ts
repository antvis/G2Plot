import { set, flow, map, transformOptions, get } from '../../utils';
import type { Adaptor } from '../../types';
import type { StockOptions } from './type';

type Params = Adaptor<StockOptions>;

export const Y_FIELD_KEY = '__stock-range__';

export const TREND_FIELD = 'trend';
export const TREND_UP = 'up';
export const TREND_DOWN = 'down';

/**
 * @param chart
 * @param options
 */
export function adaptor(params: Params) {
  const transformData = (params: Params) => {
    const { data, yField } = params.options;

    params.options.data = map(data, (item) => {
      const obj = item && { ...item };
      if (Array.isArray(yField) && obj) {
        const [open, close, high, low] = yField;
        obj[TREND_FIELD] = obj[open] <= obj[close] ? TREND_UP : TREND_DOWN;
        obj[Y_FIELD_KEY] = [obj[open], obj[close], obj[high], obj[low]];
      }
      return obj;
    });

    return params;
  };

  /**
   * 图表差异化处理
   */
  const init = (params: Params) => {
    const { options } = params;
    const { xField, yField, fallingFill, risingFill } = options;

    const [open, close, high, low] = yField;

    params.options.children = map(params.options.children, (child, index) => {
      const isShadow = index === 0;

      return {
        ...child,
        tooltip: {
          title: (d) => (d[xField] instanceof Date ? d[xField].toLocaleString() : d[xField]),
          items: [{ field: high }, { field: low }, { field: open }, { field: close }],
        },
        encode: {
          ...get(child, 'encode', {}),
          y: isShadow ? [high, low] : [open, close],
          color: (d) => Math.sign(d[close] - d[open]),
        },
        style: {
          ...(child.style || {}),
          lineWidth: isShadow ? 1 : 10,
        },
      };
    });

    delete options['yField'];

    params.options.legend = {
      color: false,
    };

    if (fallingFill) {
      set(params, 'options.scale.color.range[0]', fallingFill);
    }

    if (risingFill) {
      set(params, 'options.scale.color.range[2]', risingFill);
    }

    return params;
  };

  return flow(transformData, init, transformOptions)(params);
}

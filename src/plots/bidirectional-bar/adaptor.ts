import { mark } from '../../adaptor';
import type { Adaptor } from '../../types';
import { flow, transformOptions, set, isArray, get, isPlainObject } from '../../utils';
import { HORIZONTAL_MARGIN, AXIS_LABEL_PADDING, VERTICAL_MARGIN } from './constants';
import type { BidirectionalBarOptions } from './type';

type Params = Adaptor<BidirectionalBarOptions>;

/**
 * @param chart
 * @param options
 */
export function adaptor(params: Params) {
  /** 除了 yFiled Array 的情况 */
  const field = (params: Params) => {
    const { options } = params;
    const { yField, children } = options;
    children.forEach((child, index) => {
      set(child, 'yField', yField[index]);
    });
    return params;
  };

  /** data 拆分 */
  const data = (params: Params) => {
    const { options } = params;
    const { yField, children, data } = options;
    if (isPlainObject(data)) return params;
    const transformData = isArray(get(data, [0])) ? data : [data, data];
    children.forEach((child, index) => {
      set(child, 'data', [...transformData[index].map((item) => ({ groupKey: yField[index], ...item }))]);
    });
    return params;
  };

  /** 内置 Tooltip 逻辑 */
  const tooltip = (params: Params) => {
    const { options } = params;
    const {
      yField: [y1, y2],
      tooltip,
    } = options;
    if (!tooltip) {
      set(options, 'tooltip', {
        items: [
          {
            field: y1,
            value: y1,
          },
          {
            field: y2,
            value: y2,
          },
        ],
      });
    }
    return params;
  };

  /** 根据 layout 调整配置 */
  const layout = (params: Params) => {
    const { options } = params;
    const {
      children,
      layout,
      coordinate: { transform },
      paddingBottom = AXIS_LABEL_PADDING,
      paddingLeft = AXIS_LABEL_PADDING,
      axis,
    } = options;
    set(options, 'axisText', {
      ...(axis?.x || {}),
      layout,
    });

    const [child1, child2] = children;
    if (layout === 'vertical') {
      set(options, 'direction', 'col');
      set(options, 'paddingLeft', paddingLeft);
      set(
        options,
        'coordinate.transform',
        transform.filter((item) => item.type !== 'transpose'),
      );
      set(child1, 'paddingBottom', HORIZONTAL_MARGIN);
      set(child2, 'paddingTop', HORIZONTAL_MARGIN);
      set(child2, 'axis', {
        x: {
          position: 'top',
        },
      });
      set(child2, 'scale', {
        y: {
          range: [0, 1],
        },
      });
    } else {
      set(options, 'paddingBottom', paddingBottom);
      set(child1, 'scale', {
        y: {
          range: [0, 1],
        },
      });
      const { paddingRight = VERTICAL_MARGIN } = child1;
      const { paddingLeft = VERTICAL_MARGIN } = child2;
      set(child1, 'paddingRight', paddingRight);
      set(child1, 'axis', {
        x: {
          position: 'right',
        },
      });
      set(child2, 'paddingLeft', paddingLeft);
    }
    return params;
  };

  return flow(field, data, tooltip, layout, mark, transformOptions)(params);
}

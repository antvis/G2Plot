import { flow, transformOptions } from '../../utils';
import { mark } from '../../adaptor';
import type { Adaptor } from '../../types';
import { START_KEY, END_KEY, WATERFALL_VALUE } from './constants';
import type { WaterfallOptions } from './type';

type Params = Adaptor<WaterfallOptions>;

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
    const { data = [], yField } = options;
    if (!data.length) return params;
    data.reduce((prev, cur, index) => {
      if (index === 0 || cur.isTotal) {
        cur[START_KEY] = 0;
        cur[END_KEY] = cur[yField];
        cur[WATERFALL_VALUE] = cur[yField];
      } else {
        const start = prev[END_KEY] ?? prev[yField];
        cur[START_KEY] = start;
        cur[END_KEY] = start + cur[yField];
        cur[WATERFALL_VALUE] = prev[END_KEY];
      }
      return cur;
    }, []);
    Object.assign(options, { yField: [START_KEY, END_KEY] });
    return params;
  };
  /**
   * @description 添加连线信息
   */
  const link = (params: Params) => {
    const { options } = params;
    const { data = [], xField, children, linkStyle } = options;
    const linkData = [...data];
    linkData.reduce((prev, cur, index) => {
      if (index > 0) {
        cur.x1 = prev[xField as string];
        cur.x2 = cur[xField as string];
        cur.y1 = prev[END_KEY];
      }
      return cur;
    }, []);
    linkData.shift();
    children.push({
      type: 'link',
      xField: ['x1', 'x2'],
      yField: 'y1',
      // 防止动画或 scrollbar 重绘时 link 层级高于 interval
      zIndex: -1,
      data: linkData,
      style: {
        stroke: '#697474',
        ...linkStyle,
      },
      label: false,
      tooltip: false,
    });
    return params;
  };

  return flow(transformData, link, mark, transformOptions)(params);
}

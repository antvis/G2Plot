import { flow, set, pick, transformOptions, isNumber, get } from '../../utils';
import { mark } from '../../adaptor';
import { COORDIANTE_OPTIONS } from '../../constants';
import type { Adaptor } from '../../types';
import type { RadialBarOptions } from './type';

type Params = Adaptor<RadialBarOptions>;

/**
 * @param chart
 * @param options
 */
export function adaptor(params: Params) {
  /**
   * coordinate 配置
   * @param params
   */
  const coordinate = (params: Params) => {
    const { options } = params;
    const { startAngle, maxAngle, coordinate, radius, innerRadius } = options;
    // 默认开始角度是-90度
    const start = isNumber(startAngle) ? (startAngle / (2 * Math.PI)) * 360 : -90;
    // 结束角度通过maxAngle来计算
    const end = isNumber(maxAngle) ? ((Number(maxAngle) + start) / 180) * Math.PI : Math.PI;
    set(params, ['options', 'coordinate'], {
      ...coordinate,
      ...pick(options.coordinate, COORDIANTE_OPTIONS),
      endAngle: end,
      outerRadius: radius,
      innerRadius,
      startAngle: startAngle ?? -Math.PI / 2,
    });

    return params;
  };

  /**
   * tooltip 配置
   * @param params
   */
  const tooltip = (params: Params) => {
    const { options } = params;
    const { tooltip, xField, yField } = options;
    if (!tooltip) {
      set(options, 'tooltip', {
        title: false,
        items: [
          (d) => {
            return { name: d[xField], value: d[yField] };
          },
        ],
      });
    }
    return params;
  };

  /**
   * background 配置
   * @param params
   */
  const background = (params: Params) => {
    const { options } = params;
    const { markBackground, children, scale, coordinate, xField } = options;
    const domain = get(scale, 'y.domain', []);
    if (markBackground) {
      children.unshift({
        type: 'interval',
        xField: xField,
        yField: domain[domain.length - 1],
        colorField: markBackground.color,
        scale: { color: { type: 'identity' } },
        style: {
          fillOpacity: markBackground.opacity,
          fill: markBackground.color ? undefined : '#e0e4ee', // 默认用fill填满灰色背景
        },
        // 背景图需要填满整个圆
        coordinate: {
          ...coordinate,
          startAngle: -Math.PI / 2,
          endAngle: (3 / 2) * Math.PI,
        },
        animate: false,
        ...markBackground,
      });
    }
    return params;
  };

  return flow(coordinate, tooltip, background, mark, transformOptions)(params);
}

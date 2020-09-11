import { deepMix } from '@antv/util';
import { theme, scale, animation, annotation } from '../../adaptor/common';
import { Params } from '../../core/adaptor';
import { flow } from '../../utils';
import { TinyTooltipOption } from '../../types';
import { interval } from '../../adaptor/geometries';
import { TinyColumnOptions } from './types';
/**
 * 字段
 * @param params
 */
function geometry(params: Params<TinyColumnOptions>): Params<TinyColumnOptions> {
  const { chart, options } = params;
  const { data, color, columnStyle, columnWidthRatio } = options;

  const seriesData = data.map((y: number, x: number) => {
    return { x, y };
  });

  chart.data(seriesData);

  const p = deepMix({}, params, {
    options: {
      xField: 'x',
      yField: 'y',
      widthRatio: columnWidthRatio,
      interval: {
        style: columnStyle,
        color,
      },
    },
  });
  interval(p);

  chart.axis(false);
  chart.legend(false);

  return params;
}

/**
 * tooltip 配置
 * @param params
 */
export function tooltip(params: Params<TinyColumnOptions>): Params<TinyColumnOptions> {
  const { chart, options } = params;
  const { tooltip } = options;

  // false 则关闭
  if (tooltip === false) {
    chart.tooltip(false);
  } else {
    // 是如果 object，那么传入
    const { formatter, ...otherTooltip } = tooltip as TinyTooltipOption;

    chart.tooltip(otherTooltip);

    chart.geometries[0].tooltip('x*y', (x, y) => ({
      value: formatter({ x, y }),
    }));
  }

  return params;
}

/**
 * 迷你柱形图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<TinyColumnOptions>) {
  return flow(geometry, scale({}), tooltip, theme, animation, annotation())(params);
}

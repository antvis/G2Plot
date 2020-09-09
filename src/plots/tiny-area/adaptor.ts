import { deepMix } from '@antv/util';
import { theme, scale, animation, annotation } from '../../adaptor/common';
import { Params } from '../../core/adaptor';
import { flow } from '../../utils';
import { TinyTooltipOption } from '../../types';
import { area, line, point } from '../../adaptor/geometries';
import { TinyAreaOptions } from './types';

/**
 * 字段
 * @param params
 */
function geometry(params: Params<TinyAreaOptions>): Params<TinyAreaOptions> {
  const { chart, options } = params;
  const { data, color, areaStyle, point: pointOptions, line: lineOptions } = options;

  const seriesData = data.map((y: number, x: number) => {
    return { x, y };
  });

  chart.data(seriesData);

  const p = deepMix({}, params, {
    options: {
      xField: 'x',
      yField: 'y',
      area: { color, style: areaStyle },
      line: lineOptions,
      point: pointOptions,
    },
  });
  // area geometry 处理
  area(p);
  line(p);
  point(p);

  chart.axis(false);
  chart.legend(false);

  return params;
}

/**
 * tooltip 配置
 * @param params
 */
export function tooltip(params: Params<TinyAreaOptions>): Params<TinyAreaOptions> {
  const { chart, options } = params;
  const { tooltip } = options;

  // false 则关闭
  if (tooltip === false) {
    chart.tooltip(false);
  } else {
    // 是如果 object，那么传入
    const { formatter, ...otherTooltip } = tooltip as TinyTooltipOption;

    chart.tooltip(otherTooltip);

    chart.geometries.map((g) => {
      g.tooltip('x*y', (x, y) => ({
        value: formatter({ x, y }),
      }));
    });
  }

  return params;
}

/**
 * 迷你面积图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<TinyAreaOptions>) {
  return flow(geometry, scale({}), tooltip, theme, animation, annotation())(params);
}

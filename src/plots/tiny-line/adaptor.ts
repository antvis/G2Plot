import { deepMix } from '@antv/util';
import { Params } from '../../core/adaptor';
import { flow } from '../../utils';
import { scale, theme, animation, annotation } from '../../adaptor/common';
import { TinyTooltipOption } from '../../types';
import { line, point } from '../../adaptor/geometries';
import { TinyLineOptions } from './types';

/**
 * 字段
 * @param params
 */
function geometry(params: Params<TinyLineOptions>): Params<TinyLineOptions> {
  const { chart, options } = params;
  const { data, color, lineStyle, point: pointMapping } = options;

  const seriesData = data.map((y: number, x: number) => {
    return { x, y };
  });

  chart.data(seriesData);

  // line geometry 处理
  const p = deepMix({}, params, {
    options: {
      xField: 'x',
      yField: 'y',
      line: {
        color,
        style: lineStyle,
      },
      point: pointMapping,
    },
  });

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
export function tooltip(params: Params<TinyLineOptions>): Params<TinyLineOptions> {
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
 * 迷你折线图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<TinyLineOptions>) {
  return flow(geometry, scale({}), theme, tooltip, animation, annotation())(params);
}

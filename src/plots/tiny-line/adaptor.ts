import { isFunction } from '@antv/util';
import { Params } from '../../core/adaptor';
import { flow } from '../../utils';
import { scale, theme, animation } from '../../adaptor/common';
import { TinyTooltipOption } from '../../types';
import { TinyLineOptions } from './types';

/**
 * 字段
 * @param params
 */
function geometry(params: Params<TinyLineOptions>): Params<TinyLineOptions> {
  const { chart, options } = params;
  const { data, connectNulls, lineStyle, smooth } = options;

  const seriesData = data.map((y: number, x: number) => {
    return { x, y };
  });

  chart.data(seriesData);

  const geometry = chart
    .line({ connectNulls })
    .position('x*y')
    .shape(smooth ? 'smooth' : 'line');

  // line style
  if (lineStyle) {
    geometry.style('x*y', () => {
      return isFunction(lineStyle) ? lineStyle() : lineStyle;
    });
  }

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
      value: formatter(x, y),
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
  return flow(geometry, scale({}), theme, tooltip, animation)(params);
}

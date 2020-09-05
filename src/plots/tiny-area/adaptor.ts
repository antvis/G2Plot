import { isFunction } from '@antv/util';
import { theme, scale } from '../../adaptor/common';
import { Params } from '../../core/adaptor';
import { flow } from '../../utils';
import { TinyTooltipOption } from '../../types';
import { TinyAreaOptions } from './types';

/**
 * 字段
 * @param params
 */
function geometry(params: Params<TinyAreaOptions>): Params<TinyAreaOptions> {
  const { chart, options } = params;
  const { data, lineStyle, areaStyle, smooth } = options;

  const seriesData = data.map((y: number, x: number) => {
    return { x, y };
  });

  chart.data(seriesData);

  const areaGeometry = chart
    .area()
    .position('x*y')
    .shape(smooth ? 'smooth' : 'area');

  // area style
  if (areaStyle) {
    areaGeometry.style('x*y', () => {
      return isFunction(areaStyle) ? areaStyle() : areaStyle;
    });
  }

  const lineGeometry = chart
    .line()
    .position('x*y')
    .shape(smooth ? 'smooth' : 'line');

  // line style
  if (lineStyle) {
    lineGeometry.style('x*y', () => {
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
        value: formatter(x, y),
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
  return flow(geometry, scale({}), tooltip, theme)(params);
}

import { isFunction } from '@antv/util';
import { theme, scale } from '../../adaptor/common';
import { Params } from '../../core/adaptor';
import { flow } from '../../utils';
import { TinyColumnOptions } from './types';
import { DEFAULT_TOOLTIP_OPTIONS } from '../tiny-line/constants';

/**
 * 字段
 * @param params
 */
function field(params: Params<TinyColumnOptions>): Params<TinyColumnOptions> {
  const { chart, options } = params;
  const { data } = options;

  const seriesData = data.map((y: number, x: number) => {
    return { x, y };
  });

  chart.data(seriesData);

  chart.interval().position('x*y');

  return params;
}

/**
 * axis 配置
 * @param params
 */
function axis(params: Params<TinyColumnOptions>): Params<TinyColumnOptions> {
  const { chart } = params;

  chart.axis(false);

  return params;
}

/**
 * legend 配置
 * @param params
 */
function legend(params: Params<TinyColumnOptions>): Params<TinyColumnOptions> {
  const { chart } = params;

  chart.legend(false);

  return params;
}

/**
 * tooltip 配置
 * @param params
 */
export function tooltip(params: Params<TinyColumnOptions>): Params<TinyColumnOptions> {
  const { chart, options } = params;
  const { tooltip = false } = options;

  if (tooltip) {
    if (typeof tooltip === 'object') {
      const { formatter, domStyles, position, offset, showCrosshairs } = tooltip;
      chart.tooltip({
        ...DEFAULT_TOOLTIP_OPTIONS,
        showCrosshairs,
        domStyles,
        position,
        offset,
      });
      const geometry = chart.geometries[0];
      geometry.tooltip('x*y', (x, y) => {
        return {
          value: formatter(x, y),
        };
      });
    } else {
      chart.tooltip(DEFAULT_TOOLTIP_OPTIONS);
    }
  } else {
    chart.tooltip(false);
  }

  return params;
}

/**
 * 样式
 * @param params
 */
function style(params: Params<TinyColumnOptions>): Params<TinyColumnOptions> {
  const { chart, options } = params;
  const { columnStyle } = options;

  const geometry = chart.geometries[0];
  if (columnStyle && geometry) {
    if (isFunction(columnStyle)) {
      geometry.style('x*y', columnStyle);
    } else {
      geometry.style(columnStyle);
    }
  }
  return params;
}

/**
 * 迷你柱形图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<TinyColumnOptions>) {
  return flow(field, scale({}), axis, legend, tooltip, style, theme)(params);
}

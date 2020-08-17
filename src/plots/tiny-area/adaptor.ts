import { isFunction } from '@antv/util';
import { Params } from '../../core/adaptor';
import { flow } from '../../utils';
import { TinyAreaOptions } from './types';
import { DEFAULT_TOOLTIP_OPTIONS, defaultTooltipFormatter } from '../tiny-line/constants';

/**
 * 字段
 * @param params
 */
function field(params: Params<TinyAreaOptions>): Params<TinyAreaOptions> {
  const { chart, options } = params;
  const { data } = options;

  const seriesData = data.map((y: number, x: number) => {
    return { x, y };
  });

  chart.data(seriesData);

  chart.area().position('x*y');
  chart.line().position('x*y');

  return params;
}

/**
 * meta 配置
 * @param params
 */
function meta(params: Params<TinyAreaOptions>): Params<TinyAreaOptions> {
  const { chart, options } = params;
  const { meta } = options;

  chart.scale(meta);

  return params;
}

/**
 * axis 配置
 * @param params
 */
function axis(params: Params<TinyAreaOptions>): Params<TinyAreaOptions> {
  const { chart } = params;

  chart.axis(false);

  return params;
}

/**
 * legend 配置
 * @param params
 */
function legend(params: Params<TinyAreaOptions>): Params<TinyAreaOptions> {
  const { chart } = params;

  chart.legend(false);

  return params;
}

/**
 * tooltip 配置
 * @param params
 */
export function tooltip(params: Params<TinyAreaOptions>): Params<TinyAreaOptions> {
  const { chart, options } = params;
  const { tooltip = false } = options;

  if (tooltip) {
    if (typeof tooltip === 'object') {
      const { formatter = defaultTooltipFormatter, domStyles, position, offset, showCrosshairs } = tooltip;
      chart.tooltip({
        ...DEFAULT_TOOLTIP_OPTIONS,
        showCrosshairs,
        domStyles,
        position,
        offset,
      });
      chart.geometries.map((geometry) => {
        geometry.tooltip('x*y', (x, y) => {
          return {
            value: formatter(x, y),
          };
        });
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
function style(params: Params<TinyAreaOptions>): Params<TinyAreaOptions> {
  const { chart, options } = params;
  const { lineStyle, areaStyle } = options;

  const areaGeometry = chart.geometries[0];
  if (areaStyle && areaGeometry) {
    if (isFunction(areaStyle)) {
      areaGeometry.style('x*y', areaStyle);
    } else {
      areaGeometry.style(areaStyle);
    }
  }

  const lineGeometry = chart.geometries[1];
  if (lineStyle && lineGeometry) {
    if (isFunction(lineStyle)) {
      lineGeometry.style('x*y', lineStyle);
    } else {
      lineGeometry.style(lineStyle);
    }
  }
  return params;
}

/**
 * shape 的配置处理
 * @param params
 */
function shape(params: Params<TinyAreaOptions>): Params<TinyAreaOptions> {
  const { chart, options } = params;
  const { smooth } = options;

  const areaGeometry = chart.geometries[0];
  areaGeometry.shape(smooth ? 'smooth' : 'area');

  const lineGeometry = chart.geometries[1];
  lineGeometry.shape(smooth ? 'smooth' : 'line');

  return params;
}

/**
 * 迷你面积图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<TinyAreaOptions>) {
  flow(field, meta, axis, legend, tooltip, style, shape)(params);
}

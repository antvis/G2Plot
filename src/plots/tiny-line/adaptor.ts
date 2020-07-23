import { Params } from '../../core/adaptor';
import { flow } from '../../utils';
import { TinyLineOptions } from './types';
import { isFunction } from '@antv/util';

/**
 * 字段
 * @param params
 */
function field(params: Params<TinyLineOptions>): Params<TinyLineOptions> {
  const { chart, options } = params;
  const { data, connectNulls } = options;

  const seriesData = data.map((y: number, x: number) => {
    return { x, y };
  });

  chart.data(seriesData);

  chart.line({ connectNulls }).position('x*y');

  return params;
}

/**
 * meta 配置
 * @param params
 */
function meta(params: Params<TinyLineOptions>): Params<TinyLineOptions> {
  const { chart, options } = params;
  const { meta } = options;

  chart.scale(meta);

  return params;
}

/**
 * axis 配置
 * @param params
 */
function axis(params: Params<TinyLineOptions>): Params<TinyLineOptions> {
  const { chart } = params;

  chart.axis(false);

  return params;
}

/**
 * legend 配置
 * @param params
 */
function legend(params: Params<TinyLineOptions>): Params<TinyLineOptions> {
  const { chart } = params;

  chart.legend(false);

  return params;
}

/**
 * tooltip 配置
 * @param params
 */
function tooltip(params: Params<TinyLineOptions>): Params<TinyLineOptions> {
  const { chart } = params;

  chart.tooltip(false);

  return params;
}

/**
 * 样式
 * @param params
 */
function style(params: Params<TinyLineOptions>): Params<TinyLineOptions> {
  const { chart, options } = params;
  const { lineStyle } = options;

  const geometry = chart.geometries[0];
  if (lineStyle && geometry) {
    if (isFunction(lineStyle)) {
      geometry.style('x*y', lineStyle);
    } else {
      geometry.style(lineStyle);
    }
  }
  return params;
}

/**
 * shape 的配置处理
 * @param params
 */
function shape(params: Params<TinyLineOptions>): Params<TinyLineOptions> {
  const { chart, options } = params;
  const { smooth } = options;

  const lineGeometry = chart.geometries[0];

  lineGeometry.shape(smooth ? 'smooth' : 'line');
  return params;
}

/**
 * 设置全局主题配置
 * @param params
 */
export function theme(params: Params<TinyLineOptions>): Params<TinyLineOptions> {
  const { chart, options } = params;
  const { theme } = options;

  // 存在主题才设置主题
  if (theme) {
    chart.theme(theme);
  }
  return params;
}

/**
 * 迷你折线图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<TinyLineOptions>) {
  flow(field, meta, theme, axis, legend, tooltip, style, shape)(params);
}

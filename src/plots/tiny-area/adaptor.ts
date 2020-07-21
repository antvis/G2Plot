import { Params } from '../../core/adaptor';
import { flow } from '../../utils';
import { TinyAreaOptions } from './types';
import { isFunction } from '@antv/util';

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
function tooltip(params: Params<TinyAreaOptions>): Params<TinyAreaOptions> {
  const { chart } = params;

  chart.tooltip(false);

  return params;
}

/**
 * 样式
 * @param params
 */
function style(params: Params<TinyAreaOptions>): Params<TinyAreaOptions> {
  const { chart, options } = params;
  const { lineStyle, color } = options;

  if (color) {
    chart.geometries[0].style({
      fill: color,
    });
  }

  const geometry = chart.geometries[1];
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

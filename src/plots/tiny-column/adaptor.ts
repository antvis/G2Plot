import { Params } from '../../core/adaptor';
import { flow } from '../../utils';
import { TinyColumnOptions } from './types';
import { isFunction } from '@antv/util';

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
 * meta 配置
 * @param params
 */
function meta(params: Params<TinyColumnOptions>): Params<TinyColumnOptions> {
  const { chart, options } = params;
  const { meta } = options;

  chart.scale(meta);

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
function tooltip(params: Params<TinyColumnOptions>): Params<TinyColumnOptions> {
  const { chart } = params;

  chart.tooltip(false);

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
  flow(field, meta, axis, legend, tooltip, style)(params);
}

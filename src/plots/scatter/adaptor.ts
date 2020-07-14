import { Params } from '../../core/adaptor';
import { flow } from '../../utils';
import { ScatterOptions } from './types';

/**
 * 字段
 * @param params
 */
function field(params: Params<ScatterOptions>): Params<ScatterOptions> {
  const { chart, options } = params;
  const { data, xField, yField, seriesField, color, symbolSize, shape } = options;

  // 散点图操作逻辑
  chart.data(data);
  const geometry = chart.point().position(`${xField}*${yField}`);

  // 颜色映射
  if (seriesField) {
    geometry.color(seriesField, color);
    geometry.shape(seriesField, shape);
  }

  // 大小映射
  if (symbolSize) {
    const size = typeof symbolSize === 'number' ? ([symbolSize, symbolSize] as [number, number]) : symbolSize;
    geometry.size(yField, size);
  }
  return params;
}

/**
 * meta 配置
 * @param params
 */
function meta(params: Params<ScatterOptions>): Params<ScatterOptions> {
  // TODO
  return params;
}

/**
 * axis 配置
 * @param params
 */
function axis(params: Params<ScatterOptions>): Params<ScatterOptions> {
  // TODO
  return params;
}

/**
 * legend 配置
 * @param params
 */
function legend(params: Params<ScatterOptions>): Params<ScatterOptions> {
  // TODO
  return params;
}

/**
 * tooltip 配置
 * @param params
 */
function tooltip(params: Params<ScatterOptions>): Params<ScatterOptions> {
  const {
    chart,
    options: { tooltip },
  } = params;

  if (tooltip) {
    chart.tooltip({ ...tooltip });
  }
  return params;
}

/**
 * 散点图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<ScatterOptions>) {
  // flow 的方式处理所有的配置到 G2 API
  flow(field, meta, axis, legend, tooltip)(params);
}

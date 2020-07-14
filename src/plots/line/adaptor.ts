import { Params } from '../../core/adaptor';
import { flow } from '../../utils';
import { LineOptions } from './types';

/**
 * 字段
 * @param params
 */
function field(params: Params<LineOptions>): Params<LineOptions> {
  const { chart, options } = params;
  const { data, xField, yField, seriesField, color, connectNulls } = options;

  chart.data(data);
  const geometry = chart.line({ connectNulls }).position(`${xField}*${yField}`);

  if (seriesField) {
    geometry.color(seriesField, color);
  }

  return params;
}

/**
 * meta 配置
 * @param params
 */
function meta(params: Params<LineOptions>): Params<LineOptions> {
  const { chart, options } = params;
  const { meta } = options;

  // meta 直接是 scale 的信息
  chart.scale(meta);

  return params;
}

/**
 * axis 配置
 * @param params
 */
function axis(params: Params<LineOptions>): Params<LineOptions> {
  // TODO
  return params;
}

/**
 * legend 配置
 * @param params
 */
function legend(params: Params<LineOptions>): Params<LineOptions> {
  // TODO
  return params;
}

/**
 * tooltip 配置
 * @param params
 */
function tooltip(params: Params<LineOptions>): Params<LineOptions> {
  // TODO
  return params;
}

/**
 * 折线图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<LineOptions>) {
  // flow 的方式处理所有的配置到 G2 API
  flow(field, meta, axis, legend, tooltip)(params);
}

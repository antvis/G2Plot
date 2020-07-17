import { deepMix } from '@antv/util';
import { Params } from '../../core/adaptor';
import { flow, pick } from '../../utils';
import { TinyLineOptions } from './types';

/**
 * 字段
 * @param params
 */
function field(params: Params<TinyLineOptions>): Params<TinyLineOptions> {
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
function meta(params: Params<TinyLineOptions>): Params<TinyLineOptions> {
  const { chart, options } = params;
  const { meta, xAxis, yAxis, xField, yField } = options;

  const KEYS = ['tickCount', 'tickInterval', 'min', 'max', 'nice', 'minLimit', 'maxLimit', 'tickMethod'];

  // meta 直接是 scale 的信息
  const scales = deepMix({}, meta, {
    [xField]: pick(xAxis, KEYS),
    [yField]: pick(yAxis, KEYS),
  });

  chart.scale(scales);

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

function tooltip(params: Params<TinyLineOptions>): Params<TinyLineOptions> {
  const { chart } = params;

  chart.tooltip(false);

  return params;
}

/**
 * 折线图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<TinyLineOptions>) {
  // flow 的方式处理所有的配置到 G2 API
  flow(field, meta, axis, legend, tooltip)(params);
}

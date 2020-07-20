import { deepMix } from '@antv/util';
import { Params } from '../../../core/adaptor';
import { flow } from '../../../utils';
import { TinyLineOptions } from './types';

/**
 * 字段
 * @param params
 */
function field(params: Params<TinyLineOptions>): Params<TinyLineOptions> {
  const { chart, options } = params;
  const { data, connectNulls } = options;

  const seriesData = data.map((item: number, index: number) => {
    return { index, value: item };
  });

  chart.data(seriesData);

  chart.line({ connectNulls }).position('index*value');

  return params;
}

/**
 * meta 配置
 * @param params
 */
function meta(params: Params<TinyLineOptions>): Params<TinyLineOptions> {
  const { chart, options } = params;
  const { meta } = options;

  const scales = deepMix({}, meta);

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

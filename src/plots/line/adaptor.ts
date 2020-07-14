import { deepMix } from '@antv/util';
import { Params } from '../../core/adaptor';
import { flow, pick } from '../../utils';
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
  const { meta, xAxis, yAxis, xField, yField } = options;

  const KEYS = ['tickCount', 'tickInterval', 'min', 'max'];

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
function axis(params: Params<LineOptions>): Params<LineOptions> {
  const { chart, options } = params;
  const { xAxis, yAxis, xField, yField } = options;

  // 为 false 则是不显示轴
  if (xAxis === false) {
    chart.axis(xField, false);
  } else {
    chart.axis(xField, xAxis);
  }

  if (yAxis === false) {
    chart.axis(xField, false);
  } else {
    chart.axis(yField, yAxis);
  }

  return params;
}

/**
 * legend 配置
 * @param params
 */
function legend(params: Params<LineOptions>): Params<LineOptions> {
  const { chart, options } = params;
  const { legend, seriesField } = options;

  if (legend && seriesField) {
    chart.legend(seriesField, legend);
  }

  return params;
}

/**
 * tooltip 配置
 * @param params
 */
function tooltip(params: Params<LineOptions>): Params<LineOptions> {
  const { chart, options } = params;
  const { tooltip } = options;

  if (tooltip) {
    chart.tooltip(tooltip);
  }

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

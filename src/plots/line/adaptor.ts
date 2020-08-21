import { deepMix } from '@antv/util';
import { Params } from '../../core/adaptor';
import { tooltip, slider, interaction, animation, theme } from '../../adaptor/common';
import { findGeometry } from '../../utils';
import { AXIS_META_CONFIG_KEYS } from '../../constant';
import { point, line } from '../../adaptor/geometries';
import { flow, pick } from '../../utils';
import { LineOptions } from './types';

/**
 * geometry 配置处理
 * @param params
 */
function geometry(params: Params<LineOptions>): Params<LineOptions> {
  const { chart, options } = params;
  const { data, color, lineStyle, connectNulls, smooth } = options;

  chart.data(data);
  // line geometry 处理
  flow(line)(deepMix({}, params, { options: { line: { connectNulls, smooth, color, style: lineStyle } } }));

  return params;
}

/**
 * meta 配置
 * @param params
 */
export function meta(params: Params<LineOptions>): Params<LineOptions> {
  const { chart, options } = params;
  const { meta, xAxis, yAxis, xField, yField } = options;

  // meta 直接是 scale 的信息
  const scales = deepMix({}, meta, {
    [xField]: pick(xAxis, AXIS_META_CONFIG_KEYS),
    [yField]: pick(yAxis, AXIS_META_CONFIG_KEYS),
  });

  chart.scale(scales);

  return params;
}

/**
 * axis 配置
 * @param params
 */
export function axis(params: Params<LineOptions>): Params<LineOptions> {
  const { chart, options } = params;
  const { xAxis, yAxis, xField, yField } = options;

  // 为 false 则是不显示轴
  if (xAxis === false) {
    chart.axis(xField, false);
  } else {
    chart.axis(xField, xAxis);
  }

  if (yAxis === false) {
    chart.axis(yField, false);
  } else {
    chart.axis(yField, yAxis);
  }

  return params;
}

/**
 * legend 配置
 * @param params
 */
export function legend(params: Params<LineOptions>): Params<LineOptions> {
  const { chart, options } = params;
  const { legend, seriesField } = options;

  if (legend && seriesField) {
    chart.legend(seriesField, legend);
  }

  return params;
}

/**
 * 数据标签
 * @param params
 */
function label(params: Params<LineOptions>): Params<LineOptions> {
  const { chart, options } = params;
  const { label, yField } = options;

  const lineGeometry = findGeometry(chart, 'line');

  // label 为 false, 空 则不显示 label
  if (!label) {
    lineGeometry.label(false);
  } else {
    const { callback, ...cfg } = label;
    lineGeometry.label({
      fields: [yField],
      callback,
      cfg,
    });
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
  flow(geometry, meta, point, theme, axis, legend, tooltip, label, slider, interaction, animation)(params);
}

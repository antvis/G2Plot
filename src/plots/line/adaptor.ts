import { Geometry } from '@antv/g2';
import { deepMix, isFunction, isString, isObject } from '@antv/util';
import { Params } from '../../core/adaptor';
import { tooltip, interaction, animation, theme } from '../../common/adaptor';
import { flow, pick } from '../../utils';
import { LineOptions } from './types';
import { AXIS_META_CONFIG_KEYS } from '../../constant';

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
 * 样式
 * @param params
 */
function style(params: Params<LineOptions>): Params<LineOptions> {
  const { chart, options } = params;
  const { xField, yField, seriesField, lineStyle } = options;

  const geometry = chart.geometries[0];
  if (lineStyle && geometry) {
    if (isFunction(lineStyle)) {
      geometry.style(`${xField}*${yField}*${seriesField}`, lineStyle);
    } else if (isObject(lineStyle)) {
      geometry.style(lineStyle);
    }
  }
  return params;
}

/**
 * shape 的配置处理
 * @param params
 */
function shape(params: Params<LineOptions>): Params<LineOptions> {
  const { chart, options } = params;
  const { smooth } = options;

  const lineGeometry = chart.geometries.find((g: Geometry) => g.type === 'line');

  lineGeometry.shape(smooth ? 'smooth' : 'line');
  return params;
}

/**
 * 数据标签
 * @param params
 */
function label(params: Params<LineOptions>): Params<LineOptions> {
  const { chart, options } = params;
  const { label, yField } = options;

  const lineGeometry = chart.geometries.find((g: Geometry) => g.type === 'line');

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
 * point 辅助点的配置处理
 * @param params
 */
export function point(params: Params<LineOptions>): Params<LineOptions> {
  const { chart, options } = params;
  const { point, seriesField, xField, yField, color } = options;

  if (point) {
    const { shape, size, style } = point;
    const pointGeometry = chart.point().position(`${xField}*${yField}`).size(size);

    if (seriesField) {
      pointGeometry.color(seriesField, color);
    }

    // shape
    if (isFunction(shape)) {
      pointGeometry.shape(`${xField}*${yField}*${seriesField}`, shape);
    } else if (isString(shape)) {
      pointGeometry.shape(shape);
    }

    // style
    if (isFunction(style)) {
      pointGeometry.style(`${xField}*${yField}*${seriesField}`, style);
    } else if (isObject(style)) {
      pointGeometry.style(style);
    }
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
  flow(field, meta, point, theme, axis, legend, tooltip, style, shape, label, interaction, animation)(params);
}

import { isFunction, isNumber, isString } from '@antv/util';
import { Params } from '../../core/adaptor';
import { flow } from '../../utils';
import { tooltip, interaction, animation, theme, scale } from '../../adaptor/common';
import { findGeometry } from '../../utils';
import { ScatterOptions } from './types';

/**
 * 字段
 * @param params
 */
function field(params: Params<ScatterOptions>): Params<ScatterOptions> {
  const { chart, options } = params;
  const { data, xField, yField, type, color, colorField, shape, shapeField, size, sizeField } = options;

  // 散点图操作逻辑
  chart.data(data);
  const geometry = chart.point().position(`${xField}*${yField}`);

  // 数据调整
  if (type) {
    geometry.adjust(type);
  }

  // shape
  if (shape) {
    if (isString(shape)) {
      geometry.shape(shape);
    } else {
      geometry.shape(shapeField || xField, shape);
    }
  }

  // color
  if (color) {
    if (isString(color)) {
      geometry.color(color);
    } else {
      geometry.color(colorField || xField, color);
    }
  }

  // size
  if (size) {
    if (isNumber(size)) {
      geometry.size(size);
    } else {
      geometry.size(sizeField || xField, size);
    }
  }

  return params;
}

/**
 * meta 配置
 * @param params
 */
function meta(params: Params<ScatterOptions>): Params<ScatterOptions> {
  const { options } = params;
  const { xAxis, yAxis, xField, yField } = options;

  return flow(
    scale({
      [xField]: xAxis,
      [yField]: yAxis,
    })
  )(params);
}

/**
 * axis 配置
 * @param params
 */
function axis(params: Params<ScatterOptions>): Params<ScatterOptions> {
  const { chart, options } = params;
  const { xAxis, yAxis, xField, yField } = options;

  chart.axis(xField, xAxis);
  chart.axis(yField, yAxis);

  return params;
}

/**
 * legend 配置
 * @param params
 */
function legend(params: Params<ScatterOptions>): Params<ScatterOptions> {
  const { chart, options } = params;
  const { legend, colorField } = options;

  if (legend && colorField) {
    chart.legend(colorField, legend);
  }

  return params;
}

/**
 * 样式
 * @param params
 */
function style(params: Params<ScatterOptions>): Params<ScatterOptions> {
  const { chart, options } = params;
  const { xField, yField, pointStyle, colorField } = options;

  const geometry = chart.geometries[0];

  if (pointStyle && geometry) {
    if (isFunction(pointStyle)) {
      geometry.style(`${xField}*${yField}*${colorField}`, pointStyle);
    } else {
      geometry.style(pointStyle);
    }
  }

  return params;
}

/**
 * 数据标签
 * @param params
 */
function label(params: Params<ScatterOptions>): Params<ScatterOptions> {
  const { chart, options } = params;
  const { label, yField } = options;

  const scatterGeometry = findGeometry(chart, 'point');

  // label 为 false, 空 则不显示 label
  if (!label) {
    scatterGeometry.label(false);
  } else {
    const { callback, ...cfg } = label;
    scatterGeometry.label({
      fields: [yField],
      callback,
      cfg,
    });
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
  return flow(field, meta, axis, legend, tooltip, style, label, interaction, animation, theme)(params);
}

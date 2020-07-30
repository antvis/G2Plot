import { Geometry } from '@antv/g2';
import { isFunction, each, isObject } from '@antv/util';
import { Params } from '../../core/adaptor';
import { tooltip, interaction, animation, theme } from '../../common/adaptor';
import { meta, legend, point, axis } from '../line/adaptor';
import { flow } from '../../utils';
import { AreaOptions } from './types';
import { findGeometry } from '../../common/helper';

/**
 * 字段
 * @param params
 */
function field(params: Params<AreaOptions>): Params<AreaOptions> {
  const { chart, options } = params;
  const { data, xField, yField, seriesField, color } = options;

  chart.data(data);
  const geometry = chart.area().position(`${xField}*${yField}`);

  if (seriesField) {
    geometry.color(seriesField, color);
  }

  return params;
}

/**
 * 样式
 * @param params
 */
function style(params: Params<AreaOptions>): Params<AreaOptions> {
  const { chart, options } = params;
  const { xField, yField, seriesField, areaStyle } = options;

  const geometry = findGeometry(chart, 'area');
  if (areaStyle && geometry) {
    if (isFunction(areaStyle)) {
      geometry.style(`${xField}*${yField}*${seriesField}`, areaStyle);
    } else if (isObject(areaStyle)) {
      geometry.style(areaStyle);
    }
  }
  return params;
}

/**
 * shape 的配置处理
 * @param params
 */
function shape(params: Params<AreaOptions>): Params<AreaOptions> {
  const { chart, options } = params;
  const { smooth } = options;

  const areaGeometry = findGeometry(chart, 'area');

  areaGeometry.shape(smooth ? 'smooth' : 'area');
  return params;
}

/**
 * 数据标签
 * @param params
 */
function label(params: Params<AreaOptions>): Params<AreaOptions> {
  const { chart, options } = params;
  const { label, yField } = options;

  const areaGeometry = findGeometry(chart, 'area');

  // label 为 false, 空 则不显示 label
  if (!label) {
    areaGeometry.label(false);
  } else {
    const { callback, ...cfg } = label;
    areaGeometry.label({
      fields: [yField],
      callback,
      cfg,
    });
  }

  return params;
}

/**
 * line 面积线的配置处理
 * @param params
 */
function line(params: Params<AreaOptions>): Params<AreaOptions> {
  const { chart, options } = params;
  const { line, seriesField, xField, yField, smooth, color } = options;

  if (line) {
    const { size, style } = line;
    const lineGeometry = chart
      .line()
      .position(`${xField}*${yField}`)
      .size(size)
      .shape(smooth ? 'smooth' : 'line');

    if (seriesField) {
      lineGeometry.color(seriesField, color);
    }

    // style
    if (isFunction(style)) {
      lineGeometry.style(`${xField}*${yField}*${seriesField}`, style);
    } else if (isObject(style)) {
      lineGeometry.style(style);
    }
  }
  return params;
}

/**
 * 统一处理 adjust
 * @param params
 */
function adjust(params: Params<AreaOptions>): Params<AreaOptions> {
  const { chart } = params;
  each(chart.geometries, (g: Geometry) => {
    g.adjust('stack');
  });

  return params;
}

/**
 * 折线图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<AreaOptions>) {
  // flow 的方式处理所有的配置到 G2 API
  flow(
    field,
    meta,
    line,
    point,
    adjust,
    theme,
    axis,
    legend,
    tooltip,
    style,
    shape,
    label,
    interaction,
    animation
  )(params);
}

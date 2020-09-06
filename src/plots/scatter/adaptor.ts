import { isFunction, deepMix, isString, isArray } from '@antv/util';
import { Params } from '../../core/adaptor';
import { flow } from '../../utils';
import { tooltip, interaction, animation, theme, scale, annotation } from '../../adaptor/common';
import { findGeometry } from '../../utils';
import { getQuadrantDefaultConfig } from './util';
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
  if (isFunction(shape)) {
    geometry.shape(`${xField}*${yField}*${colorField}*${sizeField}*${shapeField}`, shape);
  } else if (isArray(shape) && shapeField) {
    geometry.shape(shapeField, shape);
  } else if (isString(shape) || isString(shapeField)) {
    geometry.shape((shape || shapeField) as string);
  }

  // color
  if (isFunction(color)) {
    geometry.color(`${xField}*${yField}*${colorField}*${sizeField}*${shapeField}`, color);
  } else if (isArray(color) && colorField) {
    geometry.color(colorField, color);
  } else if (isString(color) || isString(colorField)) {
    geometry.color((color || colorField) as string);
  }

  // size
  if (isFunction(size)) {
    geometry.size(`${xField}*${yField}*${colorField}*${sizeField}*${shapeField}`, size);
  } else if (isArray(size) && sizeField) {
    geometry.size(sizeField, size);
  } else if (isString(size) || isString(sizeField)) {
    geometry.size((size || sizeField) as string);
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
  const { legend, colorField, shapeField, sizeField } = options;

  if (legend) {
    chart.legend(shapeField || colorField, legend);
  } else {
    chart.legend(false);
    chart.legend(colorField, false);
  }

  // 隐藏连续图例
  if (sizeField) {
    chart.legend(sizeField, false);
  }

  return params;
}

/**
 * 样式
 * @param params
 */
function style(params: Params<ScatterOptions>): Params<ScatterOptions> {
  const { chart, options } = params;
  const { xField, yField, pointStyle, colorField, sizeField, shapeField } = options;

  const geometry = chart.geometries[0];

  if (pointStyle && geometry) {
    if (isFunction(pointStyle)) {
      geometry.style(`${xField}*${yField}*${colorField}*${sizeField}*${shapeField}`, pointStyle);
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
 * annotation 配置
 * - 特殊 annotation: quadrant(四象限)
 * @param params
 */
function scatterAnnotation(params: Params<ScatterOptions>): Params<ScatterOptions> {
  const { options } = params;
  const { annotations, quadrant } = options;

  const annotationOptions = annotations ? annotations : [];

  if (quadrant) {
    const { xBaseline = 0, yBaseline = 0, labels, regionStyle, lineStyle } = quadrant;
    const defaultConfig = getQuadrantDefaultConfig(xBaseline, yBaseline);
    // 仅支持四象限
    const quadrants = new Array(4).join(',').split(',');
    quadrants.forEach((_: string, index: number) => {
      annotationOptions.push(
        {
          type: 'region',
          top: false,
          ...defaultConfig.regionStyle[index].position,
          style: deepMix({}, defaultConfig.regionStyle[index].style, regionStyle?.[index]),
        },
        {
          type: 'text',
          top: true,
          ...deepMix({}, defaultConfig.labelStyle[index], labels?.[index]),
        }
      );
    });
    // 生成坐标轴
    annotationOptions.push(
      {
        type: 'line',
        top: false,
        start: ['min', yBaseline],
        end: ['max', yBaseline],
        style: deepMix({}, defaultConfig.lineStyle, lineStyle),
      },
      {
        type: 'line',
        top: false,
        start: [xBaseline, 'min'],
        end: [xBaseline, 'max'],
        style: deepMix({}, defaultConfig.lineStyle, lineStyle),
      }
    );
  }

  return flow(annotation(annotationOptions))(params);
}

/**
 * 散点图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<ScatterOptions>) {
  // flow 的方式处理所有的配置到 G2 API
  return flow(
    field,
    meta,
    axis,
    legend,
    tooltip,
    style,
    label,
    interaction,
    scatterAnnotation,
    animation,
    theme
  )(params);
}

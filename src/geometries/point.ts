import { isFunction, isString, isObject } from '@antv/util';
import { Params } from '../core/adaptor';
import { Options } from '../types';
import { ShapeStyle } from '../types/style';
import { flow } from '../utils';
import { findGeometry } from '../common/helper';

export interface PointGeometryOptions extends Options {
  /** x 轴字段 */
  readonly xField?: string;
  /** y 轴字段 */
  readonly yField?: string;
  /** 分组字段 */
  readonly seriesField?: string;
  readonly point?: {
    /** point color 映射, 提供回调的方式, 不开放 field 映射配置 */
    readonly color?: string | string[] | ((series: any) => string);
    /** point shape 映射, 提供回调的方式, 不开放 field 映射配置 */
    readonly shape?: string | ((x: any, y: any, series?: any) => string);
    /** 大小映射, 提供回调的方式, 不开放 field 映射配置 */
    readonly size?: number | ((x: any, y: any, series?: any) => number);
    /** 样式映射 */
    readonly style?: ShapeStyle | ((x: any, y: any, series?: any) => ShapeStyle);
  };
}

/**
 * 字段 配置
 * @param params
 */
function field<O extends PointGeometryOptions>(params: Params<O>): Params<O> {
  const { chart, options } = params;
  const { point, seriesField, xField, yField, color } = options;

  const pointGeometry = chart.point().position(`${xField}*${yField}`);
  if (seriesField) {
    const pointColor = isFunction(point.color) ? point.color : point.color || color;
    pointGeometry.color(seriesField, pointColor);
  }

  const { size } = point;
  if (isFunction(size)) {
    pointGeometry.size(`${xField}*${yField}*${seriesField}`, size);
  } else if (size) {
    pointGeometry.size(size);
  }

  return params;
}

/**
 * shape 配置
 * @param params
 */
function shape<O extends PointGeometryOptions>(params: Params<O>): Params<O> {
  const { chart, options } = params;
  const { point, seriesField, xField, yField, color } = options;

  const pointGeometry = findGeometry(chart, 'point');
  if (pointGeometry) {
    const pointShape = point.shape;
    if (isFunction(pointShape)) {
      pointGeometry.shape(`${xField}*${yField}*${seriesField}`, pointShape);
    } else if (isString(pointShape)) {
      pointGeometry.shape(pointShape);
    }
  }
  return params;
}

/**
 * style 配置
 * @param params
 */
function style<O extends PointGeometryOptions>(params: Params<O>): Params<O> {
  const { chart, options } = params;
  const { point, seriesField, xField, yField } = options;

  const pointGeometry = findGeometry(chart, 'point');
  if (pointGeometry) {
    const { style: pointStyle } = point;
    if (isFunction(pointStyle)) {
      pointGeometry.style(`${xField}*${yField}*${seriesField}`, pointStyle);
    } else if (isObject(pointStyle)) {
      pointGeometry.style(pointStyle);
    }
  }

  return params;
}

/**
 * point 辅助点的配置处理
 * @param params
 */
export function point<O extends PointGeometryOptions>(params: Params<O>): Params<O> {
  const { options } = params;
  const { point } = options;

  if (point) {
    flow(field, shape, style)(params);
  }
  return params;
}

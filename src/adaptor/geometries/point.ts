import { isFunction, isObject, isString } from '@antv/util';
import { Params } from '../../core/adaptor';
import { Options } from '../../types';
import { ShapeStyle } from '../../types/style';

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
 * point 辅助点的配置处理
 * @param params
 */
export function point<O extends PointGeometryOptions>(params: Params<O>): Params<O> {
  const { chart, options } = params;
  const { point, seriesField, xField, yField, color } = options;

  if (point) {
    const { size, shape, style } = point;
    const pointGeometry = chart.point().position(`${xField}*${yField}`);

    // color
    if (seriesField) {
      const pointColor = isFunction(point.color) ? point.color : point.color || color;
      pointGeometry.color(seriesField, pointColor);
    }

    // size
    if (isFunction(size)) {
      pointGeometry.size(`${xField}*${yField}*${seriesField}`, size);
    } else if (size) {
      pointGeometry.size(size);
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

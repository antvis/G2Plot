import { isFunction, isObject } from '@antv/util';
import { findGeometry } from '../common/helper';
import { Params } from '../core/adaptor';
import { Options } from '../types';
import { ShapeStyle } from '../types/style';
import { flow } from '../utils';

export interface AreaGeometryOptions extends Options {
  /** x 轴字段 */
  readonly xField?: string;
  /** y 轴字段 */
  readonly yField?: string;
  /** 分组字段 */
  readonly seriesField?: string;
  readonly area?: {
    /** 是否平滑 */
    readonly smooth?: boolean;
    /** point color 映射, 提供回调的方式, 不开放 field 映射配置 */
    readonly color?: string | string[] | ((series: any) => string);
    /** 样式映射 */
    readonly style?: ShapeStyle | ((x: any, y: any, series?: any) => ShapeStyle);
  };
}

/**
 * field 配置
 * @param params
 */
function field<O extends AreaGeometryOptions>(params: Params<O>): Params<O> {
  const { chart, options } = params;
  const { seriesField, xField, yField, color } = options;
  const areaGeometry = chart.area().position(`${xField}*${yField}`);

  if (seriesField) {
    areaGeometry.color(seriesField, color);
  }

  return params;
}

/**
 * shape 配置
 * @param params
 */
function shape<O extends AreaGeometryOptions>(params: Params<O>): Params<O> {
  const { chart, options } = params;
  const { area } = options;

  const areaGeometry = findGeometry(chart, 'area');
  if (areaGeometry) {
    const { smooth } = area;
    // shape
    areaGeometry.shape(smooth ? 'smooth' : 'area');
  }
  return params;
}

/**
 * style 配置
 * @param params
 */
function style<O extends AreaGeometryOptions>(params: Params<O>): Params<O> {
  const { chart, options } = params;
  const { seriesField, xField, yField, area } = options;

  const areaGeometry = findGeometry(chart, 'area');
  if (areaGeometry) {
    const { style: areaStyle } = area;
    // style
    if (isFunction(areaStyle)) {
      areaGeometry.style(`${xField}*${yField}*${seriesField}`, areaStyle);
    } else if (isObject(areaStyle)) {
      areaGeometry.style(areaStyle);
    }
  }
  return params;
}

/**
 * area geometry 的配置处理
 * @param params
 */
export function area<O extends AreaGeometryOptions>(params: Params<O>): Params<O> {
  const { options } = params;
  const { area } = options;

  if (area) {
    flow(field, shape, style)(params);
  }
  return params;
}

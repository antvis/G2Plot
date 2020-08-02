import { isFunction, isObject } from '@antv/util';
import { Params } from '../../core/adaptor';
import { Options } from '../../types';
import { ShapeStyle } from '../../types/style';

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
 * area geometry 的配置处理
 * @param params
 */
export function area<O extends AreaGeometryOptions>(params: Params<O>): Params<O> {
  const { chart, options } = params;
  const { area, seriesField, xField, yField, color } = options;

  if (area) {
    const { smooth, style } = area;
    const areaGeometry = chart.area().position(`${xField}*${yField}`);

    // color
    if (seriesField) {
      const areaColor = isFunction(area.color) ? area.color : area.color || color;
      areaGeometry.color(seriesField, areaColor);
    }

    // shape
    areaGeometry.shape(smooth ? 'smooth' : 'area');

    // style
    if (isFunction(style)) {
      areaGeometry.style(`${xField}*${yField}*${seriesField}`, style);
    } else if (isObject(style)) {
      areaGeometry.style(style);
    }
  }
  return params;
}

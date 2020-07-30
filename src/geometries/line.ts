import { isFunction, isObject } from '@antv/util';
import { findGeometry } from '../common/helper';
import { Params } from '../core/adaptor';
import { Options } from '../types';
import { ShapeStyle } from '../types/style';
import { flow } from '../utils';

export interface LineGeometryOptions extends Options {
  /** x 轴字段 */
  readonly xField?: string;
  /** y 轴字段 */
  readonly yField?: string;
  /** 分组字段 */
  readonly seriesField?: string;
  readonly line?: {
    /** line color 映射, 提供回调的方式, 不开放 field 映射配置 */
    readonly color?: string | string[] | ((series: any) => string);
    /** 是否平滑 */
    readonly smooth?: boolean;
    /** 是否连接空数据 */
    readonly connectNulls?: boolean;
    /** 样式映射 */
    readonly style?: ShapeStyle | ((x: any, y: any, series?: any) => ShapeStyle);
    /** 折线宽度 */
    readonly size?: number;
  };
}

/**
 * field 配置
 * @param params
 */
function field<O extends LineGeometryOptions>(params: Params<O>): Params<O> {
  const { chart, options } = params;
  const { line, seriesField, xField, yField, color } = options;

  const { connectNulls, size } = line;
  const lineGeometry = chart.line({ connectNulls }).position(`${xField}*${yField}`);

  if (seriesField) {
    const lineColor = isFunction(line.color) ? line.color : line.color || color;
    lineGeometry.color(seriesField, lineColor);
  }

  if (size) {
    lineGeometry.size(size);
  }

  return params;
}

/**
 * shape 配置
 * @param params
 */
function shape<O extends LineGeometryOptions>(params: Params<O>): Params<O> {
  const { chart, options } = params;
  const { line } = options;

  const lineGeometry = findGeometry(chart, 'line');
  if (lineGeometry) {
    const { smooth } = line;
    lineGeometry.shape(smooth ? 'smooth' : 'line');
  }
  return params;
}

/**
 * style 配置
 * @param params
 */
function style<O extends LineGeometryOptions>(params: Params<O>): Params<O> {
  const { chart, options } = params;
  const { seriesField, xField, yField, line } = options;

  const lineGeometry = findGeometry(chart, 'line');
  if (lineGeometry) {
    const { style: lineStyle } = line;
    if (isFunction(lineStyle)) {
      lineGeometry.style(`${xField}*${yField}*${seriesField}`, lineStyle);
    } else if (isObject(lineStyle)) {
      lineGeometry.style(lineStyle);
    }
  }
  return params;
}

/**
 * line 辅助点的配置处理
 * @param params
 */
export function line<O extends LineGeometryOptions>(params: Params<O>): Params<O> {
  const { options } = params;
  const { line } = options;

  if (line) {
    flow(field, shape, style)(params);
  }
  return params;
}

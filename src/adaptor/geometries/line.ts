import { isFunction, isObject } from '@antv/util';
import { Params } from '../../core/adaptor';
import { Options } from '../../types';
import { ShapeStyle } from '../../types/style';

type LineOption = {
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

export interface LineGeometryOptions extends Options {
  /** x 轴字段 */
  readonly xField?: string;
  /** y 轴字段 */
  readonly yField?: string;
  /** 分组字段 */
  readonly seriesField?: string;
  readonly line?: LineOption;
}

/**
 * line 辅助点的配置处理
 * @param params
 */
export function line<O extends LineGeometryOptions>(params: Params<O>): Params<O> {
  const { chart, options } = params;
  const { seriesField, xField, yField, color, line } = options;

  if (line) {
    const { connectNulls, size, smooth, style } = line;
    const lineGeometry = chart.line({ connectNulls }).position(`${xField}*${yField}`);

    // color
    if (seriesField) {
      const lineColor = isFunction(line.color) ? line.color : line.color || color;
      lineGeometry.color(seriesField, lineColor);
    } else if (typeof color === 'string') {
      // 单折线图的颜色赋值
      lineGeometry.color(color);
    }

    // size
    if (size) {
      lineGeometry.size(size);
    }

    // shape
    lineGeometry.shape(smooth ? 'smooth' : 'line');

    // style
    if (isFunction(style)) {
      lineGeometry.style(`${xField}*${yField}*${seriesField}`, style);
    } else if (isObject(style)) {
      lineGeometry.style(style);
    }
  }
  return params;
}

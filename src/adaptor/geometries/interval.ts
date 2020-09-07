import { isNil, isFunction } from '@antv/util';
import { Params } from '../../core/adaptor';
import { Options } from '../../types';
import { ShapeStyle } from '../../types/style';

type IntervalOption = {
  /** 柱状图宽度占比 [0-1] */
  readonly widthRatio?: number;
  /** 分组中柱子之间的间距 [0-1]，仅对分组柱状图适用 */
  readonly marginRatio?: number;
  /** 柱子样式配置，可选 */
  readonly style?: ShapeStyle | ((x: any, y: any, color?: any) => ShapeStyle);
};

export interface IntervalGeometryOptions extends Options {
  /** x 轴字段 */
  readonly xField: string;
  /** y 轴字段 */
  readonly yField: string;
  /** 拆分字段，在分组柱状图下同 groupField、colorField，在堆积柱状图下同 stackField、colorField  */
  readonly seriesField?: string;
  /** 是否分组柱形图 */
  readonly isGroup?: boolean;
  /** 是否堆积柱状图 */
  readonly isStack?: boolean;
  /** 柱子样式配置 */
  readonly interval?: IntervalOption;
}

export function interval<O extends IntervalGeometryOptions>(params: Params<O>): Params<O> {
  const { chart, options } = params;
  const { xField, yField, seriesField, color, isGroup, isStack, interval } = options;

  if (interval) {
    const { marginRatio, widthRatio, style } = interval;
    const geometry = chart.interval().position(`${xField}*${yField}`);

    // field
    if (seriesField) {
      geometry.color(seriesField, color);
      // group
      if (isGroup) {
        geometry.adjust({
          type: 'dodge',
          marginRatio,
        });
      } else if (isStack) {
        // stack
        geometry.adjust({
          type: 'stack',
          marginRatio,
        });
      }
    } else if (typeof color === 'string') {
      geometry.color(color);
    }

    // widthRatio
    if (!isNil(widthRatio)) {
      chart.theme({
        columnWidthRatio: widthRatio,
      });
    }

    // style
    if (style) {
      if (isFunction(style)) {
        geometry.style(`${xField}*${yField}*${seriesField}`, style);
      } else {
        geometry.style(style);
      }
    }
  }

  return params;
}

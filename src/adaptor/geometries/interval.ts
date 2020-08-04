import { isNil, isFunction } from '@antv/util';
import { Params } from '../../core/adaptor';
import { Options } from '../../types';
import { ShapeStyle } from '../../types/style';

export interface IntervalGeometryOptions extends Options {
  /** x 轴字段 */
  readonly xField: string;
  /** y 轴字段 */
  readonly yField: string;
  /** 颜色字段，可选 */
  readonly colorField?: string;
  /** 拆分字段，在分组柱状图下同 groupField、colorField，在堆积柱状图下同 stackField、colorField  */
  readonly seriesField?: string;
  /** 是否分组柱形图 */
  readonly isGroup?: boolean;
  /** 分组拆分字段 */
  readonly groupField?: string;
  /** 是否堆积柱状图 */
  readonly isStack?: boolean;
  /** 堆积拆分字段 */
  readonly stackField?: string;
  /** 柱子样式配置 */
  readonly interval?: {
    /** 柱状图宽度占比 [0-1] */
    readonly widthRatio?: number;
    /** 分组中柱子之间的间距 [0-1]，仅对分组柱状图适用 */
    readonly marginRatio?: number;
    /** 柱子样式配置，可选 */
    readonly style?: ShapeStyle | ((x: any, y: any, color?: any) => ShapeStyle);
  };
}

export function getGroupField(params: Params<IntervalGeometryOptions>): string {
  const { options } = params;
  const { groupField, seriesField, colorField } = options;

  return groupField || seriesField || colorField;
}

export function getStackField(params: Params<IntervalGeometryOptions>): string {
  const { options } = params;
  const { stackField, seriesField, colorField } = options;

  return stackField || seriesField || colorField;
}

export function interval<O extends IntervalGeometryOptions>(params: Params<O>): Params<O> {
  const { chart, options } = params;
  const { xField, yField, colorField, color, isGroup, isStack, interval } = options;
  let realColorField = colorField;

  if (interval) {
    const { marginRatio, widthRatio, style } = interval;
    const geometry = chart.interval().position(`${xField}*${yField}`);

    // field
    if (isGroup) {
      realColorField = getGroupField(params);
      geometry.color(realColorField, color);
      geometry.adjust({
        type: 'dodge',
        marginRatio,
      });
    } else if (isStack) {
      realColorField = getStackField(params);
      geometry.color(getStackField(params), color);
      geometry.adjust({
        type: 'stack',
        marginRatio,
      });
    } else {
      if (colorField) {
        geometry.color(colorField, color);
      }
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
        geometry.style(`${xField}*${yField}*${realColorField}`, style);
      } else {
        geometry.style(style);
      }
    }
  }

  return params;
}

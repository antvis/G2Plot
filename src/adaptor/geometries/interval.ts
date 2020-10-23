import { Geometry } from '@antv/g2';
import { deepMix, isNil } from '@antv/util';
import { Params } from '../../core/adaptor';
import { getTooltipMapping } from '../../utils/tooltip';
import { GeometryOptions, MappingOptions, geometry } from './base';

export interface IntervalGeometryOptions extends GeometryOptions {
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
  /** 柱状图宽度占比 [0-1] */
  readonly widthRatio?: number;
  /** 分组中柱子之间的间距 [0-1]，仅对分组柱状图适用 */
  readonly marginRatio?: number;
  /** 柱子样式配置 */
  readonly interval?: MappingOptions;
}

/**
 * 柱形图其他的 adaptor
 * @param params
 */
function otherAdaptor<O extends IntervalGeometryOptions>(params: Params<O>): Params<O> {
  const { chart, options, ext } = params;
  const { seriesField, isGroup, isStack, marginRatio, widthRatio } = options;

  const g = ext.geometry as Geometry;
  /**
   * adjust
   */
  if (seriesField) {
    // group
    if (isGroup) {
      g.adjust({
        type: 'dodge',
        marginRatio,
      });
    } else if (isStack) {
      // stack
      g.adjust({
        type: 'stack',
        marginRatio,
      });
    }
  }

  // widthRatio
  if (!isNil(widthRatio)) {
    chart.theme({
      columnWidthRatio: widthRatio,
    });
  }

  return params;
}

export function interval<O extends IntervalGeometryOptions>(params: Params<O>): Params<O> {
  const { options } = params;
  const { xField, yField, interval, seriesField, tooltip } = options;

  const { fields, formatter } = getTooltipMapping(tooltip, [xField, yField, seriesField]);

  // 保障一定要存在 interval 映射
  const { ext } = interval
    ? geometry(
        deepMix({}, params, {
          options: {
            type: 'interval',
            colorField: seriesField,
            tooltipFields: fields,
            mapping: {
              tooltip: formatter,
              ...interval,
            },
          },
        })
      )
    : params;

  return otherAdaptor({
    ...params,
    ext,
  });
}

import { Geometry, getTheme, ShapeAttrs } from '@antv/g2';
import { isNil, isObject } from '@antv/util';
import { Params } from '../../core/adaptor';
import { deepAssign } from '../../utils';
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
  /** 柱状图最小宽度（像素） */
  readonly minColumnWidth?: number;
  /** 柱状图最大宽度（像素） */
  readonly maxColumnWidth?: number;
  /** 柱子的背景样式设置 */
  readonly columnBackground?: { style: ShapeAttrs };
  /** 柱子视觉通道配置（含 color、shape、size、style、tooltip） */
  readonly interval?: MappingOptions;
  /** 分组字段，优先级高于 seriesField , isGroup: true 时会根据 groupField 进行分组。*/
  readonly groupField?: string;
}

/**
 * 柱形图其他的 adaptor
 * @param params
 */
function otherAdaptor<O extends IntervalGeometryOptions>(params: Params<O>): Params<O> {
  const { chart, options, ext } = params;
  const { seriesField, isGroup, isStack, marginRatio, widthRatio, groupField, theme } = options;

  /**
   * adjust
   */
  const adjust = [];
  if (seriesField) {
    // group
    if (isGroup) {
      adjust.push({
        type: 'dodge',
        dodgeBy: groupField || seriesField,
        marginRatio,
      });
    }
    // stack
    if (isStack) {
      adjust.push({
        type: 'stack',
        marginRatio,
      });
    }
  }

  if (adjust.length && ext?.geometry) {
    const g = ext?.geometry as Geometry;
    g.adjust(adjust);
  }

  // widthRatio
  if (!isNil(widthRatio)) {
    chart.theme(
      deepAssign({}, isObject(theme) ? theme : getTheme(theme), {
        // columWidthRatio 配置覆盖 theme 中的配置
        columnWidthRatio: widthRatio,
      })
    );
  }

  return params;
}

export function interval<O extends IntervalGeometryOptions>(params: Params<O>): Params<O> {
  const { options } = params;
  const { xField, yField, interval, seriesField, tooltip, minColumnWidth, maxColumnWidth, columnBackground } = options;

  const { fields, formatter } = getTooltipMapping(tooltip, [xField, yField, seriesField]);

  // 保障一定要存在 interval 映射
  const { ext } = interval
    ? geometry(
        deepAssign({}, params, {
          options: {
            type: 'interval',
            colorField: seriesField,
            tooltipFields: fields,
            mapping: {
              tooltip: formatter,
              ...interval,
            },
            args: { minColumnWidth, maxColumnWidth, background: columnBackground },
          },
        })
      )
    : params;

  return otherAdaptor({
    ...params,
    ext,
  });
}

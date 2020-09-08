import { deepMix, isNil, isFunction, isString, isArray, isObject } from '@antv/util';
import { Params } from '../../core/adaptor';
import { Options, StyleAttr } from '../../types';
import { findGeometry, flow } from '../../utils';
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
  const { chart, options } = params;
  const { seriesField, isGroup, isStack, marginRatio, widthRatio } = options;

  const g = findGeometry(chart, 'interval');
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
  const { interval, seriesField } = options;

  geometry(
    deepMix({}, params, {
      options: {
        type: 'interval',
        colorField: seriesField,
        mapping: interval,
      },
    })
  );

  return otherAdaptor(params);
}

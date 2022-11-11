import { Params } from '../../core/adaptor';
import { deepAssign } from '../../utils';
import { getTooltipMapping } from '../../utils/tooltip';
import { geometry, GeometryOptions, MappingOptions } from './base';

export interface ViolinGeometryOptions extends GeometryOptions {
  /** x 轴字段 */
  readonly xField?: string;
  /** y 轴字段（指小提琴的Y轴，即概率密度） */
  readonly yField?: string;
  /** 分组字段 */
  readonly seriesField?: string;
  /** size 映射字段 */
  readonly sizeField?: string;
  /** violin 图形映射规则 */
  readonly violin?: MappingOptions;
}

/**
 * violin 辅助点的配置处理
 * @param params
 */
export function violin<O extends ViolinGeometryOptions>(params: Params<O>): Params<O> {
  const { options } = params;
  const { violin, xField, yField, seriesField, sizeField, tooltip } = options;

  const { fields, formatter } = getTooltipMapping(tooltip, [xField, yField, seriesField, sizeField]);

  return violin
    ? geometry(
        deepAssign({}, params, {
          options: {
            type: 'violin',
            colorField: seriesField,
            tooltipFields: fields,
            mapping: {
              tooltip: formatter,
              ...violin,
            },
          },
        })
      )
    : params;
}

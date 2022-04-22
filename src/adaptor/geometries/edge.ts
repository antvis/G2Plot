import { Params } from '../../core/adaptor';
import { getTooltipMapping } from '../../utils/tooltip';
import { deepAssign } from '../../utils';
import { geometry, MappingOptions, GeometryOptions } from './base';

export interface EdgeGeometryOptions extends GeometryOptions {
  /** x 轴字段 */
  readonly xField?: string;
  /** y 轴字段 */
  readonly yField?: string;
  /** 分组颜色字段 */
  readonly seriesField?: string;
  /** edge 图形映射规则 */
  readonly edge?: MappingOptions;
}

/**
 * edge 的配置处理
 * @param params
 */
export function edge<O extends EdgeGeometryOptions>(params: Params<O>): Params<O> {
  const { options } = params;
  const { edge, xField, yField, seriesField, tooltip, useDeferredLabel } = options;

  const { fields, formatter } = getTooltipMapping(tooltip, [xField, yField, seriesField]);

  return edge
    ? geometry(
        deepAssign({}, params, {
          options: {
            type: 'edge',
            colorField: seriesField,
            tooltipFields: fields,
            mapping: {
              tooltip: formatter,
              ...edge,
            },
            args: { useDeferredLabel },
          },
        })
      )
    : params;
}

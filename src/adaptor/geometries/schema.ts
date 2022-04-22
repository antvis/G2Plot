import { Params } from '../../core/adaptor';
import { getTooltipMapping } from '../../utils/tooltip';
import { deepAssign } from '../../utils';
import { geometry, MappingOptions, GeometryOptions } from './base';

export interface SchemaGeometryOptions extends GeometryOptions {
  /** x 轴字段 */
  readonly xField?: string;
  /** y 轴字段 */
  readonly yField?: string;
  /** 分组字段 */
  readonly seriesField?: string;
  /** point 图形映射规则 */
  readonly schema?: MappingOptions;
}

/**
 * schema 的配置处理
 * @param params
 */
export function schema<O extends SchemaGeometryOptions>(params: Params<O>): Params<O> {
  const { options } = params;
  const { schema, xField, yField, seriesField, tooltip, useDeferredLabel } = options;

  const { fields, formatter } = getTooltipMapping(tooltip, [xField, yField, seriesField]);

  return schema
    ? geometry(
        deepAssign({}, params, {
          options: {
            type: 'schema',
            colorField: seriesField,
            tooltipFields: fields,
            mapping: {
              tooltip: formatter,
              ...schema,
            },
            args: { useDeferredLabel },
          },
        })
      )
    : params;
}

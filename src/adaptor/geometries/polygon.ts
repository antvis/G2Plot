import { Params } from '../../core/adaptor';
import { deepAssign } from '../../utils';
import { getTooltipMapping } from '../../utils/tooltip';
import { geometry, GeometryOptions, MappingOptions } from './base';

export interface PolygonGeometryOptions extends GeometryOptions {
  /** x 轴字段 */
  readonly xField?: string;
  /** y 轴字段 */
  readonly yField?: string;
  /** 分组字段 */
  readonly seriesField?: string;
  /** point 图形映射规则 */
  readonly polygon?: MappingOptions;
}

/**
 * polygon 的配置处理
 * @param params
 */
export function polygon<O extends PolygonGeometryOptions>(params: Params<O>): Params<O> {
  const { options } = params;
  const { polygon, xField, yField, seriesField, tooltip, useDeferredLabel } = options;

  const { fields, formatter } = getTooltipMapping(tooltip, [xField, yField, seriesField]);

  return polygon
    ? geometry(
        deepAssign({}, params, {
          options: {
            type: 'polygon',
            colorField: seriesField,
            tooltipFields: fields,
            mapping: {
              tooltip: formatter,
              ...polygon,
            },
            args: { useDeferredLabel },
          },
        })
      )
    : params;
}

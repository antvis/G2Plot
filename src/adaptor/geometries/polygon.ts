import { deepMix } from '@antv/util';
import { Params } from '../../core/adaptor';
import { geometry, MappingOptions, GeometryOptions } from './base';

export interface PolygonGeometryOptions extends GeometryOptions {
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
  const { polygon, seriesField } = options;

  return polygon
    ? geometry(
        deepMix({}, params, {
          options: {
            colorField: seriesField,
            type: 'polygon',
            mapping: polygon,
          },
        })
      )
    : params;
}

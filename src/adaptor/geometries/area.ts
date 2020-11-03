import { Params } from '../../core/adaptor';
import { getTooltipMapping } from '../../utils/tooltip';
import { deepAssign } from '../../utils';
import { Options } from '../../types';
import { GeometryOptions, geometry, MappingOptions } from './base';

export type AreaGeometryOptions = GeometryOptions & {
  /** x 轴字段 */
  readonly xField?: string;
  /** y 轴字段 */
  readonly yField?: string;
  /** 分组字段 */
  readonly seriesField?: string;
  /** 是否平滑 */
  readonly smooth?: boolean;
  /** area 图形的样式设置 */
  readonly area?: MappingOptions;
} & Options;

/**
 * area geometry 的配置处理
 * @param params
 */
export function area<O extends AreaGeometryOptions>(params: Params<O>): Params<O> {
  const { options } = params;
  const { area, xField, yField, seriesField, smooth, tooltip } = options;

  const { fields, formatter } = getTooltipMapping(tooltip, [xField, yField, seriesField]);

  // 如果存在才处理
  return area
    ? geometry(
        deepAssign({}, params, {
          options: {
            type: 'area',
            colorField: seriesField,
            tooltipFields: fields,
            mapping: {
              shape: smooth ? 'smooth' : 'area',
              tooltip: formatter,
              ...area,
            },
          },
        })
      )
    : params;
}

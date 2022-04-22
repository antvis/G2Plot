import { deepMix } from '@antv/util';
import { Params } from '../../core/adaptor';
import { getTooltipMapping } from '../../utils/tooltip';
import { deepAssign } from '../../utils';
import { GeometryOptions, geometry, MappingOptions } from './base';

export interface LineGeometryOptions extends GeometryOptions {
  /** x 轴字段 */
  readonly xField?: string;
  /** y 轴字段 */
  readonly yField?: string;
  /** 分组字段 */
  readonly seriesField?: string;
  /** 是否平滑 */
  readonly smooth?: boolean;
  /** 是否连接空数据 */
  readonly connectNulls?: boolean;
  /** line 映射配置 */
  readonly line?: MappingOptions;
  /** 阶梯折线图类型 */
  readonly stepType?: string;
}

/**
 * line 辅助点的配置处理
 * @param params
 */
export function line<O extends LineGeometryOptions>(params: Params<O>): Params<O> {
  const { options } = params;
  const { line, stepType, xField, yField, seriesField, smooth, connectNulls, tooltip, useDeferredLabel } = options;

  const { fields, formatter } = getTooltipMapping(tooltip, [xField, yField, seriesField]);

  // 如果存在才处理
  return line
    ? geometry(
        deepAssign({}, params, {
          options: {
            type: 'line',
            colorField: seriesField,
            tooltipFields: fields,
            mapping: deepMix(
              {
                shape: stepType || (smooth ? 'smooth' : 'line'),
                tooltip: formatter,
              },
              line
            ),
            args: { connectNulls, useDeferredLabel },
          },
        })
      )
    : params;
}

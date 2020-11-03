import { Params } from '../../core/adaptor';
import { ColorAttr, StyleAttr, SizeAttr } from '../../types';
import { getTooltipMapping } from '../../utils/tooltip';
import { deepAssign } from '../../utils';
import { Options } from '../../types';
import { GeometryOptions, geometry } from './base';

type LineOption = {
  /** line color 映射, 提供回调的方式, 不开放 field 映射配置 */
  readonly color?: ColorAttr;
  /** 样式映射 */
  readonly style?: StyleAttr;
  /** 折线宽度 */
  readonly size?: SizeAttr;
};

export type LineGeometryOptions = GeometryOptions & {
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
  readonly line?: LineOption;
  /** 阶梯折线图类型 */
  readonly stepType?: string;
} & Options;

/**
 * line 辅助点的配置处理
 * @param params
 */
export function line<O extends LineGeometryOptions>(params: Params<O>): Params<O> {
  const { options } = params;
  const { line, stepType, xField, yField, seriesField, smooth, connectNulls, tooltip } = options;

  const { fields, formatter } = getTooltipMapping(tooltip, [xField, yField, seriesField]);

  // 如果存在才处理
  return line
    ? geometry(
        deepAssign({}, params, {
          options: {
            type: 'line',
            colorField: seriesField,
            tooltipFields: fields,
            mapping: {
              shape: stepType || (smooth ? 'smooth' : 'line'),
              tooltip: formatter,
              ...line,
            },
            args: { connectNulls },
          },
        })
      )
    : params;
}

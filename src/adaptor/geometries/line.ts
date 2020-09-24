import { deepMix } from '@antv/util';
import { Params } from '../../core/adaptor';
import { ColorAttr, StyleAttr, SizeAttr } from '../../types';
import { GeometryOptions, geometry } from './base';

type LineOption = {
  /** line color 映射, 提供回调的方式, 不开放 field 映射配置 */
  readonly color?: ColorAttr;
  /** 样式映射 */
  readonly style?: StyleAttr;
  /** 折线宽度 */
  readonly size?: SizeAttr;
};

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
  readonly line?: LineOption;
  /** 阶梯折线图类型 */
  readonly stepType?: string;
}

/**
 * line 辅助点的配置处理
 * @param params
 */
export function line<O extends LineGeometryOptions>(params: Params<O>): Params<O> {
  const { options } = params;
  const { line, stepType, seriesField, smooth, connectNulls } = options;

  // 如果存在才处理
  return line
    ? geometry(
        deepMix({}, params, {
          options: {
            type: 'line',
            colorField: seriesField,
            mapping: {
              shape: stepType || (smooth ? 'smooth' : 'line'),
              ...line,
            },
            args: { connectNulls },
          },
        })
      )
    : params;
}

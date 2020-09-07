import { GeometryLabelCfg } from '@antv/g2/lib/interface';
import { ShapeAttrs } from '@antv/g2/lib/dependents';
import { Options } from '../../types';

type BasicStyle = {
  color?: string | string[] | ((...args: any[]) => string);
  style?: ShapeAttrs;
  size?: number;
};
export type BulletData = {
  title: string;
  index?: string;
  range?: number;
  measure?: number;
  target?: number;
}[];

export interface BulletOptions extends Options {
  /** 弹图标题，用于区分不同的类型 */
  readonly xField?: string;

  /** 使用数据条的长度，表示实际数值字段，所表示值为数值或者 number[]*/
  readonly measureField: string;

  /** 使用背景色条的长度，表示区间范围 [20,50,100], 所表示值为数值或者 number[]*/
  readonly rangeField: string;

  /** 使用测量标记的刻度轴位置，表示目标值,所表示值为数值 */
  readonly targetField: string;

  /** bulletLabel 设置 */
  readonly bulletLabel?: GeometryLabelCfg;

  /** bulletStyle 包含了 measure,target,range */
  readonly bulletStyle?: {
    measure?: BasicStyle;
    target?: BasicStyle;
    range?: BasicStyle;
  };
}

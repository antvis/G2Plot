import { GeometryLabelCfg } from '@antv/g2/lib/interface';
import { Options, ColorAttr, SizeAttr, StyleAttr, Datum } from '../../types';

type GeometryLabelAttr = GeometryLabelCfg | ((datum: Datum) => GeometryLabelCfg);
export interface BulletOptions extends Options {
  /** 弹图标题，用于区分不同的类型 */
  readonly xField?: string;

  /** 使用数据条的长度，表示实际数值字段，所表示值为 number[]*/
  readonly measureField: string;

  /** 使用背景色条的长度，表示区间范围 [20,50,100], 所表示值为 number[]*/
  readonly rangeField: string;

  /** 使用测量标记的刻度轴位置，表示目标值,所表示值为数值 */
  readonly targetField: string;

  /** bulletLabel 包含了 measure,target,range */
  readonly bulletLabel?: {
    measure?: GeometryLabelAttr;
    target?: GeometryLabelAttr;
    range?: GeometryLabelAttr;
  };
  /** bulletSize 包含了 measure,target,range */
  readonly bulletSize?: {
    measure?: SizeAttr;
    target?: SizeAttr;
    range?: SizeAttr;
  };

  /** bulletColor 包含了 measure,target,range */
  readonly bulletColor?: {
    measure?: ColorAttr;
    target?: ColorAttr;
    range?: ColorAttr;
  };
  /** bulletStyle 包含了 measure,target,range */
  readonly bulletStyle?: {
    measure?: StyleAttr;
    target?: StyleAttr;
    range?: StyleAttr;
  };

  /** layout 方向选择*/
  layout?: 'horizontal' | 'vertical';
}

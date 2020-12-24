import { Types } from '@antv/g2';
import { Options, ColorAttr, SizeAttr, StyleAttr, Datum } from '../../types';

type GeometryLabelAttr = Types.GeometryLabelCfg | ((datum: Datum) => Types.GeometryLabelCfg);

type BulletAttr<T> = {
  measure?: T;
  target?: T;
  range?: T;
};
export interface BulletOptions extends Omit<Options, 'color' | 'label' | 'style'> {
  /** 弹图标题，用于区分不同的类型 */
  readonly xField?: string;

  /** 使用数据条的长度，表示实际数值字段，所表示值为 number[]*/
  readonly measureField: string;

  /** 使用背景色条的长度，表示区间范围 [20,50,100], 所表示值为 number[]*/
  readonly rangeField: string;

  /** 使用测量标记的刻度轴位置，表示目标值,所表示值为数值 */
  readonly targetField: string;

  /** label 包含了 measure,target,range */
  readonly label?: BulletAttr<GeometryLabelAttr | false>;

  /** size 包含了 measure,target,range */
  readonly size?: BulletAttr<SizeAttr>;

  /** color 包含了 measure,target,range */
  readonly color?: BulletAttr<ColorAttr>;

  /** bulletStyle 包含了 measure,target,range */
  readonly bulletStyle?: BulletAttr<StyleAttr>;

  /** layout 方向选择*/
  layout?: 'horizontal' | 'vertical';
}

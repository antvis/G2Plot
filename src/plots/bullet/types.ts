import { Types } from '@antv/g2';
import { ColorAttr, Datum, Options, SizeAttr, StyleAttr } from '../../types';

type GeometryLabelAttr = Types.GeometryLabelCfg | ((datum: Datum) => Types.GeometryLabelCfg);

type BulletAttr<T> = {
  measure?: T;
  target?: T;
  range?: T;
};
export interface BulletOptions extends Omit<Options, 'color' | 'label' | 'style'> {
  /**
   * @title 弹图标题
   * @description 用于区分不同的类型
   */
  readonly xField?: string;
  /**
   * @title 测量字段
   * @description 使用数据条的长度，表示实际数值字段，所表示值为 number[]
   */
  readonly measureField: string;
  /**
   * @title 范围字段
   * @description 使用背景色条的长度，表示区间范围 [20,50,100], 所表示值为 number[]
   */
  readonly rangeField: string;
  /**
   * @title 目标字段
   * @description 使用测量标记的刻度轴位置，表示目标值,所表示值为数值
   */
  readonly targetField: string;
  /**
   * @title 标签
   * @description 包含了 measure,target,range
   */
  readonly label?: BulletAttr<GeometryLabelAttr | false>;
  /**
   * @title 尺寸
   * @description 包含了 measure,target,range
   */
  readonly size?: BulletAttr<SizeAttr>;
  /**
   * @title 颜色
   * @description 包含了 measure,target,range
   */
  readonly color?: BulletAttr<ColorAttr>;
  /**
   * @title 项目符号样式
   * @description 包含了 measure,target,range
   */
  readonly bulletStyle?: BulletAttr<StyleAttr>;
  /**
   * @title 布局方向选择
   * @default "horizontal"
   */
  layout?: 'horizontal' | 'vertical';
}

import { PathCommand } from '@antv/g-base';
import { Options, StyleAttr, ColorAttr, Statistic, ShapeStyle } from '../../types';

/** 轮廓的配置 */
type Outline = Partial<{
  /** 外环的宽度，默认为 2px */
  readonly border: number;
  /** 内外的边距，默认为 0px */
  readonly distance: number;
  /** 外环的样式 */
  readonly style?: Pick<ShapeStyle, 'stroke' | 'strokeOpacity'>;
  // /** 外边框的形状，可以有 circle，rect，默认为 circle */
  // readonly containerShape?: 'circle' | 'rect';
}>;

type Wave = Partial<{
  /** 波形的数量，默认为 3 */
  readonly count: number;
  /** 波形的长度，默认是 192 */
  readonly length: number;
}>;

type ShapeCallback = (x: number, y: number, width: number, height: number) => PathCommand[];

/** 配置类型定义 */
export interface LiquidOptions extends Omit<Options, 'data'> {
  /** 指标比例 */
  readonly percent: number;
  /** 配置水波图的颜色，使用默认色板的颜色 */
  readonly color?: ColorAttr;
  /** 水波的外半径， 0 ~ 1，默认为 0.9 */
  readonly radius?: number;
  /** 配置水波图的样式 */
  readonly liquidStyle?: StyleAttr;
  /** 指标文本组件 */
  readonly statistic?: Statistic;
  /** 外环轮廓的配置 */
  readonly outline?: Outline;
  /** 波的配置 */
  readonly wave?: Wave;
  /** 波的形状配置（'circle' | 'rect' | 'triangle' | 'diamond'）*/
  readonly shape?: string | ShapeCallback;
}

/** 水波图自定义 的 customInfo */
export type CustomInfo = {
  radius?: LiquidOptions['radius'];
  outline?: LiquidOptions['outline'];
  wave?: LiquidOptions['wave'];
  shape?: LiquidOptions['shape'];
  background?: string;
};

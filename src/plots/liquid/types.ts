import { PathCommand } from '@antv/g-base';
import { ColorAttr, Options, ShapeStyle, Statistic, StyleAttr } from '../../types';

/**
 * @title 轮廓
 */
type Outline = Partial<{
  /**
   * @title 外环的宽度
   * @default "2px"
   */
  readonly border: number;
  /**
   * @title 内外的边距
   * @default "0px"
   */
  readonly distance: number;
  /**
   * @title 外环的样式
   */
  readonly style?: Pick<ShapeStyle, 'stroke' | 'strokeOpacity'>;
  // /** 外边框的形状，可以有 circle，rect，默认为 circle */
  // readonly containerShape?: 'circle' | 'rect';
}>;

type Wave = Partial<{
  /**
   * @title 波形的数量
   * @default 3
   */
  readonly count: number;
  /**
   * @title 波形的长度
   * @default 192
   */
  readonly length: number;
}>;

type ShapeCallback = (x: number, y: number, width: number, height: number) => PathCommand[];

/**
 * @title 配置类型定义
 */
export interface LiquidOptions extends Omit<Options, 'data'> {
  /**
   * @title 指标比例
   */
  readonly percent: number;
  /**
   * @title 配置水波图的颜色
   * @description 使用默认色板的颜色
   */
  readonly color?: ColorAttr;
  /**
   * @title 水波的外半径
   * @description 范围0-1
   * @default 0.9
   */
  readonly radius?: number;
  /**
   * @title 水波图的样式
   */
  readonly liquidStyle?: StyleAttr;
  /**
   * @title 形状的样式
   */
  readonly shapeStyle?: StyleAttr;
  /**
   * @title 指标文本组件
   */
  readonly statistic?: Statistic;
  /**
   * @title 外环轮廓
   */
  readonly outline?: Outline;
  /**
   * @title 波的配置
   */
  readonly wave?: Wave;
  /**
   * @title 波的形状配置
   * @description （'circle' | 'rect' | 'triangle' | 'diamond'）
   */
  readonly shape?: string | ShapeCallback;
}

/**
 * @title 水波图自定义 的 customInfo
 */
export type CustomInfo = {
  percent?: LiquidOptions['percent'];
  radius?: LiquidOptions['radius'];
  outline?: LiquidOptions['outline'];
  wave?: LiquidOptions['wave'];
  shape?: LiquidOptions['shape'];
  shapeStyle?: LiquidOptions['shapeStyle'];
  background?: string;
  animation?: LiquidOptions['animation'];
};

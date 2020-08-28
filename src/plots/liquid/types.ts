import { Options } from '../../types';
import { ShapeStyle } from '../../types/style';

type Statistic = {
  /** 统计文本的样式 */
  readonly style?: ShapeStyle | ((v: number) => ShapeStyle);
  /** 文本的格式化 */
  readonly formatter?: (v: number) => string;
};

/** 配置类型定义 */
export interface LiquidOptions extends Omit<Options, 'data'> {
  /** 指标比例 */
  readonly percent: number;
  /** 配置水波图的颜色，使用默认色板的颜色 */
  readonly color?: string | ((v: number) => string);
  /** 配置水波图的样式 */
  readonly liquidStyle?: ShapeStyle | ((v: number) => ShapeStyle);
  /** 指标文本组件 */
  readonly statistic?: Statistic;
}

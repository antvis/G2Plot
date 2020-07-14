import { TextStyle } from './common';

export type Axis = {
  /**
   * 是否可见
   */
  readonly visible?: boolean;

  /**
   * 期望的坐标轴刻度数量，非最终结果
   */
  readonly tickCount?: number;

  /**
   * 坐标轴刻度间隔
   */
  readonly tickInterval?: number;

  /**
   * 坐标轴最小值
   */
  readonly min?: number;

  /**
   * 坐标轴最大值
   */
  readonly max?: number;

  /**
   * 网格线
   */
  readonly grid?: {
    /** 是否可见 */
    readonly visible?: boolean;
    /** 网格线样式 */
    readonly style?: TextStyle;
  };

  /**
   * 坐标轴轴线
   */
  readonly line?: {
    /** 是否可见 */
    readonly visible?: boolean;
    /** 轴线样式 */
    readonly style?: TextStyle;
  };

  /**
   * 坐标轴刻度
   */
  readonly tickLine?: {
    /** 是否可见 */
    readonly visible?: boolean;
    /** 刻度样式 */
    readonly style?: TextStyle;
  };

  /**
   * 坐标轴标签
   */
  readonly label?: {
    /** 是否可见 */
    readonly visible?: boolean;
    /** 标签格式化 */
    readonly formatter?: (label: string) => string;
    /** 后缀 */
    readonly suffix?: string;
    /** 前缀 */
    readonly prefix?: string;
    /** 标签精度 */
    readonly precision?: number;
    /** 在 x 方向上的偏移量*/
    readonly offsetX?: number;
    /** 在 y 方向上的偏移量 */
    readonly offsetY?: number;
    /** 是否自动隐藏 */
    readonly autoHide?: boolean;
    /** 是否自动旋转 */
    readonly autoRotate?: boolean;
    /** 标签样式 */
    readonly style?: TextStyle;
  };

  /**
   * 坐标轴标题
   */
  readonly title?: {
    /** 是否可见 */
    readonly visible?: boolean;
    /** 标题文字 */
    readonly text?: string;
    /** 偏移量 */
    readonly offset?: number;
    /** 标题样式 */
    readonly style?: TextStyle;
  };
};

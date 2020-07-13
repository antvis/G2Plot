import { TextStyle } from './common';

export type Axis = {
  /**
   * 是否可见
   */
  visible: boolean;

  /**
   * 坐标轴刻度数量，非常量
   */
  tickCount: number;

  /**
   * 坐标轴刻度间隔
   */
  tickInterval: number;

  /**
   * 坐标轴最小值
   */
  min: number;

  /**
   * 坐标轴最大值
   */
  max: number;

  /**
   * 网格线
   */
  grid: {
    /** 是否可见 */
    visible: boolean;
    /** 网格线样式 */
    style: TextStyle;
  };

  /**
   * 坐标轴轴线
   */
  line: {
    /** 是否可见 */
    visible: boolean;
    /** 轴线样式 */
    style: TextStyle;
  };

  /**
   * 坐标轴刻度
   */
  tickLine: {
    /** 是否可见 */
    visible: boolean;
    /** 刻度样式 */
    style: TextStyle;
  };

  /**
   * 坐标轴标签
   */
  label: {
    /** 是否可见 */
    visible: boolean;
    /** 标签格式化 */
    formatter: (label: string) => string;
    /** 后缀 */
    suffix: string;
    /** 前缀 */
    prefix: string;
    /** 标签精度 */
    precision: number;
    /** 在 x 方向上的偏移量*/
    offsetX: number;
    /** 在 y 方向上的偏移量 */
    offsetY: number;
    /** 是否自动隐藏 */
    autoHide: boolean;
    /** 是否自动旋转 */
    autoRotate: boolean;
    /** 标签样式 */
    style: TextStyle;
  };

  /**
   * 坐标轴标题
   */
  title: {
    /** 是否可见 */
    visible: boolean;
    /** 标题文字 */
    text: string;
    /** 偏移量 */
    offset: number;
    /** 标题样式 */
    style: TextStyle;
  };
};

import { ShapeAttrs } from '@antv/g2';

/**
 * @description 一些按钮的类型定义，比如 brush filter 中的 Button
 *
 * 和 GUI Button 尽量保持一致
 */
export type ButtonCfg = {
  /**
   * @title 间距
   * @description 文本与按钮边缘的间距
   */
  padding?: number | number[];
  /**
   * @title 文本
   * @description 按钮文本
   */
  text?: string;
  /**
   * @title 文本样式
   * @title 自定义文本样式
   */
  textStyle?: {
    default?: ShapeAttrs;
  };
  /**
   * @title 按钮样式
   * @description 自定义按钮样式
   */
  buttonStyle?: {
    default?: ShapeAttrs;
    active?: ShapeAttrs;
  };
};

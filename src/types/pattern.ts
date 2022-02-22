export type PatternCfg = {
  /**
   * @title 背景色
   * @description pattern background color. Default: inherit (默认: 继承图形元素颜色)
   * @default "inherit"
   */
  backgroundColor?: string;
  /**
   * @title 贴图图案填充色
   */
  fill?: string;
  /**
   * @title 填充透明度
   */
  fillOpacity?: number;
  /**
   * @title 描边色
   * @description 贴图图案描边色
   */
  stroke?: string;
  /**
   * @title 描边透明度
   */
  strokeOpacity?: number;
  /**
   * @title 描边粗细
   */
  lineWidth?: number;
  /**
   * @title 透明度
   * @description 整个pattern 透明度
   */
  opacity?: number;
  /**
   * @title 旋转角度
   * @description 整个pattern 的旋转角度
   */
  rotation?: number;
};

/**
 * @title dot pattern
 */
export type DotPatternCfg = PatternCfg & {
  /**
   * @title 点的大小
   * @default 4
   */
  size?: number;
  /**
   * @title 点间距
   * @default 4
   */
  padding?: number;
  /**
   * @title 是否交错
   * @default true
   */
  isStagger?: boolean;
};

/**
 * @title line pattern
 */
export type LinePatternCfg = PatternCfg & {
  /**
   * @title 线之间的距离
   */
  spacing?: number;
};

/**
 * @title square pattern
 */
export type SquarePatternCfg = PatternCfg & {
  /**
   * @title 矩形的大小
   */
  size?: number;
  /**
   * @title 矩形之间的间隔
   */
  padding?: number;
  /**
   * @title 是否交错
   * @description 即 staggered squares.
   * @default true
   */
  isStagger?: boolean;
};

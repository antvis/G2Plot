export type PatternCfg = {
  /** pattern background color. Default: inherit (默认: 继承图形元素颜色) */
  backgroundColor?: string;
  /** pattern fill color. 贴图图案填充色 */
  fill?: string;
  /** 填充透明度 */
  fillOpacity?: number;
  /** pattern stroke color. 贴图图案描边色 */
  stroke?: string;
  /** 描边透明度 */
  strokeOpacity?: number;
  /** lines thickness. 描边粗细 */
  lineWidth?: number;
  /** 整个pattern 透明度 */
  opacity?: number;
  /** 整个pattern 的旋转角度 */
  rotation?: number;
};

/**
 * dot pattern
 */
export type DotPatternCfg = PatternCfg & {
  /** 点的大小, 默认: 4 */
  size?: number;
  /** padding between dots, 默认: 4 */
  padding?: number;
  /** 是否交错，默认: true. 即 staggered dots. */
  isStagger?: boolean;
};

/**
 * line pattern
 */
export type LinePatternCfg = PatternCfg & {
  /** pacing between lines. 线之间的距离 */
  spacing?: number;
};

/**
 * square pattern
 */
export type SquarePatternCfg = PatternCfg & {
  /** 矩形的大小 */
  size?: number;
  /** 矩形之间的间隔 */
  padding?: number;
  /** 是否交错，默认: true. 即 staggered squares. */
  isStagger?: boolean;
};

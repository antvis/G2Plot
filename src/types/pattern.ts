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

  mode?: 'repeat' | 'no-repeat' | 'repeat-x' | 'repeat-y';
  opacity: number; // 整个贴图透明
};

/**
 * dot pattern
 */
export type DotPatternCfg = PatternCfg & {
  /** 点的半径大小, 默认: 4 */
  radius?: number;
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
  /** lines rotation. */
  rotation?: number;
};

/**
 * square pattern
 */
export type SquarePatternCfg = PatternCfg & {
  /** rotation */
  rotation?: number;
  size?: number;
  padding?: number;
  /** 是否交错，默认: true. 即 staggered squares. */
  isStagger?: boolean;
};

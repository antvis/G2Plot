export type PatternOptions = {
  opacity: number; // 整个贴图透明
  stroke?: string;
  strokeWidth?: number;
  bgColor?: string | 'inherit';
  mode?: 'repeat' | 'no-repeat' | 'repeat-x' | 'repeat-y';
};

/**
 * dot pattern
 */
export type DotPatternOptions = PatternOptions & {
  radius?: number;
  padding?: number;
  fillOpacity?: number;
  /** 是否交错，默认: true. 即 staggered dots. */
  isStagger?: boolean;
  fill?: string;
};

export type LinePatternOptions = PatternOptions & {
  spacing?: number;
  rotate?: number;
  strokeOpacity?: number;
};

export type SquarePatternOptions = PatternOptions & {
  size?: number;
  rotate?: number;
  padding?: number;
  fill?: string;
  fillOpacity?: number;
  isStagger?: boolean;
};

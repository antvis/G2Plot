import { LinePattern, LineCfg } from './line';
import { DotPattern, DotCfg } from './dot';

// 注册 pattern shape
const PATTERN_SHAPE = {
  line: LinePattern,
  dot: DotPattern,
  // square: SquarePattern,
};

// 支持传入的 pattern option
export type PatternOptions = PatternShape | PatternStyle;

export type PatternShape = 'dot' | 'square' | 'line'; //...

export type PatternStyle = {
  type?: PatternShape;
  cfg?: LineCfg | DotCfg; // DotCfg | SquareCfg ...
};

// 用户外部可调用的 createPattern 方法
export function createPattern(options: PatternOptions) {
  const { type, cfg } = options as PatternStyle;
  const patternCanvas = document.createElement('canvas');
  const patternContext = patternCanvas.getContext('2d');

  const Shape = PATTERN_SHAPE[type];
  const shape = new Shape(cfg).getCanvas(); // cfg可传可不传，给定默认的

  const pattern = patternContext.createPattern(shape, cfg?.mode || 'repeat');

  return pattern;
}

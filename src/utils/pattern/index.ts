import { createDotPattern } from './dot';
import { LinePattern, LineCfg } from './line';

// 注册 pattern shape
const PATTERN_SHAPE = {
  line: LinePattern,
  // square: SquarePattern,
};

// 支持传入的 pattern option
export type PatternOptions = PatternShape | PatternStyle;

export type PatternShape = 'dot' | 'square' | 'line'; //...

export type PatternStyle = {
  type?: PatternShape;
  cfg?: LineCfg; // DotCfg | SquareCfg ...
};

// 用户外部可调用的 createPattern 方法
export function createPattern(options: PatternOptions): CanvasPattern {
  const { type, cfg } = options as PatternStyle;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  let patternCanvas;

  if (type === 'dot') {
    patternCanvas = createDotPattern(cfg);
  } else if (PATTERN_SHAPE[type]) {
    patternCanvas = new PATTERN_SHAPE[type](cfg).getCanvas(); // cfg可传可不传，给定默认的
  }

  return ctx.createPattern(patternCanvas, cfg?.mode || 'repeat');
}

import { DotPatternOptions, LinePatternOptions } from '../../types/pattern';
import { createDotPattern } from './dot';
import { createLinePattern } from './line';
import { createSquarePattern } from './square';

// 支持传入的 pattern option
export type PatternOptions = PatternShape | PatternStyle;

export type PatternShape = 'dot' | 'square' | 'line'; //...

export type PatternStyle = {
  type?: PatternShape;
  cfg?: DotPatternOptions | LinePatternOptions; // DotCfg | SquareCfg ...
};

// 用户外部可调用的 createPattern 方法
export function createPattern(options: PatternOptions): CanvasPattern {
  const { type, cfg } = options as PatternStyle;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  let patternCanvas;

  switch (type) {
    case 'dot':
      patternCanvas = createDotPattern(cfg);
      break;
    case 'line':
      patternCanvas = createLinePattern(cfg);
      break;
    case 'square':
      patternCanvas = createSquarePattern(cfg);
      break;
    default:
      return;
  }

  return ctx.createPattern(patternCanvas, cfg?.mode || 'repeat');
}

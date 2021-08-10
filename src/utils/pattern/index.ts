import { DotPatternCfg, LinePatternCfg, SquarePatternCfg } from '../../types/pattern';
import { createDotPattern } from './dot';
import { createLinePattern } from './line';
import { createSquarePattern } from './square';

export type PatternShape = 'dot' | 'square' | 'line'; //...

export type PatternOption =
  | {
      type: 'dot';
      cfg?: DotPatternCfg;
    }
  | {
      type: 'line';
      cfg?: LinePatternCfg;
    }
  | {
      type: 'square';
      cfg?: SquarePatternCfg;
    };

/**
 * 获取内置的 CanvasPattern 方法
 * @param options
 * @returns
 */
export function getCanvasPattern(options: PatternOption): CanvasPattern {
  const { type, cfg } = options;
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

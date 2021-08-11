import { DotPatternCfg, LinePatternCfg, SquarePatternCfg } from '../../types/pattern';
import { createDotPattern } from './dot';
import { createLinePattern } from './line';
import { createSquarePattern } from './square';

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

  switch (type) {
    case 'dot':
      return createDotPattern(cfg);
    case 'line':
      return createLinePattern(cfg);
    case 'square':
      return createSquarePattern(cfg);
    default:
      return;
  }
}

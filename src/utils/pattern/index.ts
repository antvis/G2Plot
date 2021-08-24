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
export function getCanvasPattern(options: PatternOption): CanvasPattern | undefined {
  const { type, cfg } = options;

  let pattern;

  switch (type) {
    case 'dot':
      pattern = createDotPattern(cfg);
      break;
    case 'line':
      pattern = createLinePattern(cfg);
      break;
    case 'square':
      pattern = createSquarePattern(cfg);
      break;
    default:
      break;
  }

  return pattern;
}

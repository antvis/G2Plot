import { isObjectLike } from '@antv/util';
import { deepAssign } from '../../utils';
import { Pattern, PatternCfg } from './base';

export type LineCfg = PatternCfg & {
  spacing?: number;
  rotate?: number;
  //...
};

export class LinePattern extends Pattern<LineCfg> {
  private static defaultCfg = {
    rotate: 45,
    spacing: 10,
    bgColor: '#FFE869',
    opacity: 1,
    padding: 5,
    stroke: '#F7B32D',
    strokeWidth: 2,
  };

  protected init() {
    //...
  }

  private drawLine(start, end) {
    //...
  }

  protected initOptions(options?: LineCfg) {
    let cfg = {};
    if (isObjectLike(options)) {
      cfg = options;
    }
    return deepAssign({}, LinePattern.defaultCfg, cfg);
  }
}

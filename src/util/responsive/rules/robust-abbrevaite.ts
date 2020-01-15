import { Shape } from '@antv/g';

import datetimeStringAbbrevaite, { isTime } from './datetime-string-abbrevaite';
import digitsAbbreviate from './digits-abbreviate';
import textAbbreviate from './text-abbreviate';

interface RobustAbbrevaiteCfg {
  keep?: string[];
  abbreviateBy?: 'start' | 'middle' | 'end';
  unit?: 'k' | 'm' | 'b' | 't' | 'auto';
  decimal?: number;
}

export default function robustAbbrevaite(shape: Shape, option: RobustAbbrevaiteCfg, index, cfg) {
  const nodes = cfg.nodes.nodes;
  const text = shape.attr('text');
  /** 判断text类型： 数字、时间、文本 */
  const isnum = /^\d+$/.test(text);
  if (isnum) {
    digitsAbbreviate(shape, option, index, nodes);
  } else if (isTime(text)) {
    datetimeStringAbbrevaite(shape, option, index, nodes);
  } else {
    textAbbreviate(shape, option);
  }
}

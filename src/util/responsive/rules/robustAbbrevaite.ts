import { Shape } from '@antv/g';
import moment from 'moment';

import datetimeStringAbbrevaite, { isTime } from './datetimeStringAbbrevaite';
import digitsAbbreviate from './digitsAbbreviate';
import textAbbreviate from './textAbbreviate';

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
  } else if (moment(text).isValid() || isTime(text)) {
    datetimeStringAbbrevaite(shape, option, index, nodes);
  } else {
    textAbbreviate(shape, option);
  }
}

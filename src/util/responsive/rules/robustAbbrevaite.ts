import moment from 'moment';
import { Shape } from '@antv/g';

import digitsAbbreviate from './digitsAbbreviate';
import datetimeStringAbbrevaite, {isTime} from './datetimeStringAbbrevaite';
import textAbbreviate from './textAbbreviate';

interface RobustAbbrevaiteCfg {
    keep?: string[];
    abbreviateBy?: 'start' | 'middle' | 'end';
    unit?: 'k' | 'm' | 'b' | 't' | 'auto';
    decimal?: number;
  }
  
export default function robustAbbrevaite(shape: Shape, cfg: RobustAbbrevaiteCfg, index, responsive) {
    const nodes = responsive.nodes.nodes;
    const text = shape.attr('text');
    /** 判断text类型： 数字、时间、文本 */
    const isnum = /^\d+$/.test(text);
    if (isnum) {
      digitsAbbreviate(shape, cfg, index, nodes);
    } else if (moment(text).isValid() || isTime(text)) {
      datetimeStringAbbrevaite(shape, cfg, index, nodes);
    } else {
      textAbbreviate(shape, cfg);
    }
}
  
import * as _ from '@antv/util';
import LabelParser from '../../../../components/label/parser';
import { LooseMap } from '../../../../interface/types';
import {
  getPrecisionFormatter,
  getSuffixFormatter,
  combineFormatter,
  getNoopFormatter,
} from '../../../../util/formatter';

export default class FunnelLabelParser extends LabelParser {
  protected parseFormatter(config: LooseMap, xValue: string, yValue: string) {
    const labelProps = this.originConfig;
    const preformatter = combineFormatter(
      getNoopFormatter(),
      getPrecisionFormatter(labelProps.precision),
      getSuffixFormatter(labelProps.suffix)
    );

    config.formatter = (text, item, idx) => {
      const yValueFormatted = preformatter(yValue, item, idx);
      if (_.isFunction(labelProps.formatter)) {
        return labelProps.formatter(xValue, yValueFormatted, item, idx);
      } else {
        return `${xValue} ${yValueFormatted}`;
      }
    };
  }
}

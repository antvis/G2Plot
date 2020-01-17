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
  protected parseFormatter(config: LooseMap, ...values: any[]) {
    const labelProps = this.originConfig;
    const preformatter = combineFormatter(
      getNoopFormatter(),
      getPrecisionFormatter(labelProps.precision),
      getSuffixFormatter(labelProps.suffix)
    );

    const plotProps = this.plot.options;

    config.formatter = (xValue, item, idx) => {
      const proc = (yValue, yValueTop) => {
        const yValueFormatted = preformatter(yValue, item, idx);
        if (_.isFunction(labelProps.formatter)) {
          return labelProps.formatter(xValue, item, idx, yValue, yValueTop);
        } else {
          return `${xValue} ${yValueFormatted}`;
        }
      };

      if (plotProps.compareField) {
        const yValues = _.get(item, `_origin.__compare__.yValues`);
        const yValuesTop = _.get(this.plot.getData(), `0.__compare__.yValues`);
        return [0, 1]
          .map((i) => {
            const yValue = yValues[i];
            const yValueTop = yValuesTop[i];
            return proc(yValue, yValueTop);
          })
          .join('    ');
      } else {
        const yValue = _.get(item, `_origin.${plotProps.yField}`);
        const yValueTop = _.get(this.plot.getData(), `0.${plotProps.yField}`);

        return proc(yValue, yValueTop);
      }
    };
  }
}

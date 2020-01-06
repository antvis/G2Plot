import { isFunction } from '@antv/util';
import LabelParser from '../../../../components/label/parser';
import { LooseMap } from '../../../../interface/types';
import { getPrecisionFormatter, getSuffixFormatter } from '../../../../util/formatter';

export default class FunnelLabelParser extends LabelParser {
  protected parseFormatter(config: LooseMap, xValue: string, yValue: string) {
    const labelProps = this.originConfig;
    config.formatter = (text: string, item: any, idx: number) => {
      const xValueFormatted = xValue;
      let yValueFormatted = yValue;

      yValueFormatted = getPrecisionFormatter(labelProps.precision)(yValueFormatted, item, idx);
      yValueFormatted = getSuffixFormatter(labelProps.suffix)(yValueFormatted, item, idx);

      if (isFunction(labelProps.formatter)) {
        return labelProps.formatter(xValueFormatted, yValueFormatted, item, idx);
      }
      return `${xValueFormatted} ${yValueFormatted}`;
    };
  }
}

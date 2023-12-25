import { flow, transformOptions, assign, isNumber, divide, ceil, get } from '../../utils';
import { mark } from '../../adaptor';
import type { Adaptor } from '../../types';
import type { HistogramOptions } from './type';

type Params = Adaptor<HistogramOptions>;

/**
 * @param chart
 * @param options
 */
export function adaptor(params: Params) {
  const transformHistogramConfig = (params: Params) => {
    const { options } = params;
    const { data, binNumber, binWidth, children, channel = 'count' } = options;
    const targetTransform = get(children, '[0].transform[0]', {});
    if (isNumber(binWidth)) {
      assign(targetTransform, { thresholds: ceil(divide(data.length, binWidth)), y: channel });
      return params;
    }

    if (isNumber(binNumber)) {
      assign(targetTransform, { thresholds: binNumber, y: channel });
      return params;
    }
    return params;
  };

  return flow(transformHistogramConfig, mark, transformOptions)(params);
}

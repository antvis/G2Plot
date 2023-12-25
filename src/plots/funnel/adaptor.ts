import { flow, transformOptions, set, groupBy } from '../../utils';
import { mark } from '../../adaptor';
import type { Adaptor } from '../../types';
import type { FunnelOptions } from './type';

type Params = Adaptor<FunnelOptions>;

/**
 * @param chart
 * @param options
 */
export function adaptor(params: Params) {
  /**
   * 图表差异化处理
   */
  const init = (params: Params) => {
    const { options } = params;
    const { xField, colorField } = options;
    if (!colorField) {
      set(options, 'colorField', xField);
    }
    return params;
  };

  const transform = (params: Params) => {
    const { options } = params;
    const { compareField, transform, isTransposed = true, coordinate } = options;
    if (!transform) {
      if (compareField) {
        set(options, 'transform', []);
      } else {
        set(options, 'transform', [{ type: 'symmetryY' }]);
      }
    }
    if (!coordinate && isTransposed) {
      set(options, 'coordinate', { transform: [{ type: 'transpose' }] });
    }
    return params;
  };

  const compare = (params: Params) => {
    const { options } = params;
    const { compareField, seriesField, data, children, yField, isTransposed = true } = options;

    if (compareField || seriesField) {
      const groupedData = Object.values(groupBy(data, (item) => item[compareField || seriesField]));
      children[0].data = groupedData[0];
      children.push({
        type: 'interval',
        data: groupedData[1],
        // @ts-ignore
        yField: (item) => -item[yField],
      });
      delete options['compareField'];
      delete options.data;
    }
    if (seriesField) {
      set(options, 'type', 'spaceFlex');
      set(options, 'ratio', [1, 1]);
      set(options, 'direction', isTransposed ? 'row' : 'col');
      // @ts-expect-error
      delete options['seriesField'];
    }

    return params;
  };

  const tooltip = (params) => {
    const { options } = params;
    const { tooltip, xField, yField } = options;
    if (!tooltip) {
      set(options, 'tooltip', {
        title: false,
        items: [
          (d) => {
            return { name: d[xField], value: d[yField] };
          },
        ],
      });
    }
    return params;
  };

  return flow(init, transform, compare, tooltip, mark, transformOptions)(params);
}

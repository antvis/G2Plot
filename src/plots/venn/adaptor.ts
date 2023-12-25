import { flow, isArray, omit, set, transformOptions } from '../../utils';
import type { Adaptor } from '../../types';
import { DefaultTransformKey, type VennOptions } from './type';

type Params = Adaptor<VennOptions>;

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
    const { data, setsField, sizeField } = options;
    if (isArray(data)) {
      set(options, 'data', {
        type: 'inline',
        value: data,
        transform: [
          {
            type: 'venn',
            sets: setsField,
            size: sizeField,
            as: [DefaultTransformKey.color, DefaultTransformKey.d],
          },
        ],
      });
      set(options, 'colorField', setsField);
      set(options, ['children', '0', 'encode', 'd'], DefaultTransformKey.d);
    }
    set(params, 'options', omit(options, ['sizeField', 'setsField']));
    return params;
  };

  return flow(init, transformOptions)(params);
}

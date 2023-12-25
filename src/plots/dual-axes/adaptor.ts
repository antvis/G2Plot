import { mark } from '../../adaptor';
import type { Adaptor } from '../../types';
import { flow, transformOptions, get, set } from '../../utils';
import type { DualAxesOptions } from './type';

type Params = Adaptor<DualAxesOptions>;

/**
 * @param chart
 * @param options
 */
export function adaptor(params: Params) {
  /**
   * @description Top level annotations needs to share scale, when top level annotations is not empty, scale needs to be dynamically set.
   */
  const annotations = (params: Params) => {
    const { options } = params;
    const { annotations = [], children = [], scale } = options;
    let sharedScale = false;
    if (get(scale, 'y.key')) {
      return params;
    }
    children.forEach((child, index) => {
      if (!get(child, 'scale.y.key')) {
        const scaleKey = `child${index}Scale`;
        set(child, 'scale.y.key', scaleKey);
        const { annotations: childAnnotations = [] } = child;
        /**
         * @description If the child has annotations, the scale of the child needs to be assigned scaleKey to connect the annotation.
         */
        if (childAnnotations.length > 0) {
          set(child, 'scale.y.independent', false);
          childAnnotations.forEach((annotation) => {
            set(annotation, 'scale.y.key', scaleKey);
          });
        }
        if (!sharedScale && annotations.length > 0 && get(child, 'scale.y.independent') === undefined) {
          sharedScale = true;
          set(child, 'scale.y.independent', false);
          annotations.forEach((annotation) => {
            set(annotation, 'scale.y.key', scaleKey);
          });
        }
      }
    });
    return params;
  };
  return flow(annotations, mark, transformOptions)(params);
}

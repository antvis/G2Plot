import type { Annotation } from '../types/annotation';
import { assignDeep } from './helper';

/**
 * @todo Support built-in specific types.
 */
export function defineAnnotation(annotation: Annotation, options) {
  const { data, encode } = options;

  return assignDeep(
    {},
    {
      data,
      encode,
      ...annotation,
    },
  );
}

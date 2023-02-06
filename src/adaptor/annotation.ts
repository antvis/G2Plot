import type { Adaptor } from '../types/common';
import type { Annotation as AnnotationProps } from '../types/annotation';

/**
 * @todo Support built-in specific types.
 */
export const Annotation: Adaptor<AnnotationProps> = (props, options) => {
  return (marks) => {
    const { data, encode, scale } = options;

    const newMark = {
      data,
      encode,
      scale,
      ...props,
    };

    return [...marks, newMark];
  };
};

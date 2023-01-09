import { compact } from '../../utils/helper';
import type { TemplateOptions } from './type';

export type { TemplateOptions };

export function Template(options: TemplateOptions) {
  return () => {
    const marks = [];

    return compact(marks);
  };
}

Template.props = { composite: true };

import { flow } from '../utils';
import type { Adaptor } from '../types';
import { shapeStack } from './shape-stack';

/**
 * 根据图表类型新增一些高阶 Mark
 */
export function mark<P extends Adaptor>(params: P) {
  return flow(shapeStack)(params);
}

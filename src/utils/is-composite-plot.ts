import { Options } from '../types';

/**
 * 是否是复合图表
 */
export const isCompositePlot = (options: Options) => options.children?.length > 0;

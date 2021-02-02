import { Options } from '../../types';
import { Adaptor } from '../../core/adaptor';

/**
 * 获取指定 plot 的 adaptor
 */
export function getAdaptor<O extends Options>(plot: string): Adaptor<O> | null {
  try {
    const module = require(`../${plot}/adaptor`);
    return module ? module.adaptor : null;
  } catch (e) {
    console.error(`could not find ${plot} plot`);
    return null;
  }
}

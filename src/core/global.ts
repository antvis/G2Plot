import { each } from '@antv/util';
/**
 * @file 全局的一些变量定义：含国际化、主题...
 */
export const GLOBAL = {
  /** 全局语言 */
  locale: 'en-US',
};

/**
 * 全局变量设置
 * @param key
 * @param value
 */
export function setGlobal(datum: Record<string, any>): void {
  each(datum, (v, k) => (GLOBAL[k] = v));
}

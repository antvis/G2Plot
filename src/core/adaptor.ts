import { Options } from '../types';

/**
 * schema 转 G2 的适配器基类
 */
export abstract class Adaptor<O extends Options> {
  public convent(options: O) {}
}

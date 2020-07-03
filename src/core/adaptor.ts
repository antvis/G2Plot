import { Chart } from '@antv/g2';
import { Options } from '../types';

/**
 * schema 转 G2 的适配器基类
 */
export abstract class Adaptor<O extends Options> {
  /**
   * 将 G2Plot 配置转换成 G2 的逻辑操作
   * @param chart
   * @param options
   */
  public abstract convent(chart: Chart, options: O);
}

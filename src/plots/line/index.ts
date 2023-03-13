import { Plot } from '../../core/plot';
import type { Adaptor } from '../../types';
import { adaptor } from './adaptor';
import { LineOptions } from './type';

export type { LineOptions };

export class Line extends Plot<LineOptions> {
  /** 图表类型 */
  public type = 'line';

  /**
   * 获取 折线图 默认配置项
   * 供外部使用
   */
  static getDefaultOptions(): Partial<LineOptions> {
    return { type: 'line' };
  }

  /**
   * 获取 折线图 默认配置
   */
  protected getDefaultOptions() {
    return Line.getDefaultOptions();
  }

  /**
   * 折线图适配器
   */
  protected getSchemaAdaptor(): (params: Adaptor<LineOptions>) => void {
    return adaptor;
  }
}

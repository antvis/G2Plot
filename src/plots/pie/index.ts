import { Plot } from '../../base';
import type { Adaptor } from '../../types';
import { adaptor } from './adaptor';
import { PieOptions } from './type';

export type { PieOptions };

export class Pie extends Plot<PieOptions> {
  /** 图表类型 */
  public type = 'pie';

  /**
   * 获取 饼图 默认配置项
   * 供外部使用
   */
  static getDefaultOptions(): Partial<PieOptions> {
    return {
      type: 'view',
      children: [{ type: 'interval' }],
      coordinate: { type: 'theta' },
      transform: [{ type: 'stackY', reverse: true }],
      animate: { enter: { type: 'waveIn' } },
    };
  }

  /**
   * 获取 折线图 默认配置
   */
  protected getDefaultOptions() {
    return Pie.getDefaultOptions();
  }

  /**
   * 折线图适配器
   */
  protected getSchemaAdaptor(): (params: Adaptor<PieOptions>) => void {
    return adaptor;
  }
}

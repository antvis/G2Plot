import { Adaptor } from '../../core/adaptor';
import { Plot } from '../../core/plot';
import { deepAssign } from '../../utils';
import { adaptor } from './adaptor';
import { DualAxesOptions } from './types';

export type { DualAxesOptions };

export class DualAxes extends Plot<DualAxesOptions> {
  /** 图表类型: 双轴图 */
  public type: string = 'dual-axes';

  /**
   * 获取 双轴图 默认配置
   */
  protected getDefaultOptions(): Partial<DualAxesOptions> {
    return deepAssign({}, super.getDefaultOptions(), {
      yAxis: [],
      syncViewPadding: true,
    });
  }

  /**
   * 获取双轴图的适配器
   */
  protected getSchemaAdaptor(): Adaptor<DualAxesOptions> {
    return adaptor;
  }
}

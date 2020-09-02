import { deepMix } from '@antv/util';
import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { BarOptions } from './types';
import { adaptor } from './adaptor';

export { BarOptions };

/**
 * 条形图
 */
export class Bar extends Plot<BarOptions> {
  /** 图表类型 */
  public readonly type: string = 'bar';

  /**
   * 获取 柱形图 的适配器
   */
  protected getSchemaAdaptor(): Adaptor<BarOptions> {
    return adaptor;
  }

  protected getDefaultOptions() {
    return deepMix({}, super.getDefaultOptions(), {
      // label: {
      //   position: 'left', // 默认 label 在左侧
      // },
    });
  }
}

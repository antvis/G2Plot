import { Plot } from '../../core/plot';
import { deepAssign } from '../../utils';
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
   * 获取 条形图 默认配置
   */
  protected getDefaultOptions() {
    return deepAssign({}, super.getDefaultOptions(), {
      barWidthRatio: 0.6,
      marginRatio: 1 / 32,
      tooltip: {
        shared: true,
        showMarkers: false,
        offset: 20,
      },
      interactions: [{ type: 'active-region' }],
    });
  }

  /**
   * 获取 条形图 的适配器
   */
  protected getSchemaAdaptor(): Adaptor<BarOptions> {
    return adaptor;
  }
}

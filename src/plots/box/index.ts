import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { BoxOptions } from './types';
import { adaptor } from './adaptor';
import { deepMix } from '@antv/util';

export { BoxOptions };

const RANGE = '$$range$$';

export class Box extends Plot<BoxOptions> {
  /** 图表类型 */
  public type: string = 'box';
  static RANGE = '$$range$$';
  static RANGE_ALIAS = '区间信息';

  /**
   * 获取 箱型图 默认配置项
   */
  protected getDefaultOptions(): Partial<BoxOptions> {
    return deepMix({}, super.getDefaultOptions(), {
      meta: {
        [Box.RANGE]: { min: 0, alias: Box.RANGE_ALIAS },
      },

      // 默认区域交互
      interactions: [{ type: 'active-region' }],

      // 默认 tooltips 共享，不显示 makers
      tooltip: {
        showMarkers: false,
        shared: true,
      },
    });
  }

  /**
   * 获取 箱型图 的适配器
   */
  protected getSchemaAdaptor(): Adaptor<BoxOptions> {
    return adaptor;
  }
}

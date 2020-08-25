import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { BoxOptions } from './types';
import { adaptor } from './adaptor';
import { deepMix } from '@antv/util';

export { BoxOptions };

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
    });
  }

  /**
   * 获取 箱型图 的适配器
   */
  protected getSchemaAdaptor(): Adaptor<BoxOptions> {
    return adaptor;
  }
}

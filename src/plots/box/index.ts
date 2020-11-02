import { Plot } from '../../core/plot';
import { deepAssign } from '../../utils';
import { Adaptor } from '../../core/adaptor';
import { BoxOptions } from './types';
import { adaptor } from './adaptor';
import { BOX_RANGE, BOX_RANGE_ALIAS } from './constant';
export { BoxOptions };

export class Box extends Plot<BoxOptions> {
  /** 图表类型 */
  public type: string = 'box';

  /**
   * 获取 箱型图 默认配置项
   */
  protected getDefaultOptions(): Partial<BoxOptions> {
    return deepAssign({}, super.getDefaultOptions(), {
      meta: {
        [BOX_RANGE]: { min: 0, alias: BOX_RANGE_ALIAS },
      },

      // 默认区域交互
      interactions: [{ type: 'active-region' }],

      // 默认 tooltips 共享，不显示 markers
      tooltip: {
        showMarkers: false,
        showCrosshairs: true,
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

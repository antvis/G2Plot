import { Plot } from '../../core/plot';
import { deepAssign } from '../../utils';
import { Adaptor } from '../../core/adaptor';
import { BulletOptions } from './types';
import { adaptor } from './adaptor';

export { BulletOptions };

export class Bullet extends Plot<BulletOptions> {
  /** 图表类型 */
  public type: string = 'bullet';

  /**
   * 获取子弹图的适配器
   */
  protected getSchemaAdaptor(): Adaptor<BulletOptions> {
    return adaptor;
  }

  protected getDefaultOptions() {
    return deepAssign({}, super.getDefaultOptions(), {
      layout: 'horizontal',
      size: {
        range: 30,
        measure: 20,
        target: 20,
      },
      xAxis: {
        tickLine: false,
      },
      bulletStyle: {
        range: {
          fillOpacity: 0.5,
        },
      },
      label: {
        measure: {
          position: 'right',
        },
      },
    });
  }
}

import { deepMix } from '@antv/util';
import { Plot } from '../../core/plot';
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
    return deepMix({}, super.getDefaultOptions(), {
      label: {
        position: 'right',
      },
      layout: 'horizontal',
      legend: false,
      bulletStyle: {
        target: {
          size: 20,
          style: {
            lineWidth: 2,
          },
        },
        range: {
          size: 30,
          style: { fillOpacity: 0.5 },
        },
        measure: {
          size: 20,
        },
      },
    });
  }
}

import { Adaptor } from '../../core/adaptor';
import { Plot } from '../../core/plot';
import { adaptor, meta } from './adaptor';
import { DEFAULT_OPTIONS } from './constant';
import { BulletOptions } from './types';
import { transformData } from './utils';

export type { BulletOptions };

export class Bullet extends Plot<BulletOptions> {
  /**
   * 获取 子弹图 默认配置项
   * 供外部使用
   */
  static getDefaultOptions(): Partial<BulletOptions> {
    return DEFAULT_OPTIONS;
  }

  /** 图表类型 */
  public type: string = 'bullet';

  public changeData(data) {
    this.updateOption({ data });
    const { min, max, ds } = transformData(this.options);
    // 处理scale
    meta({ options: this.options, ext: { data: { min, max } }, chart: this.chart });
    this.chart.changeData(ds);
  }

  /**
   * 获取子弹图的适配器
   */
  protected getSchemaAdaptor(): Adaptor<BulletOptions> {
    return adaptor;
  }

  /**
   * 获取 子弹图 默认配置
   */
  protected getDefaultOptions() {
    return Bullet.getDefaultOptions();
  }
}

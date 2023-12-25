import { Plot } from '../../base';
import type { Adaptor } from '../../types';
import { adaptor, DEFAULT_COLORS } from './adaptor';

import type { BulletOptions } from './type';

export type { BulletOptions };

export class Bullet extends Plot<BulletOptions> {
  /** 图表类型 */
  public type = 'bullet';

  /**
   * 获取 子弹图 默认配置项
   * 供外部使用
   */
  static getDefaultOptions(): Partial<BulletOptions> {
    return {
      type: 'view',
      scale: {
        color: {
          range: DEFAULT_COLORS,
        },
      },
      legend: {
        color: {
          itemMarker: (d) => {
            return d === 'target' ? 'line' : 'square';
          },
        },
      },
      axis: {
        y: { title: false },
        x: { title: false },
      },
      children: [
        {
          type: 'interval',
          style: { maxWidth: 30 },
          axis: { y: { grid: true, gridLineWidth: 2 } },
        },
        {
          type: 'interval',
          style: { maxWidth: 20 },
          transform: [{ type: 'stackY' }],
        },
        {
          type: 'point',
          encode: { size: 8, shape: 'line' },
        },
      ],
      interaction: { tooltip: { shared: true } },
      coordinate: { transform: [{ type: 'transpose' }] },
    };
  }

  /**
   * 获取 子弹图 默认配置
   */
  protected getDefaultOptions() {
    return Bullet.getDefaultOptions();
  }

  /**
   * 子弹图适配器
   */
  protected getSchemaAdaptor(): (params: Adaptor<BulletOptions>) => void {
    return adaptor;
  }
}

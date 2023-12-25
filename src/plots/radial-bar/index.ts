import { Plot } from '../../base';
import type { Adaptor } from '../../types';
import { adaptor } from './adaptor';
import { RadialBarOptions } from './type';

export type { RadialBarOptions };

export class RadialBar extends Plot<RadialBarOptions> {
  /** 图表类型 */
  public type = 'radial';

  /**
   * 获取 玉珏图 默认配置项
   * 供外部使用
   */
  static getDefaultOptions(): Partial<RadialBarOptions> {
    return {
      type: 'view',
      children: [{ type: 'interval' }],
      coordinate: { type: 'radial', innerRadius: 0.1, outerRadius: 1, endAngle: Math.PI },
      animate: { enter: { type: 'waveIn', duration: 800 } },
      axis: {
        y: {
          nice: true,
          labelAutoHide: true,
          labelAutoRotate: false,
        },
        x: {
          title: false,
          nice: true,
          labelAutoRotate: false,
          labelAutoHide: { type: 'equidistance', cfg: { minGap: 6 } },
        },
      },
    };
  }

  /**
   * 获取 玉珏图 默认配置
   */
  protected getDefaultOptions() {
    return RadialBar.getDefaultOptions();
  }

  /**
   * 玉珏图适配器
   */
  protected getSchemaAdaptor(): (params: Adaptor<RadialBarOptions>) => void {
    return adaptor;
  }
}

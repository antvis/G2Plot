import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { RadialBarOptions } from './types';
import { adaptor, meta } from './adaptor';
import { DEFAULT_OPTIONS } from './constant';

export type { RadialBarOptions };

/**
 * 玉珏图
 */
export class RadialBar extends Plot<RadialBarOptions> {
  static getDefaultOptions(): Partial<RadialBarOptions> {
    return DEFAULT_OPTIONS;
  }
  /** 图表类型 */
  public type: string = 'radial-bar';

  /**
   * @override
   * @param data
   */
  public changeData(data) {
    this.updateOption({ data });
    // 更新玉珏图的 scale
    meta({ chart: this.chart, options: this.options });
    this.chart.changeData(data);
  }

  /**
   * 获取默认配置
   */
  protected getDefaultOptions(): Partial<RadialBarOptions> {
    return RadialBar.getDefaultOptions();
  }

  /**
   * 获取适配器
   */
  protected getSchemaAdaptor(): Adaptor<RadialBarOptions> {
    return adaptor;
  }
}

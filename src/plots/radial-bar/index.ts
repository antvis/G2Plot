import { deepMix } from '@antv/util';
import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { RadialBarOptions } from './types';
import { adaptor } from './adaptor';

export { RadialBarOptions };

/**
 * 玉珏图
 */
export class RadialBar extends Plot<RadialBarOptions> {
  /** 图表类型 */
  public type: string = 'radial-bar';

  /**
   * 获取默认配置
   */
  protected getDefaultOptions(options: RadialBarOptions) {
    const { xField, yField } = options;
    return deepMix({}, super.getDefaultOptions(), {
      interactions: [{ type: 'element-active' }],
      legend: false,
      tooltip: {
        title: xField,
        showMarkers: false,
      },
      // seriesField: yField,
    });
  }

  /**
   * 获取适配器
   */
  protected getSchemaAdaptor(): Adaptor<RadialBarOptions> {
    return adaptor;
  }
}

import { deepMix } from '@antv/util';
import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { LineOptions } from './types';
import { adaptor } from './adaptor';

export { LineOptions };

export class Line extends Plot<LineOptions> {
  /** 图表类型 */
  public type: string = 'line';

  /**
   * 获取 折线图 默认配置
   */
  protected getDefaultOptions(options: LineOptions) {
    const { xField } = options;
    return deepMix({}, super.getDefaultOptions(), {
      tooltip: {
        showMarkers: true,
        showCrosshairs: true,
        crosshairs: {
          type: 'x',
        },
      },
      meta: {
        [xField]: {
          range: [0, 1],
        },
      },
      isStack: false,
    });
  }

  /**
   * 获取 折线图 的适配器
   */
  protected getSchemaAdaptor(): Adaptor<LineOptions> {
    return adaptor;
  }
}

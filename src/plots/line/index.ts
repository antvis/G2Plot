import { deepMix, size, reduce, get } from '@antv/util';
import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { adjustYMetaByZero } from '../../utils/data';
import { LineOptions } from './types';
import { adaptor } from './adaptor';

import './interactions';

export { LineOptions };

export class Line extends Plot<LineOptions> {
  /** 图表类型 */
  public type: string = 'line';

  /**
   * 获取 折线图 默认配置
   */
  protected getDefaultOptions(options: LineOptions) {
    const { xField, yField, data } = options;

    return deepMix({}, super.getDefaultOptions(), {
      tooltip: {
        showMarkers: true,
        showCrosshairs: true,
        crosshairs: {
          type: 'x',
        },
      },
      legend: {
        position: 'top-left',
      },
      meta: {
        [xField]: {
          range: [0, 1],
        },
        [yField]: {
          ...adjustYMetaByZero(data, yField),
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

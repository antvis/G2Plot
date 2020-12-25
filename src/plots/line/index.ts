import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { deepAssign } from '../../utils';
import { LineOptions } from './types';
import { adaptor } from './adaptor';

import './interactions';

export { LineOptions };

export class Line extends Plot<LineOptions> {
  /** 图表类型 */
  public type: string = 'line';

  /**
   * @override
   * @param data
   */
  public changeData(data: LineOptions['data']) {
    this.updateOption({ data });
    this.chart.changeData(data);
  }

  /**
   * 获取 折线图 默认配置
   */
  protected getDefaultOptions() {
    return deepAssign({}, super.getDefaultOptions(), {
      tooltip: {
        shared: true,
        showMarkers: true,
        showCrosshairs: true,
        crosshairs: {
          type: 'x',
        },
      },
      legend: {
        position: 'top-left',
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

import { isNil } from '@antv/util';
import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { findViewById } from '../../utils';
import { LineOptions } from './types';
import { adaptor, meta } from './adaptor';
import { DEFAULT_OPTIONS, POINT_VIEW_ID } from './constants';
import './interactions';

export type { LineOptions };

export class Line extends Plot<LineOptions> {
  /**
   * 获取 折线图 默认配置项
   * 供外部使用
   */
  static getDefaultOptions(): Partial<LineOptions> {
    return DEFAULT_OPTIONS;
  }

  /** 图表类型 */
  public type: string = 'line';

  /**
   * @override
   * @param data
   */
  public changeData(data: LineOptions['data']) {
    this.updateOption({ data });
    const { chart, options } = this;
    const { yField } = options;
    meta({ chart, options });
    this.chart.changeData(data);
    const pointView = findViewById(this.chart, POINT_VIEW_ID);
    if (pointView) {
      pointView.changeData(data.filter((d) => !isNil(d[yField])));
    }
  }

  /**
   * 获取 折线图 默认配置
   */
  protected getDefaultOptions() {
    return Line.getDefaultOptions();
  }

  /**
   * 获取 折线图 的适配器
   */
  protected getSchemaAdaptor(): Adaptor<LineOptions> {
    return adaptor;
  }
}

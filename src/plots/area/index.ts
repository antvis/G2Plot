import { isNil } from '@antv/util';
import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { getDataWhetherPecentage } from '../../utils/transform/percent';
import { findViewById } from '../../utils';
import { AreaOptions } from './types';
import { adaptor, meta } from './adaptor';
import { DEFAULT_OPTIONS, POINT_VIEW_ID } from './constants';

export type { AreaOptions };

export class Area extends Plot<AreaOptions> {
  /**
   * 获取 面积图 默认配置项
   * 供外部使用
   */
  static getDefaultOptions(): Partial<AreaOptions> {
    return DEFAULT_OPTIONS;
  }

  /** 图表类型 */
  public type: string = 'area';

  /**
   * 获取 面积图 默认配置
   */
  protected getDefaultOptions() {
    return Area.getDefaultOptions();
  }

  /**
   * @override
   * @param data
   */
  public changeData(data: AreaOptions['data']) {
    this.updateOption({ data });
    const { chart, options } = this;
    const { isPercent, xField, yField } = options;
    meta({ chart, options });
    const chartdata = getDataWhetherPecentage(data, yField, xField, yField, isPercent);
    this.chart.changeData(chartdata);
    const pointView = findViewById(this.chart, POINT_VIEW_ID);
    if (pointView) {
      pointView.changeData(data.filter((d) => !isNil(d[yField])));
    }
  }

  /**
   * 获取 面积图 的适配器
   */
  protected getSchemaAdaptor(): Adaptor<AreaOptions> {
    return adaptor;
  }
}

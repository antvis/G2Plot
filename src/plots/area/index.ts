import { Plot } from '../../core/plot';
import { deepAssign } from '../../utils';
import { Adaptor } from '../../core/adaptor';
import { getDataWhetherPecentage } from '../../utils/transform/percent';
import { AreaOptions } from './types';
import { adaptor } from './adaptor';

export { AreaOptions };

export class Area extends Plot<AreaOptions> {
  /** 图表类型 */
  public type: string = 'area';

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
      isStack: true,
      // 默认开启
      line: {},
      legend: {
        position: 'top-left',
      },
    });
  }

  /**
   * @override
   * @param data
   */
  public changeData(data: AreaOptions['data']) {
    this.updateOption({ data });
    const { isPercent, xField, yField } = this.options;
    this.chart.changeData(getDataWhetherPecentage(data, yField, xField, yField, isPercent));
  }

  /**
   * 获取 面积图 的适配器
   */
  protected getSchemaAdaptor(): Adaptor<AreaOptions> {
    return adaptor;
  }
}

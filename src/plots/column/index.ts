import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { deepAssign } from '../../utils';
import { getDataWhetherPecentage } from '../../utils/transform/percent';
import { ColumnOptions } from './types';
import { adaptor } from './adaptor';

export { ColumnOptions };

/**
 * 柱形图
 */
export class Column extends Plot<ColumnOptions> {
  /** 图表类型 */
  public readonly type: string = 'column';

  /**
   * @override
   */
  public changeData(data: ColumnOptions['data']) {
    this.updateOption({ data });
    const { yField, xField, isPercent } = this.options;
    this.chart.changeData(getDataWhetherPecentage(data, yField, xField, yField, isPercent));
  }

  /**
   * 获取 柱形图 默认配置
   */
  protected getDefaultOptions() {
    return deepAssign({}, super.getDefaultOptions(), {
      columnWidthRatio: 0.6,
      marginRatio: 1 / 32,
      tooltip: {
        shared: true,
        showMarkers: false,
        offset: 20,
      },
      interactions: [{ type: 'active-region' }],
    });
  }

  /**
   * 获取 柱形图 的适配器
   */
  protected getSchemaAdaptor(): Adaptor<ColumnOptions> {
    return adaptor;
  }
}

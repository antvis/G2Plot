import { Adaptor } from '../../core/adaptor';
import { Plot } from '../../core/plot';
import { adaptor } from './adaptor';
import { DEFAULT_OPTIONS } from './constant';
import './interactions';
import { TreemapOptions } from './types';
import { enableInteraction, resetDrillDown, transformData } from './utils';

export type { TreemapOptions };

export class Treemap extends Plot<TreemapOptions> {
  /**
   * 获取 矩阵树图 默认配置项
   * 供外部使用
   */
  static getDefaultOptions(): Partial<TreemapOptions> {
    return DEFAULT_OPTIONS;
  }

  /** 图表类型 */
  public type: string = 'treemap';

  /**
   * changeData
   */
  public changeData(data) {
    const { colorField, interactions, hierarchyConfig } = this.options;
    this.updateOption({ data });
    const transData = transformData({
      data,
      colorField,
      enableDrillDown: enableInteraction(interactions, 'treemap-drill-down'),
      hierarchyConfig,
    });
    this.chart.changeData(transData);

    resetDrillDown(this.chart);
  }

  /**
   * 获取 矩阵树图 默认配置
   */
  protected getDefaultOptions() {
    return Treemap.getDefaultOptions();
  }

  protected getSchemaAdaptor(): Adaptor<TreemapOptions> {
    return adaptor;
  }
}

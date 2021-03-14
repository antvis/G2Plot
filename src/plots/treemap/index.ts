import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { TreemapOptions } from './types';
import { adaptor } from './adaptor';
import { transformData, enableInteraction } from './utils';
import './interactions/treemap-drill-down';
import '../scatter/interaction';

export { TreemapOptions };

export class Treemap extends Plot<TreemapOptions> {
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
  }

  protected getSchemaAdaptor(): Adaptor<TreemapOptions> {
    return adaptor;
  }
}

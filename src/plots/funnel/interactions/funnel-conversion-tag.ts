import { get } from '@antv/util';
import { Action } from '@antv/g2';
import { conversionTag } from '../geometries/basic';
import { transformData } from '../geometries/common';
import { FunnelOptions } from '../types';

/**
 * Funnel 转化率跟随 legend 变化事件
 */
export class ConversionTagAction extends Action {
  private rendering = false;
  public change(options: FunnelOptions) {
    // 防止多次重复渲染
    if (!this.rendering) {
      const { view } = this.context;
      view.getController('annotation').clear(true);
      const data = get(view, ['filteredData'], view.data);

      conversionTag({ chart: view, options: { ...options, data: transformData(data, data, options) } });

      view.filterData(data);
      this.rendering = true;
      view.render(true);
    }
    this.rendering = false;
  }
}

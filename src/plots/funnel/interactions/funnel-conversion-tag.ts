import { get, map } from '@antv/util';
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
      const { seriesField } = options;
      const { view } = this.context;
      // 兼容分面漏斗图
      const views = seriesField ? view.views : [view];
      map(views, (v) => {
        v.getController('annotation').clear(true);
        const data = get(v, ['filteredData'], v.getOptions().data);

        conversionTag({
          chart: v,
          options: {
            ...options,
            // @ts-ignore
            filteredData: transformData(data, data, options),
          },
        });

        v.filterData(data);
        this.rendering = true;
        v.render(true);
      });
    }
    this.rendering = false;
  }
}

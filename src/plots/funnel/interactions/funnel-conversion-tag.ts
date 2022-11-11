import { Action } from '@antv/g2';
import { each, filter, get, map } from '@antv/util';
import { conversionTag as basicConversionTag } from '../geometries/basic';
import { CONVERSION_TAG_NAME, transformData } from '../geometries/common';
import { compareConversionTag } from '../geometries/compare';
import { FunnelOptions } from '../types';

/**
 * Funnel 转化率跟随 legend 变化事件
 */
export class ConversionTagAction extends Action {
  private rendering = false;
  public change(options: FunnelOptions) {
    // 防止多次重复渲染
    if (!this.rendering) {
      const { seriesField, compareField } = options;
      const conversionTag = compareField ? compareConversionTag : basicConversionTag;
      const { view } = this.context;
      // 兼容分面漏斗图
      const views = seriesField || compareField ? view.views : [view];
      map(views, (v, index) => {
        // 防止影响其他 annotations 被去除
        const annotationController = v.getController('annotation');

        const annotations = filter(
          get(annotationController, ['option'], []),
          ({ name }) => name !== CONVERSION_TAG_NAME
        );

        annotationController.clear(true);

        each(annotations, (annotation) => {
          if (typeof annotation === 'object') {
            v.annotation()[annotation.type](annotation);
          }
        });

        const data = get(v, ['filteredData'], v.getOptions().data);

        conversionTag({
          chart: v,
          index,
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

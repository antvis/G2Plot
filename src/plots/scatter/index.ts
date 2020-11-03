import { isBoolean } from '@antv/util';
import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { deepAssign } from '../../utils';
import { ScatterOptions } from './types';
import { adaptor } from './adaptor';
import './interaction';

export { ScatterOptions };

export class Scatter extends Plot<ScatterOptions> {
  /** 图表类型 */
  public type: string = 'point';

  /**
   * 获取散点图的适配器
   */
  protected getSchemaAdaptor(): Adaptor<ScatterOptions> {
    return adaptor;
  }

  protected getDefaultOptions(options: ScatterOptions) {
    const { shapeField, colorField, legend, xField, yField, sizeField } = options;
    return deepAssign({}, super.getDefaultOptions(), {
      size: 4,
      /** pointStyle 跟随主题默认样式 */
      tooltip: {
        shared: null,
        showTitle: false,
        fields: [xField, yField, colorField, sizeField, shapeField],
      },
      /**
       * legend 没有指定时根据 shapeField 和 colorField 来设置默认值
       */
      legend: isBoolean(legend) ? legend : legend || !!(shapeField || colorField),
    });
  }
}

import { deepMix } from '@antv/util';
import { Plot } from '../../core/plot';
import { PieOptions } from './types';
import { adaptor } from './adaptor';
import { Adaptor } from '../../core/adaptor';
import './interaction';
import './label';

export { PieOptions };

export class Pie extends Plot<PieOptions> {
  /** 图表类型 */
  public type: string = 'pie';

  /**
   * 获取 饼图 默认配置项
   */
  protected getDefaultOptions(): Partial<PieOptions> {
    return deepMix({}, super.getDefaultOptions(), {
      legend: {
        position: 'right',
      },
      tooltip: {
        shared: false,
        showTitle: false,
        showMarkers: false,
      },
      /** 饼图样式, 不影响暗黑主题 */
      pieStyle: {
        stroke: 'white',
        lineWidth: 1,
      },
      /** 饼图中心文本默认样式 */
      statistic: {
        title: {
          style: { fontSize: 14, fontWeight: 300, fill: '#4D4D4D', textAlign: 'center' },
        },
        content: {
          style: { fontSize: 21, fontWeight: 'bold', fill: '#4D4D4D', textAlign: 'center' },
        },
      },
    });
  }

  /**
   * 获取 饼图 的适配器
   */
  protected getSchemaAdaptor(): Adaptor<PieOptions> {
    return adaptor;
  }
}

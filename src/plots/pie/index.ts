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
    return {
      legend: {
        position: 'right',
      },
      tooltip: {
        shared: false,
        showTitle: false,
        showMarkers: false,
      },
      pieStyle: {
        stroke: 'white',
        lineWidth: 1,
      },
    };
  }

  /**
   * 获取 饼图 的适配器
   */
  protected getSchemaAdaptor(): Adaptor<PieOptions> {
    return adaptor;
  }
}

import { Plot } from '../../core/plot';
import { deepAssign } from '../../utils';
import { Adaptor } from '../../core/adaptor';
import { RoseOptions } from './types';
import { adaptor } from './adaptor';

export { RoseOptions };

export class Rose extends Plot<RoseOptions> {
  /** 玫瑰图 */
  public type: string = 'rose';

  /**
   * 获取默认的 options 配置项
   */
  protected getDefaultOptions(): Partial<RoseOptions> {
    return deepAssign({}, super.getDefaultOptions(), {
      xAxis: false,
      yAxis: false,
      legend: {
        position: 'right',
        offsetX: -10,
      },
      sectorStyle: {
        stroke: '#fff',
        lineWidth: 1,
      },
      label: {
        layout: {
          type: 'limit-in-shape',
        },
      },
    });
  }

  /**
   * 获取 玫瑰图 的适配器
   */
  protected getSchemaAdaptor(): Adaptor<RoseOptions> {
    return adaptor;
  }
}

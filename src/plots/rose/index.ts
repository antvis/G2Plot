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
   * @override
   * @param data
   */
  public changeData(data) {
    this.updateOption({ data });
    this.chart.changeData(data);
  }

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
      tooltip: {
        shared: true,
        showMarkers: false,
      },
      interactions: [{ type: 'active-region' }],
    });
  }

  /**
   * 获取 玫瑰图 的适配器
   */
  protected getSchemaAdaptor(): Adaptor<RoseOptions> {
    return adaptor;
  }
}

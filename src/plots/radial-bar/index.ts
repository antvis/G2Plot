import { Plot } from '../../core/plot';
import { deepAssign } from '../../utils';
import { Adaptor } from '../../core/adaptor';
import { RadialBarOptions } from './types';
import { adaptor, meta } from './adaptor';

export { RadialBarOptions };

/**
 * 玉珏图
 */
export class RadialBar extends Plot<RadialBarOptions> {
  /** 图表类型 */
  public type: string = 'radial-bar';

  /**
   * @override
   * @param data
   */
  public changeData(data) {
    this.updateOption({ data });
    // 更新玉珏图的scale
    meta({ chart: this.chart, options: this.options });
    this.chart.changeData(data);
  }

  /**
   * 获取默认配置
   */
  protected getDefaultOptions(): Partial<RadialBarOptions> {
    return deepAssign({}, super.getDefaultOptions(), {
      interactions: [{ type: 'element-active' }],
      legend: false,
      tooltip: {
        showMarkers: false,
      },
      xAxis: {
        grid: null,
        tickLine: null,
        line: null,
      },
      maxAngle: 240,
    });
  }

  /**
   * 获取适配器
   */
  protected getSchemaAdaptor(): Adaptor<RadialBarOptions> {
    return adaptor;
  }
}

import { Plot } from '../../core/plot';
import { deepAssign } from '../../utils';
import { Adaptor } from '../../core/adaptor';
import { BulletOptions } from './types';
import { adaptor, meta } from './adaptor';
import { transformData } from './utils';

export { BulletOptions };

export class Bullet extends Plot<BulletOptions> {
  /** 图表类型 */
  public type: string = 'bullet';

  public changeData(data) {
    this.updateOption({ data });
    const { min, max, ds } = transformData(this.options);
    // 处理scale
    meta({ options: this.options, ext: { data: { min, max } }, chart: this.chart });
    this.chart.changeData(ds);
  }

  /**
   * 获取子弹图的适配器
   */
  protected getSchemaAdaptor(): Adaptor<BulletOptions> {
    return adaptor;
  }

  protected getDefaultOptions() {
    return deepAssign({}, super.getDefaultOptions(), {
      layout: 'horizontal',
      size: {
        range: 30,
        measure: 20,
        target: 20,
      },
      xAxis: {
        tickLine: false,
        line: null,
      },
      bulletStyle: {
        range: {
          fillOpacity: 0.5,
        },
      },
      label: {
        measure: {
          position: 'right',
        },
      },
      tooltip: {
        // 默认关闭
        showMarkers: false,
      },
    });
  }
}

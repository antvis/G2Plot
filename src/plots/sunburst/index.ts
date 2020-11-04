import { deepAssign } from '../../utils';
import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { SunburstOptions } from './types';
import { adaptor } from './adaptor';

export { SunburstOptions };

export class Sunburst extends Plot<SunburstOptions> {
  /** 图表类型 */
  public type: string = 'sunburst';

  /**
   * 获取旭日图默认配置
   */
  protected getDefaultOptions() {
    return deepAssign({}, super.getDefaultOptions(), {
      type: 'partition',
      innerRadius: 0,
      seriesField: 'value',
      tooltip: {
        shared: true,
        showMarkers: false,
        offset: 20,
        showTitle: false,
      },
    });
  }

  /**
   * 获取旭日图的适配器
   */
  protected getSchemaAdaptor(): Adaptor<SunburstOptions> {
    return adaptor;
  }
}

import { deepMix } from '@antv/util';
import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { FunnelOptions } from './types';
import { adaptor } from './adaptor';
import { FUNNEL_LABEL } from './constant';

export { FunnelOptions };

export class Funnel extends Plot<FunnelOptions> {
  /** 图表类型 */
  public type: string = 'funnel';

  /**
   * 获取 漏斗图 默认配置项
   */
  protected getDefaultOptions(options: FunnelOptions): Partial<FunnelOptions> {
    // const { compareField, yField } = options;
    return deepMix({}, super.getDefaultOptions(), {
      label: FUNNEL_LABEL,
      // tooltip: {
      //   showTitle: false,
      //   showMarkers: false,
      //   customContent: (x: string, data: any[]) => `${get(data, [0, 'data', yField])}`,
      //   containerTpl: '<div class="g2-tooltip"><div class="g2-tooltip-list"></div></div>',
      //   itemTpl: '<span>{value}</span>',
      //   domStyles: {
      //     'g2-tooltip': {
      //       padding: '2px 4px',
      //       fontSize: '10px',
      //     },
      //   },
      // },
      conversionTag: {
        formatter: (datum) => `转化率${datum.$$percentage$$ * 100}%`,
      },
    });
  }

  /**
   * 获取 漏斗图 的适配器
   */
  protected getSchemaAdaptor(): Adaptor<FunnelOptions> {
    return adaptor;
  }
}

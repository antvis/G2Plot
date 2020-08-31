import { deepMix } from '@antv/util';
import { Plot } from '../../core/plot';
import { FunnelOptions } from './types';
import { adaptor } from './adaptor';
import { Adaptor } from '../../core/adaptor';

export { FunnelOptions };

export class Funnel extends Plot<FunnelOptions> {
  /** 图表类型 */
  public type: string = 'funnel';

  /**
   * 获取 漏斗图 默认配置项
   */
  protected getDefaultOptions(options: FunnelOptions): Partial<FunnelOptions> {
    const { compareField } = options;
    return deepMix({}, super.getDefaultOptions(), {
      annotation: compareField ? (xField, yField) => `${yField}` : (xField, yField) => `${xField} ${yField}`,
      label: {
        callback: (xField, yField, percent) => {
          return {
            content: `转化率${+percent * 100}%`,
          };
        },
      },
      tooltip: {
        showCrosshairs: false,
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

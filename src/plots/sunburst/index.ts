import { deepMix } from '@antv/util';
import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { SunburstOptions } from './types';
import { adaptor } from './adaptor';
import { getTooltipTemplate } from './utils';

export { SunburstOptions };

export class Sunburst extends Plot<SunburstOptions> {
  /** 图表类型 */
  public type: string = 'sunburst';

  /**
   * 获取旭日图默认配置
   */
  protected getDefaultOptions(options: SunburstOptions) {
    const { tooltip, seriesField, colorField } = options;
    return deepMix({}, super.getDefaultOptions(), {
      type: 'partition',
      innerRadius: 0,
      seriesField: 'value',
      tooltip: {
        showTitle: false,
        showMarkers: false,
        customContent:
          tooltip && tooltip.customContent
            ? tooltip.customContent
            : (value: string, items: any[]) => {
                return getTooltipTemplate({
                  value,
                  items,
                  formatter: tooltip && tooltip?.formatter,
                  fields: (tooltip && tooltip.fields) || [seriesField, colorField],
                });
              },
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

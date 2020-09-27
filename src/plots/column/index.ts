import { deepMix } from '@antv/util';
import { getPercentTooltipTemplate } from '../../utils/percent-tooltip';
import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { ColumnOptions } from './types';
import { adaptor } from './adaptor';

export { ColumnOptions };

/**
 * 柱形图
 */
export class Column extends Plot<ColumnOptions> {
  /** 图表类型 */
  public readonly type: string = 'column';

  /**
   * 获取 柱形图 默认配置
   */
  protected getDefaultOptions(options: ColumnOptions) {
    console.log(this.type);

    const { isPercent, isRange, label, yField } = options;
    return deepMix({}, super.getDefaultOptions(), {
      label:
        label && isRange
          ? {
              content: (item: object) => {
                return item[yField]?.join('-');
              },
              ...label,
            }
          : label,
      tooltip: {
        shared: true,
        showMarkers: false,
        offset: 20,
        customContent: isPercent
          ? (value: string, items: any[]) => {
              return getPercentTooltipTemplate(value, items);
            }
          : '',
      },
      interactions: [{ type: 'active-region' }],
    });
  }

  /**
   * 获取 柱形图 的适配器
   */
  protected getSchemaAdaptor(): Adaptor<ColumnOptions> {
    return adaptor;
  }
}

import { Plot } from '../../core/plot';
import { deepMix } from '../../utils';
import { Adaptor } from '../../core/adaptor';
import { BarOptions } from './types';
import { adaptor } from './adaptor';

export { BarOptions };

/**
 * 条形图
 */
export class Bar extends Plot<BarOptions> {
  /** 图表类型 */
  public readonly type: string = 'bar';

  /**
   * 获取 条形图 默认配置
   */
  protected getDefaultOptions(options: BarOptions) {
    const { isRange, label, xField, yField, isGroup, isStack } = options;
    return deepMix({}, super.getDefaultOptions(), {
      barWidthRatio: 0.6,
      marginRatio: 1 / 32,
      label:
        label && isRange
          ? {
              content: (item: object) => {
                return item[xField]?.join('-');
              },
              ...label,
            }
          : label,
      tooltip: {
        shared: true,
        showMarkers: false,
        offset: 20,
      },
      legend:
        isGroup || isStack
          ? {
              position: isStack ? 'top-left' : 'right-top',
            }
          : false,
      interactions: [{ type: 'active-region' }],
      meta: {
        [yField]: {
          type: 'cat',
        },
      },
    });
  }

  /**
   * 获取 条形图 的适配器
   */
  protected getSchemaAdaptor(): Adaptor<BarOptions> {
    return adaptor;
  }
}

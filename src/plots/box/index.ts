import { Adaptor } from '../../core/adaptor';
import { Plot } from '../../core/plot';
import { adaptor } from './adaptor';
import { DEFAULT_OPTIONS, OUTLIERS_VIEW_ID } from './constant';
import { BoxOptions } from './types';
import { transformData } from './utils';
export type { BoxOptions };

export class Box extends Plot<BoxOptions> {
  /**
   * 获取 默认配置项
   * 供外部使用
   */
  static getDefaultOptions(): Partial<BoxOptions> {
    return DEFAULT_OPTIONS;
  }

  /** 图表类型 */
  public type: string = 'box';

  /**
   * @override
   * @param data
   */
  public changeData(data) {
    this.updateOption({ data });
    const { yField } = this.options;

    const outliersView = this.chart.views.find((v) => v.id === OUTLIERS_VIEW_ID);
    if (outliersView) {
      outliersView.data(data);
    }

    this.chart.changeData(transformData(data, yField));
  }

  /**
   * 获取 箱型图 默认配置项
   */
  protected getDefaultOptions(): Partial<BoxOptions> {
    return Box.getDefaultOptions();
  }

  /**
   * 获取 箱型图 的适配器
   */
  protected getSchemaAdaptor(): Adaptor<BoxOptions> {
    return adaptor;
  }
}

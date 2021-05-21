import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { ProgressOptions } from './types';
import { adaptor } from './adaptor';
import { DEFAULT_OPTIONS } from './constants';
import { getProgressData } from './utils';

export type { ProgressOptions };

export class Progress extends Plot<ProgressOptions> {
  /**
   * 获取 仪表盘 默认配置项
   * 供外部使用
   */
  static getDefaultOptions(): Partial<ProgressOptions> {
    return DEFAULT_OPTIONS;
  }

  /** 图表类型 */
  public type: string = 'process';

  /**
   * 更新数据
   * @param percent
   */
  public changeData(percent: number) {
    this.updateOption({ percent });
    this.chart.changeData(getProgressData(percent));
  }

  protected getDefaultOptions() {
    return Progress.getDefaultOptions();
  }

  /**
   * 获取 进度图 的适配器
   */
  protected getSchemaAdaptor(): Adaptor<ProgressOptions> {
    return adaptor;
  }
}

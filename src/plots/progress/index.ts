import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { ProgressOptions } from './types';
import { adaptor } from './adaptor';
import { DEFAULT_COLOR } from './constant';
import { getProgressData } from './utils';

export { ProgressOptions };

export class Progress extends Plot<ProgressOptions> {
  /** 图表类型 */
  public type: string = 'process';

  protected getDefaultOptions() {
    return {
      percent: 0.2,
      color: DEFAULT_COLOR,
      animation: true,
    };
  }

  /**
   * 更新数据
   * @param percent
   */
  public changeData(percent: number) {
    this.updateOption({ percent });
    this.chart.changeData(getProgressData(percent));
  }

  /**
   * 获取 进度图 的适配器
   */
  protected getSchemaAdaptor(): Adaptor<ProgressOptions> {
    return adaptor;
  }
}

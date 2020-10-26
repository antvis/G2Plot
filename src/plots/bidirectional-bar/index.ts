import { deepMix } from '@antv/util';
import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { BidirectionalBarOptions } from './types';
import { adaptor } from './adaptor';

export { BidirectionalBarOptions };

export class BidirectionalBar extends Plot<BidirectionalBarOptions> {
  /** 图表类型 */
  public type: string = 'bidirectional-bar';

  /**
   * 获取对称条形图的适配器
   */
  protected getSchemaAdaptor(): Adaptor<BidirectionalBarOptions> {
    return adaptor;
  }

  protected getDefaultOptions(options: BidirectionalBarOptions) {
    const { layout = 'horizontal' } = options;
    return deepMix({}, super.getDefaultOptions(), {
      xAxis: {
        // 不同布局 firstView 的坐标轴显示位置
        position: layout === 'vertical' ? 'bottom' : 'top',
      },
      layout,
    });
  }
}

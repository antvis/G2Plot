import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { MultiViewOptions } from './types';
import { adaptor } from './adaptor';

export { MultiViewOptions };

/**
 * 多图层图形，释放 G2 80% 的功能，可以用来做：
 * 1. 图层叠加的图：
 *   - 折线 + 置信度区间迭代
 *   - 嵌套饼图
 *   - ...
 * 2. 图层划分的图
 *   - 多维图
 *   - 柱饼组合图
 *   - ...
 */
export class MultiView extends Plot<MultiViewOptions> {
  /** 图表类型 */
  public type: string = 'multi-view';

  /**
   * 获取适配器
   */
  protected getSchemaAdaptor(): Adaptor<MultiViewOptions> {
    return adaptor;
  }
}

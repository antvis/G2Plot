import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { deepAssign } from '../../utils';
import { BidirectionalBarOptions } from './types';
import { adaptor } from './adaptor';
import { isHorizontal } from './utils';

export { BidirectionalBarOptions };

export class BidirectionalBar extends Plot<BidirectionalBarOptions> {
  /** 图表类型 */
  public type: string = 'bidirectional-bar';

  protected getDefaultOptions() {
    return deepAssign({}, super.getDefaultOptions(), {
      syncViewPadding: (c: any, view: any, p: any) => {
        const [v1, v2] = view;
        const p1 = v1.autoPadding;
        const p2 = v2.autoPadding;
        const { layout, position } = c.__axisPosition;
        // 目前只能根据布局的比例来判断 layout
        if (isHorizontal(layout) && position === 'top') {
          /**
           * 保证 v1 的 left 和 v2 right 的间隔相等，因为 v1 有轴
           * position top 即为 v1 左边，中间间距设置就为 0
           */
          v1.autoPadding = p.instance(p1.top, 0, p1.bottom, p1.left);
          v2.autoPadding = p.instance(p2.top, p1.left, p2.bottom, 0);
        }
        if (isHorizontal(layout) && position === 'bottom') {
          /**
           * 保证 v1 的 left 和 v2 right 的间隔相等，因为 v1 有轴
           * position bottom 即为 v1 的右边，v1 right = right / 2  v2 left = right / 2
           * + 5 是为了 让那个轴不要太贴近了，更好看
           */
          v1.autoPadding = p.instance(p1.top, p1.right / 2 + 5, p1.bottom, p1.left);
          v2.autoPadding = p.instance(p2.top, 0, p2.bottom, p1.right / 2 + 5);
        }
        if (!isHorizontal(layout) && position === 'bottom') {
          /**
           * 保证 v1 的 left 和 v2 left 的间隔相等 left 取最大值
           * position bottom 即为 v1 下边，v1 bottom = bottom / 2  v2 top = bottom / 2
           * + 5 是为了 让那个轴不要太贴近了，更好看
           */
          const left = p1.left >= p2.left ? p1.left : p2.left;
          v1.autoPadding = p.instance(p1.top, p1.right, p1.bottom / 2 + 5, left);
          v2.autoPadding = p.instance(p1.bottom / 2 + 5, p2.right, p2.bottom, left);
        }
        // 垂直状态，不建议设置position 为 top， 还是做个兼容处理
        if (!isHorizontal(layout) && position === 'top') {
          const left = p1.left >= p2.left ? p1.left : p2.left;
          v1.autoPadding = p.instance(p1.top, p1.right, 0, left);
          v2.autoPadding = p.instance(0, p2.right, p1.top, left);
        }
      },
    });
  }

  /**
   * 获取对称条形图的适配器
   */
  protected getSchemaAdaptor(): Adaptor<BidirectionalBarOptions> {
    return adaptor;
  }
}

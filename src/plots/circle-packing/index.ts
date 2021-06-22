import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { adaptor } from './adaptor';
import { DEFAULT_OPTIONS } from './constant';
import { CirclePackingOptions } from './types';
import './interactions';

export type { CirclePackingOptions };

/**
 *  CirclePacking
 * @usage hierarchy, proportions
 */
export class CirclePacking extends Plot<CirclePackingOptions> {
  /**
   * 获取 面积图 默认配置项
   * 供外部使用
   */
  static getDefaultOptions(): Partial<CirclePackingOptions> {
    return DEFAULT_OPTIONS;
  }
  /** 图表类型 */
  public type: string = 'circle-packing';

  protected getDefaultOptions() {
    return CirclePacking.getDefaultOptions();
  }

  /**
   * 获取适配器
   */
  protected getSchemaAdaptor(): Adaptor<CirclePackingOptions> {
    return adaptor;
  }

  /**
   * 覆写父类的方法
   */
  protected triggerResize() {
    if (!this.chart.destroyed) {
      // 首先自适应容器的宽高
      this.chart.forceFit(); // g2 内部执行 changeSize，changeSize 中执行 render(true)
      this.chart.clear();
      this.execAdaptor(); // 核心：宽高更新之后计算padding
      // 渲染
      this.chart.render(true);
    }
  }
}

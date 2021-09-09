import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { VennOptions } from './types';
import { adaptor } from './adaptor';
import { DEFAULT_OPTIONS } from './constant';

export type { VennOptions };

/**
 * 这个是一个图表开发的 模板代码！
 */
export class Venn extends Plot<VennOptions> {
  /** 图表类型 */
  public type: string = 'venn';

  static getDefaultOptions() {
    return DEFAULT_OPTIONS;
  }

  /**
   * 获取 韦恩图 默认配置
   */
  protected getDefaultOptions() {
    return Venn.getDefaultOptions();
  }

  /**
   * 获取适配器
   */
  protected getSchemaAdaptor(): Adaptor<VennOptions> {
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
      this.execAdaptor(); // 核心：宽高更新之后计算布局
      // 渲染
      this.chart.render(true);
    }
  }
}

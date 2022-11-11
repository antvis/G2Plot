import { Adaptor } from '../core/adaptor';
import { PickOptions, Plot } from '../core/plot';
import { deepAssign } from '../utils';
/**
 * 给 G2Plot 提供非常简单的开放开发的机制。目的是能够让社区和业务上自己基于 G2Plot 开发自己的定制图表库。主要分成几类图表：
 * 1. 领域专业的图表，内部同学因为没有场景，不一定能做的完善。
 * 2. 定制业务的图表，不具备通用性
 * 3. 趣味性的可视化组件
 * 然后官方可以根据社区的情况，可以进行一些官方推荐和采纳。
 *
 * 如果使用？
 *
 * ```ts
 * import { P } from '@antv/g2plot';
 * import { GeoWorldMap, GeoWorldMapOptions } from 'g2plot-geo-world-map';
 *
 * const plot = new P('container', {
 *   geoJson: '',
 *   longitude: '',
 *   latitude: '',
 * }, GeoWorldMap, defaultOptions);
 *
 * plot.render();
 * ```
 */
export class P<O extends PickOptions> extends Plot<O> {
  /** 统一为 any plot */
  public readonly type = 'g2-plot';

  /** 外部传入的 defaultOptions */
  private defaultOptions: Partial<O>;

  /** 外部传入的 adaptor 函数 */
  private adaptor: Adaptor<O>;

  /**
   * 相比普通图表增加 adaptor 参数。
   * @param container
   * @param options
   * @param adaptor
   * @param defaultOptions
   */
  constructor(container: string | HTMLElement, options: O, adaptor: Adaptor<O>, defaultOptions?: Partial<O>) {
    super(container, deepAssign({}, defaultOptions, options));

    this.defaultOptions = defaultOptions;
    this.adaptor = adaptor;
  }

  /**
   * 实现父类方法，直接使用传入的
   */
  protected getDefaultOptions() {
    return this.defaultOptions;
  }

  /**
   * 实现父类方法，直接使用传入的
   */
  protected getSchemaAdaptor(): Adaptor<O> {
    return this.adaptor;
  }
}

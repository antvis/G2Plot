import { GroupComponent, HtmlComponent } from '@antv/component';
import { PixelPlot } from '../index';
import { Options } from '../type';
/**
 * Component Controller 的抽象基本类
 */
export abstract class Controller<O = unknown> {
  /** pixelPlot：与controller绑定 */
  protected pixelPlot: PixelPlot;
  /** 对应的控制器配置项 */
  protected options: O;

  constructor(pixelPlot: PixelPlot) {
    this.pixelPlot = pixelPlot;

    this.init();
  }

  /**
   * 初始化组件控制器
   */
  protected abstract init();

  /**
   * 渲染控制器
   */
  public abstract render();

  /**
   * 清除控制器
   */
  public abstract update();

  /**
   * 销毁控制器
   */
  public abstract destroy();
}

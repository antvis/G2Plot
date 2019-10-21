import { modifyCSS } from '@antv/dom-util';
import { Canvas } from '@antv/g';
import * as _ from '@antv/util';
import ResizeObserver from 'resize-observer-polyfill';
import BasePlot from '../Plot';
import ThemeController from './theme';

/**
 * 负责图表canvas画布的创建、更新、销毁
 */

export default class CanvasController {
  public width: number;
  public height: number;
  public canvas: Canvas;
  private container: HTMLElement | string;
  private plot: BasePlot; // temp
  private resizeObserver: any;
  private themeController: ThemeController;

  constructor(cfg) {
    _.assign(this, cfg);
    this.init();
  }

  public getCanvasSize() {
    const props = this.plot.getProps();
    const plotTheme = this.themeController.getPlotTheme(props, '');
    const container = this.container as HTMLElement;
    let width = props.width ? props.width : plotTheme.width;
    let height = props.height ? props.height : plotTheme.height;
    if (props.forceFit && container.offsetWidth) {
      width = container.offsetWidth;
    }
    if (props.forceFit && container.offsetHeight) {
      height = container.offsetHeight;
    }

    return { width, height };
  }

  public getCanvasDOM() {
    return this.canvas.get('canvasDOM');
  }

  public updateCanvasSize() {
    const size = this.getCanvasSize();
    this.width = size.width;
    this.height = size.height;
    this.canvas.changeSize(size.width, size.height);
  }

  public updateCanvasStyle(styles: { [attr: string]: string | number }) {
    modifyCSS(this.getCanvasDOM(), styles);
  }

  public forceFit() {
    const forceFitCb = _.debounce(() => {
      if (this.plot.destroyed) {
        return;
      }
      const size = this.getCanvasSize();
      /** height measure不准导致重复forcefit */
      if (this.width === size.width) {
        return;
      }
      this.updateCanvasSize();
      this.plot.updateRange();
      this.plot.updateConfig({});
      this.plot.render();
    }, 300);
    const ro = new ResizeObserver(forceFitCb);
    const container = this.container as HTMLElement;
    ro.observe(container);
    this.resizeObserver = ro;
  }

  public destroy() {
    if (this.resizeObserver) {
      this.resizeObserver.unobserve(this.container);
      this.container = null;
    }
  }

  private init() {
    /** 创建canvas */
    const props = this.plot.getProps();
    const size = this.getCanvasSize();
    this.canvas = new Canvas({
      containerDOM: this.container,
      width: size.width,
      height: size.height,
      renderer: props.renderer ? props.renderer : 'canvas',
      pixelRatio: props.pixelRatio ? props.pixelRatio : null,
    });
    this.width = size.width;
    this.height = size.height;
    if (props.forceFit) {
      this.forceFit();
    }
  }
}

import * as _ from '@antv/util';
import { Canvas } from '@antv/g';
import ResizeObserver from 'resize-observer-polyfill';

/**
 * 负责图表canvas画布的创建、更新、销毁
 */

export default class CanvasController {
  private container: HTMLElement | string;
  private plot: any; // temp
  private resizeObserver: any;
  public width: number;
  public height: number;
  public canvas: Canvas;

  constructor(cfg) {
    _.assign(this, cfg);
    this._init();
  }

  private _init() {
        /** 创建canvas */
    const props = this.plot._initialProps;
    const size = this.getCanvasSize();
    this.canvas = new Canvas({
      containerDOM: this.container,
      width: size.width,
      height: size.height,
      renderer: props.renderer ? props.renderer : 'canvas',
      pixelRatio: 2,
    });
    this.width = size.width;
    this.height = size.height;
    if (props.forceFit) {
      this.forceFit();
    }
  }

  public getCanvasSize() {
    const props = this.plot._initialProps;
    const plotTheme = this.plot.plotTheme;
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

  public updateCanvasSize() {
    const size = this.getCanvasSize();
    this.width = size.width;
    this.height = size.height;
    this.canvas.changeSize(size.width, size.height);
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
      this.plot.updateConfig({});
      this.plot.render();

    },                            300);
    const ro = new ResizeObserver(forceFitCb);
    const container = this.container as HTMLElement;
    ro.observe(container);
    this.resizeObserver = ro;
  }

  public destory() {
    if (this.resizeObserver) {
      this.resizeObserver.unobserve(this.container);
      this.container = null;
    }
  }

}

import { modifyCSS } from '@antv/dom-util';
import { Canvas } from '@antv/g';
import * as _ from '@antv/util';
import ResizeObserver from 'resize-observer-polyfill';
import BasePlot from '../Plot';
import ThemeController from './theme';

export interface CanvasControllerCfg {
  readonly container: HTMLElement;
  readonly themeController: ThemeController;
  readonly plot: BasePlot;
}

/**
 * Canvas controller
 * 1. create G.Canvas, destroy G.Canvas
 * 2. process auto fit container
 * 3. API for G.Canvas
 */

export default class CanvasController {
  public width: number;
  public height: number;
  public canvas: Canvas;

  private container: HTMLElement;
  private plot: BasePlot; // temp
  private resizeObserver: any;
  private themeController: ThemeController;

  constructor(cfg: CanvasControllerCfg) {
    const { container, themeController, plot } = cfg;
    this.container = container;
    this.themeController = themeController;
    this.plot = plot;

    this.init();
  }

  /**
   * get canvas size from props.
   * @returns the width, height of canvas
   */
  public getCanvasSize() {
    const props = this.plot.getProps();
    const plotTheme = this.themeController.getPlotTheme(props, '');
    let width = props.width ? props.width : plotTheme.width;
    let height = props.height ? props.height : plotTheme.height;

    // if forceFit = true, then use the container's size as default.
    if (props.forceFit) {
      width = this.container.offsetWidth ? this.container.offsetWidth : width;
      height = this.container.offsetHeight ? this.container.offsetHeight : height;
    }

    return { width, height };
  }

  /**
   * get the canvas dom
   * @returns Canvas DOM
   */
  public getCanvasDOM() {
    return this.canvas.get('canvasDOM');
  }

  /**
   * update the plot size
   */
  public updateCanvasSize() {
    const { width, height } = this.getCanvasSize();

    this.width = width;
    this.height = height;
    this.canvas.changeSize(width, height);
    this.plot.updateRange();
  }

  /**
   * update the canvas dom styles
   * @param styles
   */
  public updateCanvasStyle(styles: Record<string, string | number>) {
    modifyCSS(this.getCanvasDOM(), styles);
  }

  /**
   * destroy the plot, remove resize event.
   */
  public destroy() {
    // remove event
    if (this.resizeObserver) {
      this.resizeObserver.unobserve(this.container);
      this.resizeObserver.disconnect();
      this.container = null;
    }
    // remove G.Canvas
    this.canvas.destroy();
  }

  /**
   * when forceFit = true, then bind the event to listen the container size change
   */
  private bindForceFit() {
    const { forceFit } = this.plot.getProps();

    // use ResizeObserver to listen the container size change.
    if (forceFit) {
      this.resizeObserver = new ResizeObserver(this.onResize);
      this.resizeObserver.observe(this.container);
    }
  }

  /**
   * init life circle
   */
  private init() {
    this.initGCanvas();

    this.bindForceFit();
  }

  /**
   * init G.Canvas instance
   */
  private initGCanvas() {
    /** 创建canvas */
    const { renderer = 'canvas', pixelRatio } = this.plot.getProps();
    const { width, height } = this.getCanvasSize();

    this.canvas = new Canvas({
      containerDOM: this.container,
      width,
      height,
      renderer,
      pixelRatio,
    });
    this.width = width;
    this.height = height;
  }

  /**
   * when the container size changed, trigger it after 300ms.
   */
  private onResize = () =>
    _.debounce(() => {
      if (this.plot.destroyed) {
        return;
      }
      const { width, height } = this.getCanvasSize();
      /** height measure不准导致重复 forceFit */
      if (this.width === width && this.height === height) {
        return;
      }

      // got new width, height, re-render the plot
      this.width = width;
      this.height = height;

      this.canvas.changeSize(width, height);

      this.plot.updateRange();
      this.plot.updateConfig({});
      this.plot.render();
    }, 300);
}

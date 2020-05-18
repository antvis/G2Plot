import { modifyCSS } from '@antv/dom-util';
import { Canvas, SVG, ICanvas } from '../../dependents';
import { debounce, get } from '@antv/util';
import ResizeObserver from 'resize-observer-polyfill';
import { getGlobalTheme } from '../../theme/global';
import BasePlot from '../plot';
import ThemeController from './theme';

export interface CanvasControllerCfg {
  readonly containerDOM: HTMLElement;
  readonly plot: BasePlot;
}

type ICanvasCtor = new (...cfg: any) => ICanvas;

/**
 * Canvas controller
 * 1. create G.Canvas, destroy G.Canvas
 * 2. process auto fit container
 * 3. API for G.Canvas
 */

export default class CanvasController {
  public width: number;
  public height: number;
  public canvas: ICanvas;

  private containerDOM: HTMLElement;
  private plot: BasePlot; // temp
  private resizeObserver: any;

  /**
   * when the container size changed, trigger it after 300ms.
   */
  private onResize = debounce(() => {
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
    this.plot.updateConfig({ width, height });
    this.plot.render();
  }, 300);

  constructor(cfg: CanvasControllerCfg) {
    const { containerDOM, plot } = cfg;
    this.containerDOM = containerDOM;
    this.plot = plot;
    this.init();
  }

  /**
   * get canvas size from props.
   * @returns the width, height of canvas
   */
  public getCanvasSize() {
    const theme = getGlobalTheme();
    let width = this.plot.width ? this.plot.width : theme.width;
    let height = this.plot.height ? this.plot.height : theme.height;

    // if forceFit = true, then use the container's size as default.
    if (this.plot.forceFit) {
      width = this.containerDOM.offsetWidth ? this.containerDOM.offsetWidth : width;
      height = this.containerDOM.offsetHeight ? this.containerDOM.offsetHeight : height;
    }
    return { width, height };
  }

  /**
   * get the canvas dom
   * @returns Canvas DOM
   */
  public getCanvasDOM() {
    return this.canvas.get('container');
  }

  /**
   * update the plot size
   */
  public updateCanvasSize() {
    const { width, height } = this.getCanvasSize();

    this.width = width;
    this.height = height;
    this.canvas.changeSize(width, height);
    // this.plot.updateRange();
  }

  /**
   * 根据主题调整canvas样式
   */
  public updateCanvasTheme() {
    const { theme } = this.plot;
    const globalTheme = ThemeController.getGlobalTheme(theme);
    const fill: string = get(globalTheme, 'backgroundStyle.fill');
    if (fill) {
      this.updateCanvasStyle({
        backgroundColor: fill,
      });
    }
  }

  /**
   * update the canvas dom styles
   * @param styles
   */
  private updateCanvasStyle(styles: Record<string, string | number>) {
    // 修改容器的样式
    modifyCSS(this.getCanvasDOM(), styles);

    // 修改 canvas 的样式
    modifyCSS(this.canvas.get('el'), {
      display: 'inline-block',
      verticalAlign: 'middle',
    });
  }

  /**
   * destroy the plot, remove resize event.
   */
  public destroy() {
    // remove event
    if (this.resizeObserver) {
      this.resizeObserver.unobserve(this.containerDOM);
      this.resizeObserver.disconnect();
      this.containerDOM = null;
    }
    // remove G.Canvas
    this.canvas.destroy();
  }

  /**
   * when forceFit = true, then bind the event to listen the container size change
   */
  private bindForceFit() {
    const { forceFit } = this.plot;

    // use ResizeObserver to listen the container size change.
    if (forceFit) {
      this.resizeObserver = new ResizeObserver(this.onResize);
      this.resizeObserver.observe(this.containerDOM);
    }
  }

  /**
   * init life circle
   */
  private init() {
    this.initGCanvas();

    this.bindForceFit();

    // 追加容器的 css 样式，防止 tooltip 的位置参考点不正确
    this.updateCanvasStyle({ position: 'relative' });
  }

  /**
   * init G.Canvas instance
   */
  private initGCanvas() {
    /** 创建canvas */
    const { renderer = 'canvas', pixelRatio, localRefresh = false } = this.plot;
    const { width, height } = this.getCanvasSize();

    const G: ICanvasCtor = renderer === 'canvas' ? Canvas : SVG;

    this.canvas = new G({
      localRefresh,
      container: this.containerDOM,
      width,
      height,
      pixelRatio,
    });
    this.width = width;
    this.height = height;
    this.updateCanvasTheme();
  }
}

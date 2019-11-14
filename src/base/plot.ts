import { Canvas } from '@antv/g';
import * as _ from '@antv/util';
import ResizeObserver from 'resize-observer-polyfill';
import { RecursivePartial } from '../interface/types';
import { getGlobalTheme } from '../theme';
import StateManager from '../util/state-manager';
import { getPlotType } from './global';
import Layer from './layer';
import ViewLayer  from './view-layer';

export interface PlotConfig {
  forceFit?: boolean;
  width?: number;
  renderer?: string;
  height?: number;
  pixelRatio?: number;
}

export default class BasePlot<T extends PlotConfig = PlotConfig> {
  public width: number;
  public height: number;
  public forceFit: boolean;
  public renderer: string;
  public pixelRatio: number;
  public canvas: Canvas;
  public destroyed: boolean;
  protected layers: Array<Layer<any>>;
  // private canvasController: CanvasController;
  private containerDOM: HTMLElement;
  private resizeObserver: ResizeObserver;

  /**
   * when the container size changed, trigger it after 300ms.
   */
  private onResize = _.debounce(() => {
    if (this.destroyed) {
      return;
    }
    const { width, height } = this.getCanvasSize();
    /** height measure不准导致重复 forceFit */
    if (this.width === width && this.height === height) {
      return;
    }
    // change canvas size
    this.canvas.changeSize(width, height);
    // update layer width height
    this.updateConfig({ width, height });

    this.render();
  }, 300);

  constructor(container: HTMLElement, props: T) {
    this.containerDOM = typeof container === 'string' ? document.getElementById(container) : container;
    this.forceFit = !_.isNil(props.forceFit) ? props.forceFit : _.isNil(props.width) && _.isNil(props.height);
    this.renderer = props.renderer || 'canvas';
    this.pixelRatio = props.pixelRatio || null;

    // calculate initial width height
    this.width = props.width;
    this.height = props.height;
    const { width, height } = this.getCanvasSize();
    this.width = width;
    this.height = height;

    this.layers = [];
    this.destroyed = false;

    this.init(props);
  }

  /**
   * init
   * @param props
   */
  public init(props) {
    this.createGCanvas();
    this.bindForceFit();

    this.createLayers(props);
  }

  /** 生命周期 */
  public destroy() {
    this.eachLayer((layer) => {
      layer.destroy();
    });
    // this.canvasController.destroy();
    this.layers = [];
    this.destroyed = true;

    if (this.resizeObserver) {
      this.resizeObserver.unobserve(this.containerDOM);
      this.resizeObserver.disconnect();
      this.containerDOM = null;
    }
    this.canvas.destroy();
  }

  /**
   * 重新绘制图形
   */
  public repaint(): void {
    this.canvas.draw();
  }

  public updateConfig(config: RecursivePartial<T>, all: boolean = false) {
    if (all) {
      this.eachLayer((layer) => {
        if (layer instanceof ViewLayer) {
          layer.updateConfig(config);
        }
      });
    } else {
      const layer: any = this.layers[0];
      if (layer instanceof ViewLayer) {
        layer.updateConfig(config);
      }
    }

    if (config.width) {
      this.width = config.width as number;
    }
    if (config.height) {
      this.height = config.height as number;
    }
  }

  public changeData(data: any[], all: boolean = false) {
    if (all) {
      this.eachLayer((layer) => {
        if (layer instanceof ViewLayer) {
          layer.changeData(data);
        }
      });
    } else {
      const layer: any = this.layers[0];
      if (layer instanceof ViewLayer) {
        layer.changeData(data);
      }
    }
  }

  /**
   * 绑定一个外部的stateManager
   * 先直接传递给各个子 Layer
   *
   *  @param stateManager
   *  @param cfg
   */
  public bindStateManager(stateManager: StateManager, cfg: any) {
    this.eachLayer((layer) => {
      if (layer instanceof ViewLayer) {
        layer.bindStateManager(stateManager, cfg);
      }
    });
  }

  /**
   * 响应状态量更新的快捷方法
   *
   *  @param condition
   * @param style
   */
  public setActive(condition: any, style: any) {
    this.eachLayer((layer) => {
      if (layer instanceof ViewLayer) {
        layer.setActive(condition, style);
      }
    });
  }

  public setSelected(condition: any, style: any) {
    this.eachLayer((layer) => {
      if (layer instanceof ViewLayer) {
        layer.setSelected(condition, style);
      }
    });
  }

  public setDisable(condition: any, style: any) {
    this.eachLayer((layer) => {
      if (layer instanceof ViewLayer) {
        layer.setDisable(condition, style);
      }
    });
  }

  public setNormal(condition: any) {
    this.eachLayer((layer) => {
      if (layer instanceof ViewLayer) {
        layer.setNormal(condition);
      }
    });
  }

  /**
   * 获取图形下的图层 Layer，默认第一个 Layer
   * @param idx
   */
  public getLayer(idx: number = 0) {
    return this.layers[idx];
  }

  public render() {
    this.eachLayer((layer) => layer.render());
  }

  protected eachLayer(cb: (layer: Layer<any>) => void) {
    _.each(this.layers, cb);
  }

  /**
   * add children layer
   * @param layer
   */
  protected addLayer(layer: Layer<any>) {
    const idx = _.findIndex(this.layers, (item) => item === layer);
    if (idx < 0) {
      this.layers.push(layer);
    }
  }

  protected createLayers(props: T & { type?: string; layers?: any }) {
    if (props.layers) {
      // TODO: combo plot
    } else if (props.type) {
      const ViewLayerCtor = getPlotType(props.type);
      const viewLayerProps: T = _.deepMix({}, props, {
        canvas: this.canvas,
        x: 0,
        y: 0,
        width: this.width,
        height: this.height,
      });
      const viewLayer = new ViewLayerCtor(viewLayerProps);
      this.addLayer(viewLayer);
    }
  }
  /**
   * create G.Canvas
   */
  private createGCanvas() {
    /** 创建canvas */
    const { renderer, pixelRatio } = this;
    const { width, height } = this.getCanvasSize();
    this.canvas = new Canvas({
      containerDOM: this.containerDOM,
      width,
      height,
      renderer,
      pixelRatio,
    });
  }

  private bindForceFit() {
    if (this.forceFit) {
      // TODO 目前会导致多次渲染，先暂时关闭
      // this.resizeObserver = new ResizeObserver(this.onResize);
      // this.resizeObserver.observe(this.containerDOM);
    }
  }

  /**
   * get canvas size from props.
   * @returns the width, height of canvas
   */
  private getCanvasSize() {
    const theme = getGlobalTheme();
    let width = this.width ? this.width : theme.width;
    let height = this.height ? this.height : theme.height;

    // if forceFit = true, then use the container's size as default.
    if (this.forceFit) {
      width = this.containerDOM.offsetWidth ? this.containerDOM.offsetWidth : width;
      height = this.containerDOM.offsetHeight ? this.containerDOM.offsetHeight : height;
    }
    return { width, height };
  }
}

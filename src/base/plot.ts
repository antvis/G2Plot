import EventEmitter from '@antv/event-emitter';
import { ICanvas } from '../dependents';
import { isNil, each, findIndex, deepMix, keys, contains, isFunction } from '@antv/util';
import { RecursivePartial, LooseMap } from '../interface/types';
import StateManager from '../util/state-manager';
import CanvasController from './controller/canvas';
import EventController from './controller/event';
import { getPlotType } from './global';
import Layer from './layer';
import ViewLayer from './view-layer';
import { CANVAS_EVENT_MAP } from '../util/event';

export interface PlotConfig {
  forceFit?: boolean;
  width?: number;
  renderer?: string;
  height?: number;
  pixelRatio?: number;
  theme?: LooseMap | string;
  localRefresh?: boolean;
}

type LayerCtor<C> = ViewLayer<C>;

export default class BasePlot<
  T extends PlotConfig = PlotConfig,
  L extends LayerCtor<T> = LayerCtor<T>
> extends EventEmitter {
  public width: number;
  public height: number;
  public forceFit: boolean;
  public renderer: string;
  public pixelRatio: number;
  public theme: string | object;
  public localRefresh?: boolean;
  public canvas: ICanvas;
  public destroyed: boolean;
  protected layers: Array<L>;
  private canvasController: CanvasController;
  private eventController: EventController;
  protected containerDOM: HTMLElement;

  constructor(container: HTMLElement, props: T) {
    super();
    this.containerDOM = typeof container === 'string' ? document.getElementById(container) : container;
    this.forceFit = !isNil(props.forceFit) ? props.forceFit : isNil(props.width) && isNil(props.height);
    this.renderer = props.renderer || 'canvas';
    this.pixelRatio = props.pixelRatio || null;
    this.width = props.width;
    this.height = props.height;
    this.theme = props.theme;
    this.localRefresh = props.localRefresh;
    this.canvasController = new CanvasController({
      containerDOM: this.containerDOM,
      plot: this,
    });
    /** update layer properties */
    this.width = this.canvasController.width;
    this.height = this.canvasController.height;
    this.canvas = this.canvasController.canvas;
    this.layers = [];
    this.destroyed = false;

    this.createLayers(props);

    /** bind events */
    this.eventController = new EventController({
      plot: this,
      canvas: this.canvasController.canvas,
    });

    this.eventController.bindEvents();
    this.parseEvents(props);
  }

  /** 生命周期 */
  public destroy() {
    this.eachLayer((layer) => {
      layer.destroy();
    });
    this.canvasController.destroy();
    this.eventController.clearEvents();
    this.layers = [];
    this.destroyed = true;
  }

  /**
   * 重新绘制图形
   */
  public repaint(): void {
    this.canvasController.canvas.draw();
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
      if (layer instanceof Layer) {
        layer.updateConfig(config);
      }
    }

    if (config.width) {
      this.width = config.width as number;
    }
    if (config.height) {
      this.height = config.height as number;
    }
    if (config.theme) {
      this.theme = config.theme;
    }

    this.canvasController.updateCanvasSize();
    this.canvasController.updateCanvasTheme();
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

  public getScaleByField(field: string) {
    return this.layers[0].getScaleByField(field);
  }

  public getXScale() {
    return this.layers[0].getXScale();
  }

  public getYScale() {
    return this.layers[0].getYScale();
  }

  public getColorScale() {
    return this.layers[0].getColorScale();
  }

  public getPlotTheme() {
    const layer: any = this.layers[0];
    return layer.getPlotTheme();
  }

  public getData() {
    const layer: any = this.layers[0];
    return layer.getData();
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

  public setDefault(condition: any, style: any) {
    this.eachLayer((layer) => {
      if (layer instanceof ViewLayer) {
        layer.setDefault(condition, style);
      }
    });
  }

  /**
   * 获取 Plot 的 View
   */
  public getView() {
    // 临时：避免 getLayer 的类型转换问题
    return (this.layers[0] as ViewLayer<T>).view;
  }

  /**
   * 获取图形下的图层 Layer，默认第一个 Layer
   * @param idx
   */
  public getLayer(idx: number = 0) {
    return this.layers[idx];
  }

  public getCanvas() {
    return this.canvasController.canvas;
  }

  public getLayers() {
    return this.layers;
  }

  public render() {
    this.eachLayer((layer) => layer.render());
  }

  protected eachLayer(cb: (layer: Layer<any>) => void) {
    each(this.layers, cb);
  }

  /**
   * add children layer
   * @param layer
   */
  public addLayer(layer: L) {
    const idx = findIndex(this.layers, (item) => item === layer);
    if (idx < 0) {
      this.layers.push(layer);
    }
  }

  protected createLayers(props: T & { type?: string; layers?: any }) {
    if (props.layers) {
      // TODO: combo plot
    } else if (props.type) {
      const viewLayerCtr = getPlotType(props.type);
      const viewLayerProps: T = deepMix({}, props, {
        canvas: this.canvasController.canvas,
        x: 0,
        y: 0,
        width: this.width,
        height: this.height,
      });
      const viewLayer = new viewLayerCtr(viewLayerProps);
      this.addLayer(viewLayer);
    }
  }

  protected parseEvents(props) {
    const eventsName = keys(CANVAS_EVENT_MAP);
    if (props.events) {
      each(props.events, (e, k) => {
        if (contains(eventsName, k) && isFunction(e)) {
          const eventName = CANVAS_EVENT_MAP[k] || k;
          const handler = e;
          this.on(eventName, handler);
        }
      });
    }
  }
}

import * as G from '@antv/g';
import * as _ from '@antv/util';
import { RecursivePartial } from '../interface/types';
import StateManager from '../util/state-manager';
import CanvasController from './controller/canvas';
import { getPlotType } from './global';
import Layer from './layer';
import ViewLayer from './view-layer';

export interface PlotConfig {
  forceFit?: boolean;
  width?: number;
  renderer?: string;
  height?: number;
  pixelRatio?: number;
  theme?: string | {};
}

export default class BasePlot<T extends PlotConfig = PlotConfig> {
  public width: number;
  public height: number;
  public forceFit: boolean;
  public renderer: string;
  public pixelRatio: number;
  public theme: string | object;
  public canvas: G.Canvas;
  public destroyed: boolean;
  protected layers: Array<Layer<any>>;
  private canvasController: CanvasController;
  private containerDOM: HTMLElement;

  constructor(container: HTMLElement, props: T) {
    this.containerDOM = typeof container === 'string' ? document.getElementById(container) : container;
    this.forceFit = !_.isNil(props.forceFit) ? props.forceFit : _.isNil(props.width) && _.isNil(props.height);
    this.renderer = props.renderer || 'canvas';
    this.pixelRatio = props.pixelRatio || null;
    this.width = props.width;
    this.height = props.height;
    this.theme = props.theme;
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
  }

  /** 生命周期 */
  public destroy() {
    this.eachLayer((layer) => {
      layer.destroy();
    });
    this.canvasController.destroy();
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

  public getCanvas() {
    return this.canvasController.canvas;
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
      const viewLayerCtr = getPlotType(props.type);
      const viewLayerProps: T = _.deepMix({}, props, {
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
}

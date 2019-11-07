import * as _ from '@antv/util';
import { RecursivePartial } from '../interface/types';
import StateManager from '../util/state-manager';
import CanvasController from './controller/canvas';
import { getPlotType } from './global';
import Layer from './layer';
import ViewLayer, { ViewLayerCfg } from './view-layer';

export interface PlotCfg {
  forceFit: boolean;
}

export default class BasePlot<T extends PlotCfg = PlotCfg> extends Layer {
  public width: number;
  public height: number;
  public forceFit: boolean;
  public renderer: string = 'canvas';
  public pixelRatio: number;
  private canvasController: CanvasController;
  private containerDOM: HTMLElement;

  constructor(container: HTMLElement, props: ViewLayerCfg) {
    super(props);
    this.containerDOM = typeof container === 'string' ? document.getElementById(container) : container;
    this.canvasController = new CanvasController({
      containerDOM: this.containerDOM,
      plot: this,
    });
    /** update layer properties */
    this.width = this.canvasController.width;
    this.height = this.canvasController.height;
    this.canvas = this.canvasController.canvas;

    this.createLayers(props);
  }

  /** 生命周期 */
  public destroy() {
    super.destroy();
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

  public createLayers(props) {
    if (props.layers) {
      // TODO: combo plot
    } else if (props.type) {
      const viewLayerCtr = getPlotType(props.type);
      const viewLayerProps = _.deepMix({}, props, {
        canvas: this.canvasController.canvas,
        parent: this,
      });
      const viewLayer = new viewLayerCtr(viewLayerProps);
      this.addLayer(viewLayer);
    }
  }

  /**
   * 获取图形下的图层 Layer，默认第一个 Layer
   * @param idx
   */
  public getLayer(idx: number = 0) {
    return this.layers[idx];
  }
}

import { deepMix, each, findIndex, get } from '@antv/util';
import * as _ from '@antv/util';
import BaseConfig from '../interface/config';
import { RecursivePartial } from '../interface/types';
import CanvasController from './controller/canvas-refactor';
import { getPlotType } from './global';
import Layer, { LayerCfg } from './layer-refactor';
import ViewLayer, { ViewLayerCfg } from './view-layer-refactor';

export interface PlotCfg {
  width: number;
  height: number;
  forceFit: boolean;
}

export default class BasePlot extends Layer {
  public width: number;
  public height: number;
  public forceFit: boolean;
  public renderer: string = 'canvas';
  public pixelRatio: number;
  private canvasController: CanvasController;
  private containerDOM: HTMLElement;

  constructor(container: HTMLElement, props: ViewLayerCfg) {
    super(props);
    this.containerDOM = container;
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

  private createLayers(props) {
    if (props.layers) {
    } else if (props.type) {
      const viewLayerCtr = getPlotType(props.type);
      const viewLayerProps = _.deepMix({}, props, {
        canvas: this.canvasController.canvas,
      });
      const viewLayer = new viewLayerCtr(viewLayerProps);
      this.layers.push(viewLayer);
    }
  }
}

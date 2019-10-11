import { SliderPlotConfig } from '../../base/SliderPlot';
import ViewLayer from '../../base/ViewLayer';
import Area from '../area';
import StackAreaLayer, { StackAreaLayerConfig } from './StackAreaLayer';

export interface StackAreaConfig extends StackAreaLayerConfig, SliderPlotConfig {}

export default class StackArea extends Area<StackAreaConfig> {
  protected addMainLayer(): ViewLayer<StackAreaConfig> {
    const layer = new StackAreaLayer(
      this.getCanvasController(),
      this.getThemeController(),
      this.getMainLayerRange(),
      this.initialProps
    );
    this.addLayer(layer);

    return layer;
  }
}

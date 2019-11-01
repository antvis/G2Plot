import Area from '../area';
import StackAreaLayer, { StackAreaLayerConfig } from './layer';

export interface StackAreaConfig extends StackAreaLayerConfig {}

export default class StackArea extends Area<StackAreaConfig> {
  protected init() {
    const layer = new StackAreaLayer(
      this.getCanvasController(),
      this.getThemeController(),
      this.getPlotRange(),
      this.initialProps
    );
    this.addLayer(layer);
  }
}

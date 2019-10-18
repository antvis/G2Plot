import StackBar from '../stack-bar';
import PercentageStackBarLayer, { PercentageStackBarLayerConfig } from './layer';

export interface PercentageStackBarConfig extends PercentageStackBarLayerConfig {}

export default class PercentageStackBar extends StackBar {
  protected init() {
    const layer = new PercentageStackBarLayer(
      this.getCanvasController(),
      this.getThemeController(),
      this.getPlotRange(),
      this.initialProps
    );
    this.addLayer(layer);
  }
}

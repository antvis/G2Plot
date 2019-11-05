import BasePlot from '../../base/plot';
import BubbleLayer, { BubbleLayerConfig } from './layer';

export interface BubbleConfig extends BubbleLayerConfig {}

export default class Bubble<T extends BubbleLayerConfig = BubbleLayerConfig> extends BasePlot<T> {
  protected init() {
    const layer = new BubbleLayer(
      this.getCanvasController(),
      this.getThemeController(),
      this.getPlotRange(),
      this.initialProps
    );
    this.addLayer(layer);
  }
}

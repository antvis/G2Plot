import BasePlot from '../../base/plot';
import BarLayer, { BarLayerConfig } from './layer';

export { BarLayerConfig as BarConfig };

export default class Bar<T extends BarLayerConfig = BarLayerConfig> extends BasePlot<T> {
  protected init() {
    const layer = new BarLayer(
      this.getCanvasController(),
      this.getThemeController(),
      this.getPlotRange(),
      this.initialProps
    );
    this.addLayer(layer);
  }
}

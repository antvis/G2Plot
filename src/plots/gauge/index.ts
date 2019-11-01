import BasePlot from '../../base/plot';
import GaugeLayer, { GaugeLayerConfig } from './layer';

export { GaugeLayerConfig as GaugeConfig };

export default class Gauge extends BasePlot<GaugeLayerConfig> {
  protected init() {
    const layer = new GaugeLayer(
      this.getCanvasController(),
      this.getThemeController(),
      this.getPlotRange(),
      this.initialProps
    );
    this.addLayer(layer);
  }
}

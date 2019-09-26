import BasePlot from '../../base/Plot';
import GaugeLayer, { GaugeLayerConfig } from './GaugeLayer';

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

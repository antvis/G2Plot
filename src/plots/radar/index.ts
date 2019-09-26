import BasePlot from '../../base/Plot';
import RadarLayer, { RadarLayerConfig } from './RadarLayer';

export { RadarLayerConfig as RadarConfig };

export default class Radar extends BasePlot<RadarLayerConfig> {
  protected init() {
    const layer = new RadarLayer(
      this.getCanvasController(),
      this.getThemeController(),
      this.getPlotRange(),
      this.initialProps
    );
    this.addLayer(layer);
  }
}

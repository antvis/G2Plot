import BasePlot from '../../base/plot';
import RadarLayer, { RadarLayerConfig } from './layer';

export { RadarLayerConfig as RadarConfig };

export default class Radar extends BasePlot<RadarLayerConfig> {
  public static getDefaultProps = RadarLayer.getDefaultProps;
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

import BasePlot from '../../base/plot';
import LineLayer, { LineLayerConfig } from './layer';

export interface LineConfig extends LineLayerConfig {}

export default class Line<T extends LineLayerConfig = LineLayerConfig> extends BasePlot<T> {
  public static getDefaultProps = LineLayer.getDefaultProps;
  protected init() {
    const layer = new LineLayer(
      this.getCanvasController(),
      this.getThemeController(),
      this.getPlotRange(),
      this.initialProps
    );
    this.addLayer(layer);
  }
}

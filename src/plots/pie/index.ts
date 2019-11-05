import BasePlot from '../../base/plot';
import PieLayer, { PieLayerConfig } from './layer';

export { PieLayerConfig as PieConfig };

export default class Pie<T extends PieLayerConfig = PieLayerConfig> extends BasePlot<PieLayerConfig> {
  public static getDefaultProps = PieLayer.getDefaultProps;
  protected init() {
    const layer = new PieLayer(
      this.getCanvasController(),
      this.getThemeController(),
      this.getPlotRange(),
      this.initialProps
    );
    this.addLayer(layer);
  }
}

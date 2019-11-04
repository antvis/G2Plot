import BasePlot from '../../base/plot';
import ColumnLayer, { ColumnLayerConfig } from './layer';

export interface ColumnConfig extends ColumnLayerConfig {}

export default class Column<T extends ColumnLayerConfig = ColumnLayerConfig> extends BasePlot<T> {
  public static getDefaultProps = ColumnLayer.getDefaultProps;
  protected init() {
    const layer = new ColumnLayer(
      this.getCanvasController(),
      this.getThemeController(),
      this.getPlotRange(),
      this.initialProps
    );
    this.addLayer(layer);
  }
}

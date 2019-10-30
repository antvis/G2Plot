import BasePlot from '../../base/Plot';
import ColumnLayer, { ColumnLayerConfig } from './ColumnLayer';

export interface ColumnConfig extends ColumnLayerConfig {}

export default class Column<T extends ColumnLayerConfig = ColumnLayerConfig> extends BasePlot<T> {
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

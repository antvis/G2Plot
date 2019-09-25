import BasePlot from '../../base/Plot';
import ColumnLayer, { ColumnLayerConfig } from './ColumnLayer';

export { ColumnLayerConfig as ColumnConfig };

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

import Column from '../column';
import StackColumnLayer, { StackColumnLayerConfig } from './StackColumnLayer';

export { StackColumnLayerConfig as StackColumnConfig };

export default class StackColumn extends Column<StackColumnLayerConfig> {
  protected addColumnLayer(): void {
    this.columnLayer = new StackColumnLayer(
      this.getCanvasController(),
      this.getThemeController(),
      this.getPlotRange(),
      this.initialProps
    );
    this.addLayer(this.columnLayer);
  }
}

import StackColumn from '../stack-column';
import PercentageStackColumnLayer, { PercentageStackColumnLayerConfig } from './layer';

export interface PercentageStackColumnConfig extends PercentageStackColumnLayerConfig {}

export default class PercentageStackColumn extends StackColumn {
  public static getDefaultProps = PercentageStackColumnLayer.getDefaultProps;
  protected init() {
    const layer = new PercentageStackColumnLayer(
      this.getCanvasController(),
      this.getThemeController(),
      this.getPlotRange(),
      this.initialProps
    );
    this.addLayer(layer);
  }
}

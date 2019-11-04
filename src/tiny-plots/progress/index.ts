import TinyPlot from '../tiny-plot';
import ProgressLayer, { ProgressLayerConfig } from './layer';

export { ProgressLayerConfig as ProgressConfig };
export default class Progress<T extends ProgressLayerConfig = ProgressLayerConfig> extends TinyPlot<T> {
  public static getDefaultProps = ProgressLayer.getDefaultProps;
  protected init(): void {
    this.addLayer(
      new ProgressLayer(this.getCanvasController(), this.getThemeController(), this.getPlotRange(), this.initialProps)
    );
  }
}

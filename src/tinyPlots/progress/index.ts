import TinyPlot from '../TinyPlot';
import ProgressLayer, { ProgressLayerConfig } from './ProgressLayer';

export { ProgressLayerConfig as ProgressConfig };
export default class Progress<T extends ProgressLayerConfig = ProgressLayerConfig> extends TinyPlot<T> {
  protected init(): void {
    this.addLayer(
      new ProgressLayer(this.getCanvasController(), this.getThemeController(), this.getPlotRange(), this.initialProps)
    );
  }
}

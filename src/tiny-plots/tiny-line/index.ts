import TinyPlot from '../tiny-plot';
import TinyLineLayer from './layer';

export default class TinyArea extends TinyPlot {
  protected init(): void {
    this.addLayer(
      new TinyLineLayer(this.getCanvasController(), this.getThemeController(), this.getPlotRange(), this.initialProps)
    );
  }
}

import TinyPlot from '../tiny-plot';
import TinyColumnLayer from './layer';

export default class TinyColumn extends TinyPlot {
  protected init(): void {
    this.addLayer(
      new TinyColumnLayer(this.getCanvasController(), this.getThemeController(), this.getPlotRange(), this.initialProps)
    );
  }
}

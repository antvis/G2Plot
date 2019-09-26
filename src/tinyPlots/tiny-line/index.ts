import TinyPlot from '../TinyPlot';
import TinyLineLayer from './TinyLineLayer';

export default class TinyArea extends TinyPlot {
  protected init(): void {
    this.addLayer(
      new TinyLineLayer(this.getCanvasController(), this.getThemeController(), this.getPlotRange(), this.initialProps)
    );
  }
}

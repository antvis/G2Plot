import TinyPlot from '../TinyPlot';
import TinyAreaLayer from './TinyAreaLayer';

export default class TinyArea extends TinyPlot {
  protected init(): void {
    this.addLayer(
      new TinyAreaLayer(this.getCanvasController(), this.getThemeController(), this.getPlotRange(), this.initialProps)
    );
  }
}

import TinyPlot from '../TinyPlot';
import TinyColumnLayer from './TinyColumnLayer';

export default class TinyColumn extends TinyPlot {
  protected init(): void {
    this.addLayer(
      new TinyColumnLayer(this.getCanvasController(), this.getThemeController(), this.getPlotRange(), this.initialProps)
    );
  }
}

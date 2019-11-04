import TinyPlot from '../tiny-plot';
import TinyColumnLayer from './layer';

export default class TinyColumn extends TinyPlot {
  public static getDefaultProps = TinyColumnLayer.getDefaultProps;
  protected init(): void {
    this.addLayer(
      new TinyColumnLayer(this.getCanvasController(), this.getThemeController(), this.getPlotRange(), this.initialProps)
    );
  }
}

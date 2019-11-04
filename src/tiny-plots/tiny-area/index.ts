import TinyPlot from '../tiny-plot';
import TinyAreaLayer from './layer';

export default class TinyArea extends TinyPlot {
  public static getDefaultProps = TinyAreaLayer.getDefaultProps;
  protected init(): void {
    this.addLayer(
      new TinyAreaLayer(this.getCanvasController(), this.getThemeController(), this.getPlotRange(), this.initialProps)
    );
  }
}

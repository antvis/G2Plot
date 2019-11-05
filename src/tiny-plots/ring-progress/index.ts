import Progress from '../progress';
import RingProgressLayer from './layer';

export default class RingProgress extends Progress {
  public static getDefaultProps = RingProgressLayer.getDefaultProps;
  protected init(): void {
    this.addLayer(
      new RingProgressLayer(
        this.getCanvasController(),
        this.getThemeController(),
        this.getPlotRange(),
        this.initialProps
      )
    );
  }
}

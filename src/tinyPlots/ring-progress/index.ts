import Progress from '../progress';
import RingProgressLayer from './RingProgressLayer';

export default class RingProgress extends Progress {
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

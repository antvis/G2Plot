import { BBox } from '@antv/g';
import { head, last, map, size, throttle } from '@antv/util';
import Config, { SliderConfig } from '../interface/config';
import SliderLayer from '../layers/SliderLayer';
import Plot from './Plot';
import ViewLayer from './ViewLayer';

const DEFAULT_HEIGHT: number = 16;
const DEFAULT_PADDING: number = 16;

const SLIDER_CHANGE_THROTTLE_INTERVAL = 13;

export enum SliderType {
  Horizontal,
  Vertical,
}

export interface SliderPlotConfig {
  slider?: SliderConfig;
}

export default abstract class SliderPlot<T extends SliderPlotConfig & Config> extends Plot<T> {
  protected sliderType: SliderType = SliderType.Horizontal;
  private mainLayer: ViewLayer<T>;
  private sliderLayer: SliderLayer;
  private onSliderChangeFn: (range: [number, number]) => void;

  public destroy(): void {
    super.destroy();
    this.mainLayer = null;
    this.sliderLayer = null;
  }

  public render(): void {
    this.destroySliderLayer();
    super.render();
    if (this.showSlider()) {
      this.addSliderLayer();
      this.sliderLayer.render();
    }
  }

  protected init(): void {
    this.sliderLayer = null;
    this.onSliderChangeFn = throttle(this.onSliderChange.bind(this), SLIDER_CHANGE_THROTTLE_INTERVAL, {
      leading: true,
    }) as (range: [number, number]) => void;
    this.mainLayer = this.addMainLayer();
  }

  protected abstract addMainLayer(): ViewLayer<T>;

  protected getMainLayerRange(): BBox {
    const plotRange = this.getPlotRange();
    const { paddingTop, paddingBottom } = this.getSliderPadding();

    return this.showSlider()
      ? new BBox(
          plotRange.minX,
          plotRange.minY,
          plotRange.width,
          plotRange.height - this.getSliderHeight() - paddingTop - paddingBottom
        )
      : plotRange;
  }

  private showSlider(): boolean {
    return this.initialProps.slider && this.initialProps.slider.visible;
  }

  private getSliderPadding(): { paddingTop: number; paddingBottom: number } {
    const { paddingTop = DEFAULT_PADDING, paddingBottom = DEFAULT_PADDING } = this.initialProps.slider || {};
    return { paddingTop, paddingBottom };
  }

  private getSliderHeight(): number {
    return (this.initialProps.slider && this.initialProps.slider.height) || DEFAULT_HEIGHT;
  }

  private getSliderTrendData(): number[] {
    const { data, yField } = this.initialProps;

    return map(data, (item) => item[yField]);
  }

  private getSliderLayerRange(): BBox {
    const plotRange = this.getPlotRange();
    const sliderHeight = this.getSliderHeight();
    const { paddingTop, paddingBottom } = this.getSliderPadding();
    const panelRange = this.mainLayer.plot.get('panelRange');

    return this.showSlider()
      ? new BBox(
          panelRange.minX,
          plotRange.maxY - sliderHeight - paddingTop - paddingBottom,
          panelRange.width,
          sliderHeight
        )
      : new BBox(0, 0, 0, 0);
  }

  private addSliderLayer(): void {
    const { slider = {} } = this.initialProps;
    this.sliderLayer = new SliderLayer(
      this.getCanvasController(),
      this.getThemeController(),
      this.getSliderLayerRange(),
      {
        start: slider.start,
        end: slider.end,
        foregroundColor: slider.foregroundColor,
        backgroundColor: slider.backgroundColor,
        data: this.getSliderTrendData(),
        onChange: this.onSliderChangeFn,
      }
    );
    this.addLayer(this.sliderLayer);
    this.onSliderChange([slider.start, slider.end], true);
  }

  private destroySliderLayer(): void {
    if (this.sliderLayer) {
      this.removeLayer(this.sliderLayer);
      this.sliderLayer.destroy();
      this.sliderLayer = null;
    }
  }

  private onSliderChange(range: [number, number], animation: boolean = false) {
    const { data = [], xField } = this.initialProps;
    const length = size(data);
    const [start = 0, end = 1] = range;
    const startIdx = Math.round(start * length);
    const endIdx = Math.max(startIdx + 1, Math.round(end * length));
    const newData = data.slice(startIdx, endIdx);
    let origAnimation;
    this.sliderLayer.updateSlider({
      start,
      end,
      minText: head(newData)[xField],
      maxText: last(newData)[xField],
    });
    if (!animation) {
      origAnimation = this.mainLayer.plot.get('animation');
      this.mainLayer.plot.animate(false);
    }
    this.mainLayer.changeData(newData);
    if (!animation) {
      this.mainLayer.plot.animate(origAnimation);
    }
  }
}

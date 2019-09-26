import { BBox } from '@antv/g';
import { head, last, map, size, throttle } from '@antv/util';
import BasePlot from '../../base/Plot';
import { RecursivePartial } from '../../interface/types';
import LineLayer, { LineLayerConfig } from './LineLayer';
import SliderLayer from './SliderLayer';

const DEFAULT_HEIGHT: number = 16;
const DEFAULT_PADDING = 16;

export interface LineConfig extends LineLayerConfig {
  slider?: {
    visible?: boolean;
    start?: number;
    end?: number;
    height?: number;
    paddingTop?: number;
    paddingBottom?: number;
  };
}

export default class Line extends BasePlot<LineConfig> {
  private lineLayer: LineLayer;
  private sliderLayer: SliderLayer;
  private onSliderChangeFn: (range: [number, number]) => void;

  public destroy(): void {
    super.destroy();
    this.lineLayer = null;
    this.sliderLayer = null;
  }

  public updateConfig(config: RecursivePartial<LineConfig>): void {
    this.updateConfigBase(config);
    // 1. line: adjust range, adjust config
    this.lineLayer.updateRange(this.getLineLayerRange());
    this.lineLayer.updateConfig(config);
    // 2. slider:  update if needed
    if (this.showSlider()) {
      const { slider = {} } = this.initialProps;
      if (!this.sliderLayer) {
        this.addSliderLayer();
      } else {
        this.sliderLayer.updateRange(this.getSliderLayerRange());
        this.sliderLayer.updateConfig({
          start: slider.start,
          end: slider.end,
          data: this.getSliderTrendData(),
          onChange: this.onSliderChangeFn,
        });
        this.onSliderChange([slider.start, slider.end]);
      }
    } else {
      this.removeSliderLayer();
    }
  }

  protected init(): void {
    this.lineLayer = null;
    this.sliderLayer = null;
    this.onSliderChangeFn = throttle(this.onSliderChange.bind(this), 50, { leading: true }) as (
      range: [number, number]
    ) => void;
    this.addLineLayer();
    if (this.showSlider()) {
      this.addSliderLayer();
    }
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

  private getLineLayerRange(): BBox {
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

  private getSliderLayerRange(): BBox {
    const plotRange = this.getPlotRange();
    const sliderHeight = this.getSliderHeight();
    const { paddingTop, paddingBottom } = this.getSliderPadding();
    const panelRange = this.lineLayer.plot.get('panelRange');

    return this.showSlider
      ? new BBox(
          panelRange.minX,
          plotRange.maxY - sliderHeight - paddingTop - paddingBottom,
          panelRange.width,
          sliderHeight
        )
      : new BBox(0, 0, 0, 0);
  }

  private addLineLayer(): void {
    this.lineLayer = new LineLayer(
      this.getCanvasController(),
      this.getThemeController(),
      this.getLineLayerRange(),
      this.initialProps
    );
    this.addLayer(this.lineLayer);
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
        data: this.getSliderTrendData(),
        onChange: this.onSliderChangeFn,
      }
    );
    this.addLayer(this.sliderLayer);
    this.onSliderChange([slider.start, slider.end]);
  }

  private removeSliderLayer(): void {
    if (this.sliderLayer) {
      this.removeLayer(this.sliderLayer);
      this.sliderLayer.destroy();
      this.sliderLayer = null;
    }
  }

  private onSliderChange(range: [number, number]) {
    const { data = [], xField } = this.initialProps;
    const length = size(data);
    const [start = 0, end = 1] = range;
    const newData = data.slice(Math.round(start * length), Math.round(end * length));
    this.sliderLayer.updateSlider({
      start,
      end,
      minText: head(newData)[xField],
      maxText: last(newData)[xField],
    });
    this.lineLayer.changeData(newData);
  }
}

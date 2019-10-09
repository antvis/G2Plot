import { Group } from '@antv/g';
import { Slider } from '@antv/gui';
import Layer from '../base/Layer';
import { RecursivePartial } from '../interface/types';

export interface SliderLayerConfig {
  // 开始位置，[0-1]
  start?: number;
  // 结束位置，[0-1]
  end?: number;
  // 开始位置对应文本
  minText?: string;
  // 结束位置对应文本
  maxText?: string;
  // 前景颜色
  foregroundColor?: string;
  // 背景颜色
  backgroundColor?: string;
  // 数据
  data: number[];
  // 缩略轴变化时的回调函数
  onChange?: (range: [number, number]) => void;
}

export default class SliderLayer extends Layer<SliderLayerConfig> {
  private container: Group | null = null;
  private slider: Slider | null = null;

  public updateSlider({
    start,
    end,
    minText,
    maxText,
  }: {
    start?: number;
    end?: number;
    minText?: string;
    maxText?: string;
  }): void {
    this.updateConfig({ start, end, minText, maxText });
    if (this.slider) {
      this.slider.update({
        start,
        end,
        minText,
        maxText,
      });
    }
  }

  public render(): void {
    if (!this.container) {
      this.container = this.getCanvasController().canvas.addGroup();
    }
    if (this.slider) {
      this.slider.off('sliderchange', this.onChange);
      this.slider.remove(true);
    }
    this.slider = new Slider(this.getSliderConfig());
    this.slider.on('sliderchange', this.onChange);
    this.container.add(this.slider);

    this.getCanvasController().canvas.draw();
  }

  public updateConfig(config: RecursivePartial<SliderLayerConfig>): void {
    super.updateConfig(config);
    if (this.slider) {
      this.slider.update(this.getSliderConfig());
    }
  }

  public changeData(data: any[]): void {
    throw new Error('Method not implemented.');
  }

  public destroy() {
    if (this.slider) {
      this.slider.off('sliderchange', this.onChange);
      this.slider = null;
    }
    if (this.container) {
      this.container.remove(true);
      this.container = null;
    }
    super.destroy();
  }

  protected setType(): void {
    this.type = 'slider';
  }

  private onChange = (range: [number, number]) => {
    const { onChange } = this.initialProps;
    if (onChange) {
      onChange(range);
    }
  };

  private getSliderConfig() {
    const range = this.getLayerRange();
    const { foregroundColor, backgroundColor } = this.initialProps;

    const cfg: any = {
      x: range.tl.x,
      y: range.tl.y,
      width: range.width,
      height: range.height,
      start: this.initialProps.start,
      end: this.initialProps.end,
      minText: this.initialProps.minText,
      maxText: this.initialProps.maxText,
      trendCfg: {
        data: this.initialProps.data,
        isArea: false,
        smooth: false,
      },
      foregroundStyle: {},
      backgroundStyle: {},
    };

    if (foregroundColor) {
      cfg.foregroundStyle.fill = foregroundColor;
    }
    if (backgroundColor) {
      cfg.backgroundStyle.fill = backgroundColor;
    }

    return cfg;
  }
}

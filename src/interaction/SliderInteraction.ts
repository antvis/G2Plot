import { BBox, Group } from '@antv/g';
import { Slider } from '@antv/gui';
import { Scale } from '@antv/scale';
import { clamp, head, last, map, size, throttle } from '@antv/util';
import { ISliderInteractionConfig } from '../interface/config';
import BaseInteraction from './BaseInteraction';
import { getDataByScaleRange } from './helper/data-range';

const DEFAULT_PADDING: number = 8;
const DEFAULT_SIZE: number = 16;

const getValidSliderConfig = (cfg: ISliderInteractionConfig = {}): Required<ISliderInteractionConfig> => {
  const _cfg: Required<ISliderInteractionConfig> = {
    type: 'horizontal',
    start: 0,
    end: 1,
    width: undefined,
    height: undefined,
    padding: [0, 0, 0, 0],
    backgroundColor: undefined,
    foregroundColor: undefined,
    ...cfg,
  };

  // default padding
  if (!cfg.padding) {
    _cfg.padding =
      _cfg.type === 'horizontal' ? [DEFAULT_PADDING, 0, DEFAULT_PADDING, 0] : [0, DEFAULT_PADDING, 0, DEFAULT_PADDING];
  }

  // default size
  if (!cfg.height) {
    _cfg.height = DEFAULT_SIZE;
  }
  if (!cfg.width) {
    _cfg.width = DEFAULT_SIZE;
  }

  // start & end
  const start = clamp(Math.min(_cfg.start, _cfg.end), 0, 1);
  const end = clamp(Math.max(_cfg.start, _cfg.end), 0, 1);
  _cfg.start = start;
  _cfg.end = end;

  return _cfg;
};

export default class SliderInteraction extends BaseInteraction {
  public static getInteractionRange(layerRange: BBox, interaction: ISliderInteractionConfig): BBox {
    const config: ISliderInteractionConfig = getValidSliderConfig(interaction);
    const [paddingTop, paddingRight, paddingBottom, paddingLeft] = config.padding || [0, 0, 0, 0];

    if (config.type === 'horizontal') {
      return new BBox(
        layerRange.minX,
        layerRange.maxY - config.height - paddingTop - paddingBottom,
        layerRange.width,
        config.height + paddingTop + paddingBottom
      );
    } else {
      return new BBox(
        layerRange.maxX - config.width - paddingLeft - paddingRight,
        layerRange.minY,
        config.width + paddingLeft + paddingRight,
        layerRange.height
      );
    }
  }

  private container: Group;
  private slider: Slider;
  private curStart: number;
  private curEnd: number;
  private xScaleCfg:
    | {
        field: string;
        values: string[];
      }
    | undefined;
  private onChangeFn: (range: [number, number]) => void = throttle(this.onChange.bind(this), 20, { leading: true }) as (
    range: [number, number]
  ) => void;

  protected render(): void {
    // 设置初始化的 start/end
    const config = getValidSliderConfig(this.getInteractionConfig());
    this.curStart = config.start;
    this.curEnd = config.end;
    this.xScaleCfg = undefined;
    // 等待 view 每次 render 完成后更新 slider 组件
    this.view.on('afterrender', () => {
      if (!this.xScaleCfg) {
        // 初始化配置和数据
        const xScale: Scale = this.view.getXScale();
        this.xScaleCfg = {
          field: xScale.field,
          values: xScale.values || [],
        };
        // 初始化 data
        this.view.set('data', this.getSliderData(this.curStart, this.curEnd));
        this.view.repaint();
      } else {
        this.renderSlider();
      }
    });
  }

  protected clear(): void {
    if (this.slider) {
      this.slider.destroy();
      this.slider = null;
    }
    if (this.container) {
      this.container.remove(true);
      this.container = null;
    }
  }

  private renderSlider(): void {
    if (!this.slider) {
      this.container = this.canvas.addGroup();
      this.slider = new Slider(this.getSliderConfig());
      this.slider.on('sliderchange', this.onChangeFn);
      this.container.add(this.slider);
    } else {
      this.slider.update(this.getSliderConfig());
    }
  }

  private getSliderConfig() {
    const view = this.view;
    const panelRange: BBox = view.get('panelRange');
    const range = this.getRange();
    const config: ISliderInteractionConfig | null = getValidSliderConfig(this.getInteractionConfig());
    const { padding = [0, 0, 0, 0], foregroundColor, backgroundColor } = config || {};
    const [paddingTop, paddingRight, paddingBottom, paddingLeft] = padding;
    const { minText, maxText } = this.getSliderMinMaxText(this.curStart, this.curEnd);
    const cfg: any = {
      x: panelRange.minX + paddingLeft,
      y: range.tl.y + paddingTop,
      width: panelRange.width - paddingLeft - paddingRight,
      height: range.height - paddingTop - paddingBottom,
      start: this.curStart,
      end: this.curEnd,
      minText,
      maxText,
      trendCfg: {
        data: this.getSliderTrendData(),
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

  private getSliderTrendData(): number[] {
    const { data, yField } = this.getViewLayer().initialProps;

    return map(data, (item) => item[yField]);
  }

  private getSliderData(start: number, end: number): any[] {
    const origData = this.getViewLayer().getData();
    const length = size(this.xScaleCfg.values);
    const startIdx = Math.round(start * length);
    const endIdx = Math.max(startIdx + 1, Math.round(end * length));

    return getDataByScaleRange(this.xScaleCfg.field, this.xScaleCfg.values, origData, [startIdx, endIdx]);
  }

  private getSliderMinMaxText(start: number, end: number): { minText: string; maxText: string } {
    const { data = [], xField } = this.getViewLayer().initialProps;
    const length = size(data);
    const startIdx = Math.round(start * length);
    const endIdx = Math.max(startIdx + 1, Math.round(end * length));
    const newData = data.slice(startIdx, endIdx);

    return {
      minText: head(newData)[xField],
      maxText: last(newData)[xField],
    };
  }

  private onChange(range: [number, number]): void {
    const view = this.view;
    const start = clamp(Math.min(range[0], range[1]), 0, 1);
    const end = clamp(Math.max(range[0], range[1]), 0, 1);
    const data = this.getSliderData(start, end);
    const { minText, maxText } = this.getSliderMinMaxText(start, end);
    this.curStart = start;
    this.curEnd = end;
    this.slider.update({
      start,
      end,
      minText,
      maxText,
    });
    const origAnimation = view.get('animation');
    view.animate(false);
    view.set('data', data);
    view.repaint();
    view.animate(origAnimation);
  }
}

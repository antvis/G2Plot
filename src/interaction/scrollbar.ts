import { BBox, Group } from '@antv/g';
import { ScrollBar } from '@antv/gui';
import { Scale } from '@antv/scale';
import { clamp, get, isEqual, map, throttle } from '@antv/util';
import ViewLayer from '../base/view-layer';
import { IScrollBarInteractionConfig } from '../interface/config';
import BaseInteraction from './base';
import { getDataByScaleRange } from './helper/data-range';

const DEFAULT_PADDING: number = 4;
const DEFAULT_SIZE: number = 8;
const DEFAULT_CATEGORY_SIZE: number = 32;
const MIN_THUMB_LENGTH: number = 8;
const SCROLL_BAR_Z_INDEX: number = 999;

const getValidScrollBarConfig = (cfg: IScrollBarInteractionConfig = {}): Required<IScrollBarInteractionConfig> => {
  const _cfg: Required<IScrollBarInteractionConfig> = {
    type: 'horizontal',
    categorySize: DEFAULT_CATEGORY_SIZE,
    width: DEFAULT_SIZE,
    height: DEFAULT_SIZE,
    padding: [0, 0, 0, 0],
    ...cfg,
  };

  // default padding
  if (!cfg.padding) {
    _cfg.padding =
      _cfg.type === 'horizontal' ? [DEFAULT_PADDING, 0, DEFAULT_PADDING, 0] : [0, DEFAULT_PADDING, 0, DEFAULT_PADDING];
  }

  return _cfg;
};

export default class ScrollBarInteraction extends BaseInteraction {
  public static getInteractionRange(layerRange: BBox, interaction: IScrollBarInteractionConfig) {
    const config: Required<IScrollBarInteractionConfig> = getValidScrollBarConfig(interaction);
    const [paddingTop, paddingRight, paddingBottom, paddingLeft] = config.padding;

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
  private scrollBar: ScrollBar;
  private cnt: number;
  private step: number;
  private xScaleCfg: {
    field: string;
    values: string[];
  };
  private yScalesCfg: Array<{
    field: string;
    type: string;
    min: number;
    max: number;
    ticks: number[];
    formatter: any;
  }>;
  private ratio: number;
  private thumbOffset: number;
  private trackLen: number;
  private thumbLen: number;
  private onChangeFn = throttle(this.onChange.bind(this), 20, {
    leading: true,
  });

  protected render(): void {
    const view = this.view;
    this.ratio = 0;
    this.thumbOffset = 0;
    view.on('afterrender', () => {
      const padding = this.view.get('padding');
      // if we're not in `auto padding` process
      if (!isEqual([0, 0, 0, 0], padding)) {
        if (!this.trackLen) {
          this.measureScrollBar();
          this.changeViewData(this.getScrollRange());
        } else {
          this.renderScrollbar();
        }
      }
    });
  }

  protected clear(): void {
    if (this.scrollBar) {
      this.scrollBar.destroy();
      this.scrollBar = null;
    }
    if (this.container) {
      this.container.remove(true);
      this.container = null;
    }
    this.trackLen = null;
    this.thumbLen = null;
  }

  private renderScrollbar(): void {
    const config: Required<IScrollBarInteractionConfig> = getValidScrollBarConfig(this.getInteractionConfig());
    const range: BBox = this.getRange();
    const isHorizontal = config.type !== 'vertical';
    const panelRange: BBox = this.view.get('panelRange');
    const [paddingTop, , , paddingLeft] = config.padding;
    const position = isHorizontal
      ? { x: panelRange.minX + paddingLeft, y: range.tl.y + paddingTop }
      : { x: range.tl.x + paddingLeft, y: panelRange.minY + paddingTop };

    if (!this.scrollBar) {
      this.container = this.canvas.addGroup();
      this.scrollBar = new ScrollBar({
        isHorizontal,
        trackLen: this.trackLen,
        thumbLen: this.thumbLen,
        position,
        thumbOffset: this.ratio * this.trackLen,
      });
      this.container.add(this.scrollBar);
      this.scrollBar.set('zIndex', SCROLL_BAR_Z_INDEX);
      this.scrollBar.on('scrollchange', this.onChangeFn);
    } else {
      this.scrollBar.updateTrackLen(this.trackLen);
      this.scrollBar.updateThumbLen(this.thumbLen);
      this.scrollBar.updateScrollBarPos(position);
      this.scrollBar.updateThumbOffset(this.thumbOffset);
    }
  }

  private measureScrollBar(): void {
    const config: Required<IScrollBarInteractionConfig> = getValidScrollBarConfig(this.getInteractionConfig());
    const [paddingTop, paddingRight, paddingBottom, paddingLeft] = config.padding;
    const isHorizontal: boolean = config.type !== 'vertical';
    const panelRange: BBox = this.view.get('panelRange');
    const xScale: Scale = this.view.getXScale();
    const yScales: Scale[] = this.view.getYScales();

    this.cnt = xScale.values.length;
    this.xScaleCfg = { field: xScale.field, values: xScale.values || [] };
    this.yScalesCfg = map(yScales, (item) => ({
      field: item.field,
      type: item.type,
      min: item.min,
      max: item.max,
      ticks: item.ticks,
      formatter: item.formatter,
    }));
    this.step = Math.floor((isHorizontal ? panelRange.width : panelRange.height) / config.categorySize);
    this.trackLen = isHorizontal
      ? panelRange.width - paddingLeft - paddingRight
      : panelRange.height - paddingTop - paddingBottom;
    this.thumbLen = Math.max(this.trackLen * clamp(this.step / xScale.values.length, 0, 1), MIN_THUMB_LENGTH);
  }

  private getScrollRange(): [number, number] {
    const startIdx: number = Math.floor((this.cnt - this.step) * this.ratio);
    const endIdx: number = startIdx + this.step;

    return [startIdx, endIdx];
  }

  private changeViewData([startIdx, endIdx]: [number, number]): void {
    const viewLayer: ViewLayer = this.getViewLayer();
    const { meta } = viewLayer.options;
    const origData: object[] = viewLayer.getData();
    const newData: object[] = getDataByScaleRange(this.xScaleCfg.field, this.xScaleCfg.values, origData, [
      startIdx,
      endIdx,
    ]);

    // ScrollBar在滚动过程中保持Y轴上scale配置: min/max/ticks
    this.yScalesCfg.forEach((cfg) => {
      const metaCfg = get(meta, cfg.field) || {};
      this.view.scale(cfg.field, {
        formatter: cfg.formatter,
        ...metaCfg,
        type: cfg.type as 'linear' | 'cat' | 'log' | 'pow' | 'identity' | 'time',
        min: cfg.min,
        max: cfg.max,
      });
    });
    this.view.set('data', newData);
    this.view.repaint();
  }

  private onChange({ ratio, thumbOffset }: { ratio: number; thumbOffset: number }): void {
    this.ratio = ratio;
    this.thumbOffset = thumbOffset;

    const origAnimation = this.view.get('animation');
    this.view.animate(false);
    this.changeViewData(this.getScrollRange());
    this.view.animate(origAnimation);
  }
}

import { throttle, uniq, isEqual, set } from '@antv/util';
import { IGroup } from '@antv/g-base';
import BaseInteraction from './base';
import { ITimeLineInteractionConfig } from '../interface/config';
import BBox from '../util/bbox';
import TimeLine from '../components/timeline';

const DEFAULT_HEIGHT = 40;

function getValidTimeLineConfig(interaction: ITimeLineInteractionConfig): Required<ITimeLineInteractionConfig> {
  return {
    loop: false,
    auto: true,
    height: DEFAULT_HEIGHT,
    padding: [0, 20, 0, 0],
    speed: 2,
    ...interaction,
  };
}

export default class TimeLineInteraction extends BaseInteraction {
  private timeline: TimeLine;
  private container: IGroup;
  private onChangeFn: (tick: string) => void = throttle(this.onChange.bind(this), 20, { leading: true }) as (
    tick: string
  ) => void;
  private config: ITimeLineInteractionConfig;
  private originAnimation: any;
  private timeLineConfig: any;
  private firstRender: boolean;

  /** TimeLineInteraction new 时的范围参数 interactionRange */
  public static getInteractionRange(layerRange: BBox, interaction: ITimeLineInteractionConfig): BBox {
    const config: ITimeLineInteractionConfig = getValidTimeLineConfig(interaction);
    const [paddingTop, paddingRight, paddingBottom, paddingLeft] = config.padding;

    return new BBox(
      layerRange.minX,
      layerRange.maxY - config.height - paddingTop - paddingBottom,
      layerRange.width,
      config.height + paddingTop + paddingBottom
    );
  }

  private setAnimate(isAnimate: boolean) {
    const geometries = this.view.geometries;
    this.view.animate(isAnimate);
    geometries.forEach((geom) => {
      geom.animate(isAnimate);
    });
  }

  private renderTimeLine() {
    this.config = getValidTimeLineConfig(this.getInteractionConfig() as ITimeLineInteractionConfig);

    const viewRange = this.view.viewBBox;
    const { loop, padding, speed } = this.config;
    const [paddingTop, paddingRight, paddingBottom, paddingLeft] = padding;
    const range = this.getRange();

    const ticks = this.getTicks();
    const width = viewRange.width - paddingLeft - paddingRight;
    const timeLineConfig = {
      x: viewRange.minX + paddingLeft,
      y: range.tl.y + paddingTop,
      width,
      height: range.height - paddingTop - paddingBottom,
      loop,
      ticks,
      speed,
      defaultCurrentTick: ticks[0],
    };

    if (this.timeline) {
      if (!isEqual(timeLineConfig, this.timeLineConfig)) {
        this.timeline.update(timeLineConfig);
        this.timeLineConfig = timeLineConfig;
      }
    } else {
      this.container = this.canvas.addGroup();

      this.timeline = new TimeLine(timeLineConfig);
      this.timeline.on('timelinestart', () => {
        this.originAnimation = this.view.getOptions().animate;
        this.setAnimate(true);
      });
      this.timeline.on('timelineend', () => {
        this.setAnimate(this.originAnimation);
      });
      this.timeline.on('timelinechange', this.onChangeFn);
      this.timeline.on('timelineupdate', this.onChange.bind(this));
      this.container.add(this.timeline);
      this.view.changeData(this.getFilterData(ticks[0]));
      this.timeLineConfig = timeLineConfig;
    }
  }

  private onChange(tick: string) {
    const filterData = this.getFilterData(tick);
    this.view.changeData(filterData);
  }

  private getFilterData(tick: string) {
    const { field } = this.config;
    const { data } = this.getViewLayer().options;
    return data.filter((item) => item[field] === tick);
  }

  private getTicks() {
    const { field } = this.config;
    const { data } = this.getViewLayer().options;
    return uniq(data.map((item) => item[field]));
  }

  /** 渲染 timeline */
  protected render(): void {
    this.firstRender = true;
    this.view.on('beforerender', () => {
      this.renderTimeLine();
    });
    this.view.on('afterrender', () => {
      if (this.config.auto && this.firstRender) {
        this.timeline.isPlay = true;
        this.timeline.changePlayStatus();
      }
      this.firstRender = false;
    });
  }

  protected clear(): void {
    if (this.timeline) {
      this.timeline.destroy();
      this.timeline = null;
    }
    if (this.container) {
      this.container.remove(true);
      this.container = null;
    }
  }
}

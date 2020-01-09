import * as _ from '@antv/util';
import { BBox, Group } from '@antv/g';
import { TimeLine } from '@antv/gui';
import BaseInteraction from './base';
import { ITimeLineInteractionConfig } from '../interface/config';

const DEFAULT_HEIGHT = 40;

function getValidTimeLineConfig(interaction: ITimeLineInteractionConfig): Required<ITimeLineInteractionConfig> {
  return {
    loop: false,
    height: DEFAULT_HEIGHT,
    padding: [0, 20, 0, 0],
    speed: 0.5,
    ...interaction,
  };
}

export default class TimeLineInteraction extends BaseInteraction {
  private timeline: TimeLine;
  private container: Group;
  private onChangeFn: (tick: string) => void = _.throttle(this.onChange.bind(this), 20, { leading: true }) as (
    tick: string
  ) => void;
  private config: ITimeLineInteractionConfig;
  private origAnimation: any;
  private timeLineConfig: any;

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

  private renderTimeLine() {
    this.config = getValidTimeLineConfig(this.getInteractionConfig() as ITimeLineInteractionConfig);

    const viewRange: BBox = this.view.get('viewRange');
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
      if (!_.isEqual(timeLineConfig, this.timeLineConfig)) {
        this.timeline.update(timeLineConfig);
        this.timeLineConfig = timeLineConfig;
      }
    } else {
      this.container = this.canvas.addGroup();

      this.timeline = new TimeLine(timeLineConfig);
      this.timeline.on('timelinestart', () => {
        this.origAnimation = this.view.get('animation');
        this.view.animate(false);
      });
      this.timeline.on('timelineend', () => {
        this.view.animate(this.origAnimation);
      });
      this.timeline.on('timelinechange', this.onChangeFn);
      this.container.add(this.timeline);
      this.view.set('data', this.getFilterData(ticks[0]));
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
    return _.uniq(data.map((item) => item[field]));
  }

  /** 渲染 timeline */
  protected render(): void {
    this.view.on('beforerender', () => {
      this.renderTimeLine();
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

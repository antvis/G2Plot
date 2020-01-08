import * as _ from '@antv/util';
import { BBox, Group } from '@antv/g';
import { PlayLine } from '@antv/gui';
import BaseInteraction from './base';
import { IPlayLineInteractionConfig } from '../interface/config';

const DEFAULT_HEIGHT = 40;

function getValidPlayLineConfig(interaction: IPlayLineInteractionConfig): Required<IPlayLineInteractionConfig> {
  return {
    loop: false,
    height: DEFAULT_HEIGHT,
    padding: [0, 20, 0, 0],
    speed: 0.5,
    ...interaction,
  };
}

export default class PlayLineInteraction extends BaseInteraction {
  private playline: PlayLine;
  private container: Group;
  private onChangeFn: (tick: string) => void = _.throttle(this.onChange.bind(this), 20, { leading: true }) as (
    tick: string
  ) => void;
  private config: IPlayLineInteractionConfig;
  private origAnimation: any;
  private playLineConfig: any;

  /** PlayLineInteraction new 时的范围参数 interactionRange */
  public static getInteractionRange(layerRange: BBox, interaction: IPlayLineInteractionConfig): BBox {
    const config: IPlayLineInteractionConfig = getValidPlayLineConfig(interaction);
    const [paddingTop, paddingRight, paddingBottom, paddingLeft] = config.padding;

    return new BBox(
      layerRange.minX,
      layerRange.maxY - config.height - paddingTop - paddingBottom,
      layerRange.width,
      config.height + paddingTop + paddingBottom
    );
  }

  private renderPlayLine() {
    this.config = getValidPlayLineConfig(this.getInteractionConfig() as IPlayLineInteractionConfig);

    const viewRange: BBox = this.view.get('viewRange');
    const { loop, padding, speed } = this.config;
    const [paddingTop, paddingRight, paddingBottom, paddingLeft] = padding;
    const range = this.getRange();

    const ticks = this.getTicks();
    const width = viewRange.width - paddingLeft - paddingRight;
    const playLineConfig = {
      x: viewRange.minX + paddingLeft,
      y: range.tl.y + paddingTop,
      width,
      height: range.height - paddingTop - paddingBottom,
      loop,
      ticks,
      speed,
      defaultCurrentTick: ticks[0],
    };

    if (this.playline) {
      if (!_.isEqual(playLineConfig, this.playLineConfig)) {
        this.playline.update(playLineConfig);
        this.playLineConfig = playLineConfig;
      }
    } else {
      this.container = this.canvas.addGroup();

      this.playline = new PlayLine(playLineConfig);
      this.playline.on('playlinestart', () => {
        this.origAnimation = this.view.get('animation');
        this.view.animate(false);
      });
      this.playline.on('playlineend', () => {
        this.view.animate(this.origAnimation);
      });
      this.playline.on('playlinechange', this.onChangeFn);
      this.container.add(this.playline);
      this.view.set('data', this.getFilterData(ticks[0]));
      this.playLineConfig = playLineConfig;
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

  /** 渲染 playline */
  protected render(): void {
    this.view.on('beforerender', () => {
      this.renderPlayLine();
    });
  }

  protected clear(): void {
    if (this.playline) {
      this.playline.destroy();
      this.playline = null;
    }
    if (this.container) {
      this.container.remove(true);
      this.container = null;
    }
  }
}

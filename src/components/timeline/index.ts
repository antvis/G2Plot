/**
 * @file 基于 G 的播放轴组件
 * @author blackganglion
 */

import { IShape, Event, IGroup } from '@antv/g-base';
import { deepMix, findIndex, get } from '@antv/util';
import Button from './button';
import BaseComponent, { BaseComponentConfig } from '../base';

const TIMELINE_START = 'timelinestart';
const TIMELINE_CHANGE = 'timelinechange';
const TIMELINE_END = 'timelineend';
const TIMELINE_UPDATE = 'timelineupdate';

const PADDING_LEFT = 20;
const PADDING_RIGHT = 20;

/** 播放轴配置项 */
interface TimeLineCfg extends BaseComponentConfig {
  /** 播放轴位置数据 */
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  /** 刻度值 */
  readonly ticks: string[];
  /** 播放速度，1 个 tick 花费时间 */
  readonly speed?: number;
  /** 默认当前刻度值 */
  readonly defaultCurrentTick?: string;
  /** 是否循环播放 */
  readonly loop?: boolean;
}

/**
 * 参考示例
 * https://www.gapminder.org/tools/#$state$time$value=1870&delay:100;;&chart-type=bubbles
 */
export default class TimeLine extends BaseComponent<TimeLineCfg> {
  /** 是否处于播放状态 */
  public isPlay: boolean;
  /** 当前处于刻度值 */
  private currentTick: string;
  /** 刻度位置预处理 */
  private tickPosList: number[];

  /** 组件 */
  private timeLineButton: Button;
  private timeLine: {
    x: number;
    y: number;
    width: number;
    height: number;
    shape: IShape;
    textList: IShape[];
  };
  private timeSelect: IShape;
  private timeSelectText: IShape;

  /** 偏移量 */
  private prevX: number;

  /** 动画 id */
  private playHandler: number;

  constructor(cfg: TimeLineCfg) {
    super(
      deepMix(
        {},
        {
          speed: 1,
          loop: false,
        },
        cfg
      )
    );
  }

  protected renderInner(group: IGroup) {
    const { ticks, defaultCurrentTick } = this.config;

    if (ticks && ticks.length) {
      this.currentTick = this.config.ticks.includes(defaultCurrentTick) ? defaultCurrentTick : ticks[0];
      this.renderPlayButton(group);
      this.renderTimeLine(group);
      this.renderTimeSelect(group, this.currentTick);
      this.initEvent();
    }
  }

  // 更新配置
  public update(cfg: Partial<TimeLineCfg>) {
    super.update(cfg);
    // 更新时需要触发一次，来过滤数据
    this.emit(TIMELINE_UPDATE, this.currentTick);
  }

  public destroy() {
    super.destroy();
    this.timeLineButton.destroy();
    this.timeLineButton.off();
    this.timeSelect.off();
    if (this.playHandler) {
      window.cancelAnimationFrame(this.playHandler);
    }
  }

  private renderPlayButton(group: IGroup) {
    const { height, x, y } = this.config;
    const ratio = 0.8;
    const r = (height / 2) * ratio;
    if (this.timeLineButton) {
      this.timeLineButton.update({
        x: x + r,
        y: y + r + (height * (1 - ratio)) / 2,
        r,
      });
    } else {
      this.timeLineButton = new Button({
        container: group,
        x: x + r,
        y: y + r + (height * (1 - ratio)) / 2,
        r,
        isPlay: this.isPlay,
      });
      this.timeLineButton.init();
    }
    this.timeLineButton.render();
  }

  private getTimeLinePath() {
    const { x, y, width, height } = this.timeLine;
    const r = height / 2;

    if (width > 0) {
      return (
        `M${x}, ${y}` +
        `A${r},${r} 90 0,0 ${x},${y + height}` +
        `L${x + width}, ${y + height}` +
        `A${r},${r} 90 0,0 ${x + width},${y}` +
        `L${x}, ${y}`
      );
    }

    return [];
  }

  private renderTimeLine(group: IGroup) {
    const { width, height, ticks, x, y } = this.config;

    if (!this.timeLine) {
      this.timeLine = {} as any;
    }

    /** 默认高度是真实高度 15% */
    this.timeLine.height = height * 0.15;
    this.timeLine.x = x + height + PADDING_LEFT;
    this.timeLine.y = y + (height / 2 - this.timeLine.height / 2);
    this.timeLine.width = width - this.timeLine.x - PADDING_RIGHT;

    if (this.timeLine && this.timeLine.shape) {
      this.timeLine.shape.attr('path', this.getTimeLinePath());
    } else {
      this.timeLine.shape = group.addShape('path', {
        attrs: {
          path: this.getTimeLinePath(),
          fill: '#607889',
          opacity: 0.2,
        },
      });
    }

    const interval = this.timeLine.width / (ticks.length - 1);
    this.tickPosList = [];
    if (this.timeLine.textList && this.timeLine.textList.length) {
      this.timeLine.textList.forEach((text) => {
        text.destroy();
      });
    }
    let lastX = -Infinity;
    this.timeLine.textList = ticks.map((tick, index) => {
      this.tickPosList.push(this.timeLine.x + index * interval);

      const text = group.addShape('text', {
        attrs: {
          x: this.timeLine.x + index * interval,
          y: this.timeLine.y + this.timeLine.height + 5,
          text: tick,
          textAlign: 'center',
          textBaseline: 'top',
          fill: '#607889',
          opacity: 0.35,
        },
      });

      const bbox = text.getBBox();

      // 抽样，标签与标签间距不小于 10
      if (bbox.minX > lastX) {
        text.show();
        lastX = bbox.minX + bbox.width + 10;
      } else {
        text.hide();
      }

      return text;
    });
  }

  private renderTimeSelect(group: IGroup, tickValue: string) {
    const { ticks, height } = this.config;
    const interval = this.timeLine.width / (ticks.length - 1);
    const index = findIndex(ticks, (tick) => tick === tickValue);
    const x = this.timeLine.x + index * interval;
    const y = this.config.y + height / 2;
    const r = height * 0.15;

    if (this.timeSelect) {
      this.timeSelect.attr('x', x);
      this.timeSelect.attr('y', y);
      this.timeSelect.attr('r', r);
    } else {
      this.timeSelect = group.addShape('circle', {
        attrs: {
          x,
          y,
          r,
          fill: '#607889',
        },
      });
    }

    if (this.timeSelectText) {
      this.timeSelectText.attr('x', x);
      this.timeSelectText.attr('y', y - height * 0.15 - 14);
      this.timeSelectText.attr('text', this.currentTick);
    } else {
      this.timeSelectText = group.addShape('text', {
        attrs: {
          x,
          y: y - height * 0.15 - 14,
          text: this.currentTick,
          textAlign: 'center',
          textBaseline: 'top',
          fill: '#607889',
        },
      });
    }
  }

  /** 输入当前圆点位置，输出离哪个 tick 的位置最近 */
  private adjustTickIndex(timeSelectX: number) {
    for (let i = 0; i < this.tickPosList.length - 1; i++) {
      if (this.tickPosList[i] <= timeSelectX && timeSelectX <= this.tickPosList[i + 1]) {
        return Math.abs(this.tickPosList[i] - timeSelectX) < Math.abs(timeSelectX - this.tickPosList[i + 1])
          ? i
          : i + 1;
      }
    }
  }

  /** 拖动或自动播放过程中，设置 TimeSelect 的位置 */
  private setTimeSelectX(offsetX: number) {
    let timeSelectX = this.timeSelect.attr('x') + offsetX;
    // 防止左右溢出
    if (timeSelectX < this.timeLine.x) {
      timeSelectX = this.timeLine.x;
    }
    if (timeSelectX > this.timeLine.x + this.timeLine.width) {
      timeSelectX = this.timeLine.x + this.timeLine.width;
      // 正在播放场景
      if (this.isPlay) {
        // 如果是循环
        if (this.config.loop) {
          // 当前滑动点已经处于最后一个 tick 上，才能重置回去，继续循环
          if (this.timeSelect.attr('x') === this.timeLine.x + this.timeLine.width) {
            timeSelectX = this.timeLine.x;
          }
        } else {
          this.isPlay = false;
          this.changePlayStatus();
        }
      }
    }
    this.timeSelect.attr('x', timeSelectX);
    this.timeSelectText.attr('x', timeSelectX);

    const index = this.adjustTickIndex(timeSelectX);
    if (this.currentTick !== this.config.ticks[index]) {
      this.currentTick = this.config.ticks[index];
      this.timeSelectText.attr('text', this.currentTick);
      this.emit(TIMELINE_CHANGE, this.currentTick);
    }

    this.getCanvas().draw();
  }

  /** 同步圆点到 currnentTick */
  private syncCurrnentTick() {
    const { ticks } = this.config;
    const interval = this.timeLine.width / (ticks.length - 1);
    const index = findIndex(ticks, (tick) => tick === this.currentTick);
    const x = this.timeLine.x + index * interval;
    this.timeSelect.attr('x', x);
    this.timeSelectText.attr('x', x);
    this.getCanvas().draw();
  }

  private onTimeSelectMouseMove = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    const x = get(e, 'touches.0.pageX', e.pageX);
    const offsetX = x - this.prevX;

    this.setTimeSelectX(offsetX);

    this.prevX = x;
  };

  private onTimeSelectMouseUp = () => {
    this.syncCurrnentTick();

    this.emit(TIMELINE_END, null);

    // 取消事件
    const containerDOM = this.getCanvas().get('container');
    if (containerDOM) {
      containerDOM.removeEventListener('mousemove', this.onTimeSelectMouseMove);
      containerDOM.removeEventListener('mouseup', this.onTimeSelectMouseUp);
      // 防止滑动到 canvas 外部之后，状态丢失
      containerDOM.removeEventListener('mouseleave', this.onTimeSelectMouseUp);
      // 移动端事件
      containerDOM.removeEventListener('touchmove', this.onTimeSelectMouseMove);
      containerDOM.removeEventListener('touchend', this.onTimeSelectMouseUp);
      containerDOM.removeEventListener('touchcancel', this.onTimeSelectMouseUp);
    }
  };

  private onTimeSelectMouseDown = (e: Event) => {
    // 取出原生事件
    const event = e.originalEvent as MouseEvent;

    event.stopPropagation();
    event.preventDefault();

    if (this.isPlay === false) {
      this.emit(TIMELINE_START, null);
    } else {
      // 取消播放状态
      this.isPlay = false;
      // 拖动过程中的播放暂停不需要调整 tick 位置，防止偏移
      this.changePlayStatus(false);
    }

    this.prevX = get(event, 'touches.0.pageX', event.pageX);

    // 开始滑动的时候，绑定 move 和 up 事件
    const containerDOM = this.getCanvas().get('container');
    containerDOM.addEventListener('mousemove', this.onTimeSelectMouseMove);
    containerDOM.addEventListener('mouseup', this.onTimeSelectMouseUp);
    containerDOM.addEventListener('mouseleave', this.onTimeSelectMouseUp);
    // 移动端事件
    containerDOM.addEventListener('touchmove', this.onTimeSelectMouseMove);
    containerDOM.addEventListener('touchend', this.onTimeSelectMouseUp);
    containerDOM.addEventListener('touchcancel', this.onTimeSelectMouseUp);
  };

  private startPlay() {
    return window.requestAnimationFrame(() => {
      const { speed, ticks } = this.config;
      const { width } = this.timeLine;

      const tickInterval = width / ticks.length;
      const offsetX = tickInterval / ((speed * 1000) / 60);

      this.setTimeSelectX(offsetX);

      if (this.isPlay) {
        this.playHandler = this.startPlay();
      }
    });
  }

  public changePlayStatus(isSync = true) {
    this.timeLineButton.update({
      isPlay: this.isPlay,
    });
    if (this.isPlay) {
      // 开始播放
      this.playHandler = this.startPlay();
      this.emit(TIMELINE_START, null);
    } else {
      // 结束播放
      if (this.playHandler) {
        window.cancelAnimationFrame(this.playHandler);
        if (isSync) {
          this.syncCurrnentTick();
          this.emit(TIMELINE_END, null);
        }
      }
    }
    this.getCanvas().draw();
  }

  private initEvent() {
    /** 播放/暂停事件 */
    this.timeLineButton.off('click');
    this.timeLineButton.on('click', () => {
      this.isPlay = !this.isPlay;
      this.changePlayStatus();
    });

    /** 播放轴上圆点滑动事件 */
    this.timeSelect.off('mousedown');
    this.timeSelect.on('mousedown', (event) => {
      this.onTimeSelectMouseDown(event);
    });
  }
}

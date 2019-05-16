import { Group, Canvas } from '@antv/g';
import { View, Scale } from '@antv/g2';
import * as _ from '@antv/util';
import moment from 'moment';

const LINEHEIGHT = 24;

export default class TimeGroupAnnotation {
  private view: View;
  private scale: Scale;
  private field: string;
  private min: any;
  private max: any;
  private dateFormater: any;
  private groupDim: 'week' | 'month' | 'year';
  private intervals: any[];
  private texts: any[];
  private container: Group;
  private canvas: Canvas;
  private lineStyle: {
    stroke: '#ccc',
    lineWidth: 1,
  };

  constructor(cfg) {
    this.view = cfg.view;
    this.groupDim = cfg.groupDim;
    this.field = cfg.field;
    this._init();
  }

  private _init() {
    this.view.on('beforerender', () => {
      this.clear();
    });

    this.view.on('afterrender', () => {
      this.draw();
    });
  }

  public draw() {
    this.canvas = this.view.get('canvas');
    const parentContainer = this.view.get('frontgroundGroup');
    this.container = parentContainer.addGroup();
    this.scale = this.view.get('scales')[this.field];
    this.dateFormater = 'YYYY-MM-DD';
    this.min = this.scale.min;
    this.max = this.scale.max;
    if (this.groupDim === 'week') {
      const outcome = this._getMonthIntervals();
      this.intervals = outcome.intervals;
      this.texts = outcome.texts;
    } else if (this.groupDim === 'month') {
      const outcome = this._getMonthIntervals();
      this.intervals = outcome.intervals;
      this.texts = outcome.texts;
    } else if (this.groupDim === 'year') {
      const outcome = this._getYearIntervals();
      this.intervals = outcome.intervals;
      this.texts = outcome.texts;
    }
    this._drawLines();
    this._drawTexts();
    this._adjustPosition();
    this.canvas.draw();
  }

  public clear() {
    this.container && this.container.clear();
  }

  private _getWeekIntervals() {
    const intervals = [];
    const texts = [];
    const weekOfday = moment(this.min).format('E');
    let privious_day = this.min;
    let last_sunday;
    let count = 1;
    if (weekOfday === '7') {
      last_sunday = weekOfday;
    } else {
      last_sunday = moment(this.min).add(7 - parseInt(weekOfday, 10), 'days');
    }
    while (last_sunday < this.max) {
      let middle: number | string = privious_day + (last_sunday - privious_day) / 2;
      middle = moment(middle).format(this.dateFormater);
      texts.push({ value: middle, text: `第${count}周` });
      intervals.push(last_sunday.format(this.dateFormater));
      privious_day = last_sunday;
      last_sunday = moment(last_sunday).add(7, 'days');
      count++;
    }
    let middle: number | string = privious_day + (this.max - privious_day) / 2;
    middle = moment(middle).format(this.dateFormater);
    texts.push({ value: middle, text: `第${count}周` });

    return { intervals, texts };
  }

  private _getMonthIntervals() {
    const intervals = [];
    const texts = [];
    let last_month = moment(this.min).get('month');
    let last_month_day = moment(this.min).endOf('month');
    let previous_month_day = moment(this.min);
    while (last_month_day < this.max) {
      const middle:moment.Moment | string = previous_month_day.add(last_month_day.diff(previous_month_day) / 2);
      texts.push({ value: middle, text: `${(last_month + 1)}月` });
      intervals.push(last_month_day.format(this.dateFormater));
      previous_month_day = last_month_day;
      const tempo = moment(last_month_day).add(1, 'days');
      last_month = moment(tempo).get('month');
      last_month_day = moment(tempo).endOf('month');
    }
    let middle:moment.Moment | string = previous_month_day.add(moment(this.max).diff(previous_month_day) / 2);
    middle = moment(middle).format(this.dateFormater);
    texts.push({ value: middle, text: `${(last_month + 1)}月` });

    return { intervals, texts };
  }

  private _getYearIntervals() {
    const intervals = [];
    const texts = [];
    let last_year = moment(this.min).get('year');
    let last_year_day = moment(this.min).endOf('year');
    let previous_year_day = moment(this.min);
    while (last_year_day < this.max) {
      const middle:moment.Moment | string = previous_year_day.add(last_year_day.diff(previous_year_day) / 2);
      texts.push({ value: middle, text: `${last_year}年` });
      intervals.push(last_year_day.format(this.dateFormater));
      previous_year_day = last_year_day;
      const tempo = moment(last_year_day).add(1, 'days');
      last_year = moment(tempo).get('year');
      last_year_day = moment(tempo).endOf('year');
    }
    let middle:moment.Moment | string = previous_year_day.add(moment(this.max).diff(previous_year_day) / 2);
    middle = moment(middle).format(this.dateFormater);
    texts.push({ value: middle, text: `${last_year}年` });

    return { intervals, texts };
  }

  private _drawLines() {
    const intervals = this.intervals;
    _.each(intervals, (i) => {
      const percent = this.scale.scale(i);
      const point = this._getPointByPercent(percent, 'x');
      this.container.addShape('line', {
        attrs:{
          x1: point,
          y1: 0,
          x2: point,
          y2: LINEHEIGHT,
          stroke:'#ccc',
          lineWidth: 1,
        },
      });
    });
  }

  private _drawTexts() {
    const texts = this.texts;
    _.each(texts, (i) => {
      const percent = this.scale.scale(i.value);
      const point = this._getPointByPercent(percent, 'x');
      this.container.addShape('text', {
        name: 'axis-label',
        attrs:{
          x: point,
          y: LINEHEIGHT,
          text: i.text,
          fill:'#ccc',
          fontSize:12,
          textAlign:'center',
          textBaseline:'bottom',
        },
      });
    });
  }

  private _getPointByPercent(percent, dim) {
    const coord = this.view.get('coord');
    const { start, end } = coord;
    const topLeft = {
      x: Math.min(start.x, end.x),
      y: Math.min(start.y, end.y),
    };
    if (dim === 'x') {
      return coord.width * percent + topLeft.x;
    }
    return coord.height * percent + topLeft.y;

  }

  private _adjustPosition() {
    const coord = this.view.get('coord');
    const { start, end } = coord;
    const bottomLeft = {
      x: Math.min(start.x, end.x),
      y: Math.max(start.y, end.y),
    };
    const xAxisGroup = this.view.get('axisController').axes[0].get('group');
    const bbox = xAxisGroup.getBBox();
    const y = bottomLeft.y + bbox.height;
    this.container.translate(0, bbox.maxY);
  }

}

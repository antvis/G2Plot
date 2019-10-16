import * as _ from '@antv/util';
import * as Fecha from 'fecha';
import moment from 'moment';

const fecha = Fecha as any;

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const MONTH = 30 * DAY;
const YEAR = 365 * DAY;

interface TimeStringAbbrevaiteCfg {
  keep?: string[];
}

export default function datetimeStringAbbrevaite(shape, option: TimeStringAbbrevaiteCfg, index, cfg) {
  const nodes = cfg.nodes.nodes;
  let campareText;
  if (index === nodes.length - 1) {
    campareText = nodes[index - 1].shape.get('origin').text;
  } else {
    campareText = nodes[index + 1].shape.get('origin').text;
  }
  const compare = new Date(campareText);
  /** 获取时间周期和时间间隔 */
  const text = shape.get('origin').text;
  const current = new Date(text);
  const startText = nodes[0].shape.get('origin').text;
  const start = new Date(startText);
  const endText = nodes[nodes.length - 1].shape.get('origin').text;
  const end = new Date(endText);
  const timeDuration = getDateTimeMode(start, end);
  const timeCycle = getDateTimeMode(current, compare); // time frequency
  // 如果duration和frequency在同一区间
  if (timeDuration === timeCycle) {
    if (index !== 0 && index !== nodes.length - 1) {
      const formatter = sameSectionFormatter(timeDuration);
      shape.attr('text', fecha.format(current, formatter));
    }
    return;
  }
  if (index !== 0) {
    const previousText = nodes[index - 1].shape.get('origin').text;
    const previous = new Date(previousText);
    const isAbbreviate = needAbbrevaite(timeDuration, current, previous);
    if (isAbbreviate) {
      const formatter = getAbbrevaiteFormatter(timeDuration, timeCycle);
      shape.attr('text', fecha.format(current, formatter));
      return;
    }
  }
}

function needAbbrevaite(mode, current, previous) {
  const currentStamp = getTime(current, mode);
  const previousStamp = getTime(previous, mode);
  if (currentStamp !== previousStamp) {
    return false;
  }
  return true;
}

function getDateTimeMode(a, b) {
  const dist = Math.abs(a - b);

  if (dist >= MINUTE && dist < HOUR) {
    return 'minute';
  }
  if (dist >= HOUR && dist < DAY) {
    return 'hour';
  }
  if (dist >= DAY && dist < MONTH) {
    return 'day';
  }
  if (dist >= MONTH && dist < YEAR) {
    return 'month';
  }
  if (dist >= YEAR) {
    return 'year';
  }
}

function getAbbrevaiteFormatter(duration, cycle) {
  const times = ['year', 'month', 'day', 'hour', 'minite'];
  const formatters = ['YYYY', 'MM', 'DD', 'HH', 'MM'];
  const startIndex = times.indexOf(duration) + 1;
  const endIndex = times.indexOf(cycle);
  let formatter = '';
  for (let i = startIndex; i <= endIndex; i++) {
    formatter += formatters[i];
    if (i < endIndex) {
      formatter += '-';
    }
  }
  return formatter;
}

function sameSectionFormatter(mode) {
  const times = ['year', 'month', 'day', 'hour', 'minite'];
  const formatters = ['YYYY', 'MM', 'DD', 'HH', 'MM'];
  const index = times.indexOf(mode);
  const formatter = formatters[index];
  return formatter;
}

function getTime(date, mode) {
  if (mode === 'year') {
    return date.getFullYear();
  }
  if (mode === 'month') {
    return date.getMonth() + 1;
  }
  if (mode === 'day') {
    return date.getDay() + 1;
  }

  if (mode === 'hour') {
    return date.getHours() + 1;
  }

  if (mode === 'minite') {
    return date.getMinites() + 1;
  }
}

/*tslint:disable*/
export function isTime(string) {
  const hourminExp = /^(?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]$/;
  const hourminSecExp = /^(?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]:[0-5][0-9]$/;
  return hourminExp.test(string) || hourminSecExp.test(string);
}

/*function timeAdaptor(string) {
  const hourminExp = /^(?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]$/;
  const hourminSecExp = /^(?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]:[0-5][0-9]$/;
  if (hourminExp.test(string)) {
    return moment(string, 'hh:mm');
  }
  if (hourminSecExp.test(string)) {
    return moment(string, 'hh:mm:ss');
  }
}*/

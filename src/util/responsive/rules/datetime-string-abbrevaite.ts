import * as _ from '@antv/util';
import fecha from 'fecha';

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const MONTH = 31 * DAY;
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
  let mode;
  const dist = Math.abs(a - b);
  const mapper = {
    minute: [MINUTE, HOUR],
    hour: [HOUR, DAY],
    day: [DAY, MONTH],
    month: [MONTH, YEAR],
    year: [YEAR, Infinity],
  };
  _.each(mapper, (range, key) => {
    if (dist >= range[0] && dist < range[1]) {
      mode = key;
    }
  });
  return mode;
}

function getAbbrevaiteFormatter(duration, cycle) {
  const times = ['year', 'month', 'day', 'hour', 'minute'];
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
  const times = ['year', 'month', 'day', 'hour', 'minute'];
  const formatters = ['YYYY', 'MM', 'DD', 'HH', 'MM'];
  const index = times.indexOf(mode);
  const formatter = formatters[index];
  return formatter;
}

function getTime(date: Date, mode: string) {
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

  if (mode === 'minute') {
    return date.getMinutes() + 1;
  }
}

/*tslint:disable*/
export function isTime(string) {
  const hourminExp = /^(?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]$/;
  const hourminSecExp = /^(?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]:[0-5][0-9]$/;
  return hourminExp.test(string) || hourminSecExp.test(string);
}

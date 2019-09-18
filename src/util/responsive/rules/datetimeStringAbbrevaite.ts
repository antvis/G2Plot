import * as _ from '@antv/util';
import moment from 'moment';

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
  const compare = isTime(campareText) ? timeAdaptor(campareText) : moment(campareText);
  /** 获取时间周期和时间间隔 */
  const text = shape.get('origin').text;
  const current = isTime(text) ? timeAdaptor(text) : moment(text);
  const startText = nodes[0].shape.get('origin').text;
  const start = isTime(startText) ? timeAdaptor(startText) : moment(startText);
  const endText = nodes[nodes.length - 1].shape.get('origin').text;
  const end = isTime(endText) ? timeAdaptor(endText) : moment(endText);
  const timeDuration = getDateTimeMode(start, end);
  const timeCycle = getDateTimeMode(current, compare); // time frequency
  // 如果duration和frequency在同一区间
  if (timeDuration === timeCycle) {
    if (index !== 0 && index !== nodes.length - 1) {
      const formatter = sameSectionFormatter(timeDuration);
      shape.attr('text', current.format(formatter));
    }
    return;
  }
  if (index !== 0) {
    const previousText = nodes[index - 1].shape.get('origin').text;
    const previous = isTime(previousText) ? timeAdaptor(previousText) : moment(previousText);
    const isAbbreviate = needAbbrevaite(timeDuration, current, previous);
    if (isAbbreviate) {
      const formatter = getAbbrevaiteFormatter(timeDuration, timeCycle);
      shape.attr('text', current.format(formatter));
      return;
    }
  }
}

function needAbbrevaite(mode, current, previous) {
  const currentStamp = current.get(mode);
  const previousStamp = previous.get(mode);
  if (currentStamp !== previousStamp) {
    return false;
  }
  return true;
}

function getDateTimeMode(a, b) {
  const dist = moment.duration(Math.abs(a.diff(b)));
  const oneMinute = moment.duration(1, 'minutes');
  const oneHour = moment.duration(1, 'hours');
  const oneDay = moment.duration(1, 'days');
  const oneMonth = moment.duration(1, 'months');
  const oneYear = moment.duration(1, 'years');
  if (dist >= oneMinute && dist < oneHour) {
    return 'minute';
  }
  if (dist >= oneHour && dist < oneDay) {
    return 'hour';
  }
  if (dist >= oneDay && dist < oneMonth) {
    return 'day';
  }
  if (dist >= oneMonth && dist < oneYear) {
    return 'month';
  }
  if (dist >= oneYear) {
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

/*tslint:disable*/
export function isTime(string) {
  const hourminExp = /^(?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]$/;
  const hourminSecExp = /^(?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]:[0-5][0-9]$/;
  return hourminExp.test(string) || hourminSecExp.test(string);
}

function timeAdaptor(string) {
  /** hh:mm hh:mm:ss 格式兼容 */
  const hourminExp = /^(?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]$/;
  const hourminSecExp = /^(?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]:[0-5][0-9]$/;
  if (hourminExp.test(string)) {
    return moment(string, 'hh:mm');
  }
  if (hourminSecExp.test(string)) {
    return moment(string, 'hh:mm:ss');
  }
}

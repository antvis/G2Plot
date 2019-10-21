import { timeIntervals } from '../interface/config';

function adjustTimeTickInterval(interval: string) {
  const intervals = timeIntervals;
  const intervalArr = interval.split(' ');
  const basicInterval = intervals[intervalArr[1]];
  const intervalCount = parseInt(intervalArr[0], 10);
  return [basicInterval.format, intervalCount * basicInterval.value];
}

const SCALE_MAP = {
  category: 'cat',
  value: 'linear',
  time: 'time',
};

export function extractScale(desScale, axisConfig) {
  if (!axisConfig) {
    return desScale;
  }

  if (axisConfig.hasOwnProperty('tickCount')) {
    desScale.tickCount = axisConfig.tickCount;
  }
  if (axisConfig.hasOwnProperty('type')) {
    // fixme: dateTime plot层处理
    if (axisConfig.type !== 'dateTime') {
      desScale.type = SCALE_MAP[axisConfig.type];
    }
  }
  if (axisConfig.hasOwnProperty('tickInterval')) {
    if (axisConfig.type === 'time') {
      desScale.tickInterval = adjustTimeTickInterval(axisConfig.tickInterval);
    } else {
      desScale.tickInterval = axisConfig.tickInterval;
    }
  }
  if (axisConfig.hasOwnProperty('min')) {
    desScale.min = axisConfig.min;
  }
  if (axisConfig.hasOwnProperty('max')) {
    desScale.max = axisConfig.max;
  }
  if (axisConfig.hasOwnProperty('minLimit')) {
    desScale.minLimit = axisConfig.minLimit;
  }
  if (axisConfig.hasOwnProperty('maxLimit')) {
    desScale.maxLimit = axisConfig.maxLimit;
  }
  if (axisConfig.hasOwnProperty('nice')) {
    desScale.nice = axisConfig.nice;
  }
  if (axisConfig.hasOwnProperty('formatter')) {
    desScale.formatter = axisConfig.formatter;
  }
}

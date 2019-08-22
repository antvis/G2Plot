import { timeIntervals } from '../interface/config';

function adjustTimeTickInterval(interval: string) {
  const intervals = timeIntervals;
  const intervalArr = interval.split(' ');
  const basicInterval = intervals[intervalArr[1]];
  const intervalCount = parseInt(intervalArr[0], 10);
  return [basicInterval.format, intervalCount * basicInterval.value];
}

export function extractScale(desScale, axisConfig) {
  if (!axisConfig) {
    return desScale;
  }

  if (axisConfig.hasOwnProperty('tickCount')) {
    desScale.tickCount = axisConfig.tickCount;
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
  if (axisConfig.hasOwnProperty('nice')) {
    desScale.nice = axisConfig.nice;
  }
}

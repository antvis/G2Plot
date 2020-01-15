import { isNil, some, isNumber, filter } from '@antv/util';
import { timeIntervals } from '../interface/config';
import { ScaleConfig } from '@antv/scale';

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

  if (Object.prototype.hasOwnProperty.call(axisConfig, 'tickCount')) {
    desScale.tickCount = axisConfig.tickCount;
  }
  if (Object.prototype.hasOwnProperty.call(axisConfig, 'type')) {
    // fixme: dateTime plot层处理
    if (axisConfig.type !== 'dateTime') {
      desScale.type = axisConfig.type;
    }
  }
  if (Object.prototype.hasOwnProperty.call(axisConfig, 'tickInterval')) {
    if (axisConfig.type === 'time') {
      desScale.tickInterval = adjustTimeTickInterval(axisConfig.tickInterval);
    } else {
      desScale.tickInterval = axisConfig.tickInterval;
    }
  }
  if (Object.prototype.hasOwnProperty.call(axisConfig, 'min')) {
    desScale.min = axisConfig.min;
  }
  if (Object.prototype.hasOwnProperty.call(axisConfig, 'max')) {
    desScale.max = axisConfig.max;
  }
  if (Object.prototype.hasOwnProperty.call(axisConfig, 'minLimit')) {
    desScale.minLimit = axisConfig.minLimit;
  }
  if (Object.prototype.hasOwnProperty.call(axisConfig, 'maxLimit')) {
    desScale.maxLimit = axisConfig.maxLimit;
  }
  if (Object.prototype.hasOwnProperty.call(axisConfig, 'nice')) {
    desScale.nice = axisConfig.nice;
  }
  if (Object.prototype.hasOwnProperty.call(axisConfig, 'exponent')) {
    desScale.exponent = axisConfig.exponent;
  }
  if (Object.prototype.hasOwnProperty.call(axisConfig, 'base')) {
    desScale.base = axisConfig.base;
  }
}

export function trySetScaleMinToZero(desScale: ScaleConfig, data: (number | string | undefined | null)[]) {
  const validData: number[] = filter(data, (v) => isNumber(v)) as number[];
  const min = Math.min(...validData);
  const max = Math.max(...validData);

  if (min > 0) {
    if (isNil(desScale.min) && isNil(desScale.minLimit)) {
      desScale.min = 0;
    }
  } else if (max <= 0) {
    if (isNil(desScale.max) && isNil(desScale.maxLimit)) {
      desScale.max = 0;
    }
  }
}

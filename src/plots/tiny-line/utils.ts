import { map } from '@antv/util';
import { TinyLineOptions } from './types';

export function getTinyLineData(data: TinyLineOptions['data']) {
  return map(data || [], (y: number, x: number) => {
    return { x, y };
  });
}

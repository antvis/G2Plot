import { map } from '@antv/util';

export function getTinyData(data: number[]) {
  return map(data || [], (y: number, x: number) => ({ x: `${x}`, y }));
}

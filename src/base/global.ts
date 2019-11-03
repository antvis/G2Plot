import * as _ from '@antv/util';
/** 所有统计图形 */
const GLOBAL_PLOT_MAP: Record<string, any> = {};

export function registerPlotType(name: string, ctr: any): void {
  GLOBAL_PLOT_MAP[name.toLowerCase()] = ctr;
}

export function getPlotType(name: string) {
  const plot = GLOBAL_PLOT_MAP[name.toLowerCase()];
  return plot;
}

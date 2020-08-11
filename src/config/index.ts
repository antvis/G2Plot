import { Options } from '../types';

export const DEFAULT_CONFIG: Partial<Options> = {
  renderer: 'canvas',
  tooltip: {
    shared: true,
    showCrosshairs: true,
    crosshairs: {
      type: 'x',
    },
    offset: 20,
  },
  xAxis: {
    nice: true,
    label: {
      autoRotate: true,
      autoHide: true,
    },
  },
  yAxis: {
    nice: true,
    label: {
      autoHide: true,
      autoRotate: false,
    },
  },
};

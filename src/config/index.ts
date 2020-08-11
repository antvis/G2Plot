import { Options } from '../types';

export const DEFAULT_CONFIG: Partial<Options> = {
  renderer: 'canvas',
  legend: {
    visible: true,
    position: 'bottom-center',
  },
  tooltip: {
    shared: true,
    showCrosshairs: true,
    crosshairs: {
      type: 'x',
    },
    offset: 20,
  },
  xAxis: {
    label: {
      autoRotate: true,
      autoHide: true,
    },
    title: {
      spacing: 12,
    },
  },
  yAxis: {
    label: {
      autoHide: true,
      autoRotate: false,
    },
    title: {
      autoRotate: true,
      spacing: 12,
    },
  },
};

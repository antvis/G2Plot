import { BiaxGeometry, LineConfig } from './types';
import { Axis } from '../../types/axis';
import { deepMix } from '@antv/util';
import { BiaxOption, AxisType } from './types';

export const DEFAULT_LINE_COLOR = {
  [AxisType.Left]: '#5B8FF9',
  [AxisType.Right]: '#e76c5e',
};

export const DEFAULT_YAXIS_CONFIG: Axis = {
  // colorMapping: true,
  // grid: {
  //   visible: true,
  // },
  // line: {
  //   visible: false,
  // },
  // tickLine: {
  //   visible: false,
  // },
  // label: {
  //   visible: true,
  //   autoHide: true,
  //   autoRotate: false,
  // },
  // title: {
  //   autoRotate: true,
  //   visible: false,
  //   offset: 12,
  // },
};

export const DEFAULT_LINE_CONFIG: LineConfig = {
  geometry: BiaxGeometry.Line,
  lineSize: 2,
  connectNulls: true,
  smooth: false,
  point: {
    size: 3,
    shape: 'circle',
    style: {
      stroke: '#fff',
    },
  },
};

// @ts-ignore
export const DEFAULT_OPTION: BiaxOption = {
  legend: {
    position: 'top',
  },
  tooltip: {
    showCrosshairs: true,
    shared: true,
  },
};

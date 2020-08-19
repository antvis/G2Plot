import { BiaxGeometry, LineConfig, ColumnConfig, BiaxOption, AxisType } from './types';
import { Axis } from '../../types/axis';

export const DEFAULT_LINE_COLOR = {
  [AxisType.Left]: '#5B8FF9',
  [AxisType.Right]: '#e76c5e',
};

export const DEFAULT_YAXIS_CONFIG: Axis = {};

export const DEFAULT_LINE_CONFIG: LineConfig = {
  geometry: BiaxGeometry.Line,
  connectNulls: true,
  smooth: false,
};

export const DEFAULT_COLUMN_CONFIG: ColumnConfig = {
  geometry: BiaxGeometry.Column,
  interval: {
    widthRatio: 0.5,
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

import { isArray, isFunction } from '@antv/util';

export const REFLECTS = {
  shape: {
    action: 'shape',
    field: 'shapeField',
    rules: [isArray, isFunction],
  },
  pointSize: {
    action: 'size',
    field: 'sizeField',
    rules: [isArray, isFunction],
  },
  color: {
    action: 'color',
    field: 'colorField',
    rules: [isArray, isFunction],
  },
};

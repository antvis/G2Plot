import { isArray, isFunction } from '@antv/util';

export const REFLECTS = {
  shape: {
    /** 对应 G2 动作 */
    action: 'shape',
    /** 映射字段，默认使用 xField */
    field: 'shapeField',
    /**
     * 条件组件 满足其一则使用 fn(field, value[] | callback)
     * eg: geometry.size('field', [10, 20]) OR geometry.size(10)
     */
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

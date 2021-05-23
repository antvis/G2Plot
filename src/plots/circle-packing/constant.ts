export const DEFAULT_OPTIONS = {
  // 默认按照 name 字段对颜色进行分类
  colorField: 'name',
  pointStyle: {
    lineWidth: 0,
    stroke: '#fff',
  },
  hierarchyConfig: {
    size: [1, 1] as [number, number], // width, height
    padding: 0,
  },
  label: {
    fields: ['x'],
    layout: {
      type: 'limit-in-shape',
    },
  },
};

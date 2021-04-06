export const Y_FIELD = '$$yField$$';
export const DIFF_FIELD = '$$diffField$$';
export const ABSOLUTE_FIELD = '$$absoluteField$$';
export const IS_TOTAL = '$$isTotal$$';

/**
 * 瀑布图 默认配置项
 */
export const DEFAULT_OPTIONS = {
  /** default: show label */
  label: {},
  /** default: show leaderLine */
  leaderLine: {
    style: {
      lineWidth: 1,
      stroke: '#8c8c8c',
      lineDash: [4, 2],
    },
  },
  /** default: show total */
  total: {
    label: '总计',
    style: {
      fill: 'rgba(0, 0, 0, 0.25)',
    },
  },
  interactions: [{ type: 'element-active' }],
  risingFill: '#f4664a',
  fallingFill: '#30bf78',
  waterfallStyle: {
    fill: 'rgba(0, 0, 0, 0.25)',
  },
  yAxis: {
    grid: {
      line: {
        style: {
          lineDash: [4, 2],
        },
      },
    },
  },
};

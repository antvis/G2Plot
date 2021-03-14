export const RANGE_VALUE = 'range';
export const RANGE_TYPE = 'type';
export const PERCENT = 'percent';

export const DEFAULT_COLOR = '#f0f0f0';

/** 仪表盘由 指针和表盘 组成 */
export const INDICATEOR_VIEW_ID = 'indicator-view';
export const RANGE_VIEW_ID = 'range-view';

/** meter 类型的仪表盘 带 mask 的 view */
export const MASK_VIEW_ID = 'range-mask-view';

/**
 * 仪表盘默认配置项
 */
export const DEFAULT_OPTIONS = {
  percent: 0, // 当前指标值
  range: {
    ticks: [],
  }, // 默认的刻度
  innerRadius: 0.9,
  radius: 0.95,
  startAngle: (-7 / 6) * Math.PI,
  endAngle: (1 / 6) * Math.PI,
  syncViewPadding: true,
  axis: {
    line: null,
    label: {
      offset: -24,
      style: {
        textAlign: 'center' as const,
        textBaseline: 'middle' as const,
      },
    },
    subTickLine: {
      length: -8,
    },
    tickLine: {
      length: -12,
    },
    grid: null,
  },
  indicator: {
    pointer: {
      style: {
        lineWidth: 5,
        lineCap: 'round' as const,
      },
    },
    pin: {
      style: {
        r: 9.75,
        lineWidth: 4.5,
        fill: '#fff',
      },
    },
  },
  statistic: {
    title: false as const,
  },
  meta: {
    // 两个 view 的 scale 同步到 v 上
    [RANGE_VALUE]: {
      sync: 'v',
    },
    [PERCENT]: {
      sync: 'v',
      tickCount: 5,
      tickInterval: 0.2,
    },
  },
  animation: false as const,
};

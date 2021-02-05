import { get } from '@antv/util';

export const X_FIELD = 'x';
export const Y_FIELD = 'y';

export const DEFAULT_TOOLTIP_OPTIONS = {
  showTitle: false,
  shared: true,
  showMarkers: false,
  customContent: (x: string, data: any[]) => `${get(data, [0, 'data', 'y'], 0)}`, // 默认显示原始数据
  containerTpl: '<div class="g2-tooltip"><div class="g2-tooltip-list"></div></div>',
  itemTpl: '<span>{value}</span>',
  domStyles: {
    'g2-tooltip': {
      padding: '2px 4px',
      fontSize: '10px',
    },
  },
  showCrosshairs: true,
  crosshairs: {
    type: 'x' as const,
  },
};

/**
 * 默认配置项
 */
export const DEFAULT_OPTIONS = {
  appendPadding: 2,
  tooltip: {
    ...DEFAULT_TOOLTIP_OPTIONS,
  },
  animation: {},
};

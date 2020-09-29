import { get } from '@antv/util';
import { Data } from '../../types';

export const DEFAULT_TOOLTIP_OPTIONS = {
  showTitle: false,
  shared: true,
  showMarkers: false,
  customContent: (x: number, data: Data) => `${get(data, [0, 'data', 'y'], 0).toFixed(1)}`, // 默认给个格式化
  containerTpl: '<div class="g2-tooltip"><div class="g2-tooltip-list"></div></div>',
  itemTpl: '<span>{value}</span>',
  domStyles: {
    'g2-tooltip': {
      padding: '2px 4px',
      fontSize: '10px',
    },
  },
};

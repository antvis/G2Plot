import { Plot } from '../../core/plot';
import { Datum } from '../../types';
import { deepAssign } from '../../utils';

/** 词云图 color 通道映射字段 */
export const WORD_CLOUD_COLOR_FIELD = 'color';

/**
 * 词云图 默认配置项
 */
export const DEFAULT_OPTIONS = deepAssign({}, Plot.getDefaultOptions(), {
  timeInterval: 2000,
  legend: false,
  tooltip: {
    showTitle: false,
    showMarkers: false,
    showCrosshairs: false,
    fields: ['text', 'value', WORD_CLOUD_COLOR_FIELD],
    formatter: (datum: Datum) => {
      return { name: datum.text, value: datum.value };
    },
  },
  wordStyle: {
    fontFamily: 'Verdana',
    fontWeight: 'normal',
    padding: 1,
    fontSize: [12, 60],
    rotation: [0, 90],
    rotationSteps: 2,
    rotateRatio: 0.5,
  },
});

import { deepMix, isArray, isObject, map } from '@antv/util';
import { Params } from '../../core/adaptor';
import { interaction, animation, theme } from '../../adaptor/common';
import { findGeometry, flow, pick, transformTooltip } from '../../utils';
import { AXIS_META_CONFIG_KEYS } from '../../constant';

import { StockOptions } from './types';
import { Y_FIELD, TREND_FIELD, TREND_UP, TREND_DOWN, TREND_COLOR } from './constant';

/**
 * 图表配置处理
 * @param params
 */
function field(params: Params<StockOptions>): Params<StockOptions> {
  const { chart, options } = params;
  const { xField, yField } = options;

  let data = options.data;

  // 加工处理源数据
  data = map(data, (obj) => {
    if (isArray(yField)) {
      const [open, close, high, low] = yField;
      obj[TREND_FIELD] = obj[open] <= obj[close] ? TREND_UP : TREND_DOWN;
      obj[Y_FIELD] = [obj[open], obj[close], obj[high], obj[low]];
    }
    return obj;
  });

  chart.data(data);

  const geometry = chart.schema().position(`${xField}*${Y_FIELD}`).shape('candle');

  geometry.color(TREND_FIELD, TREND_COLOR);

  return params;
}

/**
 * meta 配置
 * @param params
 */
export function meta(params: Params<StockOptions>): Params<StockOptions> {
  const { chart, options } = params;
  const { meta, xAxis, yAxis, xField } = options;

  const baseMeta = {
    [xField]: {
      type: 'timeCat',
      tickCount: 6,
    },
    [TREND_FIELD]: {
      values: [TREND_UP, TREND_DOWN],
    },
  };

  const scales = deepMix(baseMeta, meta, {
    [xField]: pick(xAxis, AXIS_META_CONFIG_KEYS),
    [Y_FIELD]: pick(yAxis, AXIS_META_CONFIG_KEYS),
  });

  chart.scale(scales);

  return params;
}

/**
 * axis 配置
 * @param params
 */
export function axis(params: Params<StockOptions>): Params<StockOptions> {
  const { chart, options } = params;
  const { xAxis, yAxis, xField } = options;

  // 为 false 则是不显示轴
  if (xAxis === false) {
    chart.axis(xField, false);
  } else {
    chart.axis(xField, xAxis);
  }

  if (yAxis === false) {
    chart.axis(Y_FIELD, false);
  } else {
    chart.axis(Y_FIELD, yAxis);
  }

  return params;
}

/**
 * tooltip 配置
 * @param params
 */
export function tooltip(params: Params<StockOptions>): Params<StockOptions> {
  const { chart, options } = params;
  const { xField, yField, meta = {}, tooltip = false } = options;
  const geometry = findGeometry(chart, 'schema');

  const [open, close, high, low] = yField;

  const openAlias = meta[open] ? meta[open].alias || open : open;
  const closeAlias = meta[close] ? meta[close].alias || open : close;
  const highAlias = meta[high] ? meta[high].alias || high : high;
  const lowAlias = meta[low] ? meta[low].alias || low : low;

  const baseGeomTooltipOptions = {
    fields: [xField, open, close, high, low],
    callback: (xFieldVal, openVal, closeVal, highVal, lowVal) => {
      const tpl = {
        name: xFieldVal,
        value: `
          <br><span data-label="${openAlias}" style="padding-left: 16px">${openAlias}：${openVal}</span>
          <br><span data-label="${closeAlias}" style="padding-left: 16px">${closeAlias}：${closeVal}</span>
          <br><span data-label="${highAlias}" style="padding-left: 16px">${highAlias}：${highVal}</span>
          <br><span data-label="${lowAlias}" style="padding-left: 16px">${lowAlias}：${lowVal}</span>
        `,
      };
      return tpl;
    },
  };

  if (tooltip) {
    if (isObject(tooltip)) {
      chart.tooltip(transformTooltip(tooltip));
      geometry.tooltip(baseGeomTooltipOptions);
    }
  } else {
    chart.tooltip(false);
  }

  return params;
}

/**
 * K线图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<StockOptions>) {
  // flow 的方式处理所有的配置到 G2 API
  flow(field, meta, theme, axis, tooltip, interaction, animation)(params);
}

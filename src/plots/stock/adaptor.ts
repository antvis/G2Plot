import { isObject, get } from '@antv/util';
import { Params } from '../../core/adaptor';
import { interaction, animation, theme, state, annotation } from '../../adaptor/common';
import { geometry } from '../../adaptor/geometries/base';
import { flow, pick, deepAssign } from '../../utils';
import { AXIS_META_CONFIG_KEYS } from '../../constant';

import { Y_FIELD, TREND_FIELD, TREND_UP, TREND_DOWN } from './constant';
import { StockOptions } from './types';
import { getStockData } from './utils';

/**
 * 获取 geometry tooltip 配置
 */
function getTooltipOption(params: Params<StockOptions>): { fields: string[]; callback: Function } {
  const { options } = params;
  const { xField, yField } = options;

  const [open, close, high, low] = yField;

  const openAlias = meta[open] ? meta[open].alias || open : open;
  const closeAlias = meta[close] ? meta[close].alias || open : close;
  const highAlias = meta[high] ? meta[high].alias || high : high;
  const lowAlias = meta[low] ? meta[low].alias || low : low;

  // geom级别tooltip
  const geomTooltipOptions = {
    fields: [xField, open, close, high, low],
    callback: (datum) => {
      const tpl = {
        name: get(datum, [xField]),
        value: `
          <br><span data-label="${openAlias}" style="padding-left: 16px">${openAlias}：${get(datum, open)}</span>
          <br><span data-label="${closeAlias}" style="padding-left: 16px">${closeAlias}：${get(datum, close)}</span>
          <br><span data-label="${highAlias}" style="padding-left: 16px">${highAlias}：${get(datum, high)}</span>
          <br><span data-label="${lowAlias}" style="padding-left: 16px">${lowAlias}：${get(datum, low)}</span>
        `,
      };
      return tpl;
    },
  };

  return geomTooltipOptions;
}

/**
 * 图表配置处理
 * @param params
 */
function field(params: Params<StockOptions>): Params<StockOptions> {
  const { chart, options } = params;
  const { xField, yField } = options;

  const { data, risingFill, fallingFill } = options;

  chart.data(getStockData(data, yField));

  const toolipOptions = getTooltipOption(params);

  geometry(
    deepAssign({}, params, {
      options: {
        type: 'schema',
        xField,
        yField: Y_FIELD,
        colorField: TREND_FIELD,
        tooltipFields: toolipOptions.fields,
        mapping: {
          shape: 'candle',
          color: [risingFill, fallingFill],
          // geometry tooltip
          tooltip: toolipOptions.callback,
        },
      },
    })
  );

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

  const scales = deepAssign(baseMeta, meta, {
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
  const { xField, tooltip = {} } = options;

  // chart级别tooltip， text格式化显示内容
  const baseTooltipOptions = {
    crosshairs: {
      text: (type, defaultContent, items) => {
        const tooltipCrosshairsText = { position: 'end' };
        if (type === 'x') {
          const item = items[0];
          tooltipCrosshairsText['content'] = item ? item.data[xField] : defaultContent;
        } else {
          tooltipCrosshairsText['content'] = defaultContent;
        }
        return tooltipCrosshairsText;
      },
    },
  };

  if (tooltip) {
    if (isObject(tooltip)) {
      const chartTooltip = deepAssign({}, baseTooltipOptions, tooltip);
      chart.tooltip(chartTooltip);
    }
  } else {
    chart.tooltip(false);
  }

  return params;
}

/**
 * legend 配置
 * @param params
 */
export function legend(params: Params<StockOptions>): Params<StockOptions> {
  const { chart, options } = params;
  const { legend } = options;

  if (legend) {
    chart.legend(TREND_FIELD, legend);
  } else if (legend === false) {
    chart.legend(false);
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
  flow(theme, field, meta, axis, tooltip, legend, interaction, animation, state, annotation())(params);
}

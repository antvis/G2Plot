import { Params } from '../../core/adaptor';
import { interaction, animation, theme, annotation, slider } from '../../adaptor/common';
import { schema } from '../../adaptor/geometries';
import { flow, pick, deepAssign } from '../../utils';
import { AXIS_META_CONFIG_KEYS } from '../../constant';

import { Y_FIELD, TREND_FIELD, TREND_UP, TREND_DOWN } from './constant';
import { StockOptions } from './types';
import { getStockData } from './utils';

/**
 * 图表配置处理
 * @param params
 */
function geometry(params: Params<StockOptions>): Params<StockOptions> {
  const { chart, options } = params;
  const { yField } = options;

  const { data, risingFill, fallingFill, tooltip, stockStyle } = options;

  chart.data(getStockData(data, yField));

  let tooltipOptions = tooltip;
  if (tooltipOptions !== false) {
    tooltipOptions = deepAssign({}, { fields: yField }, tooltipOptions);
  }

  schema(
    deepAssign({}, params, {
      options: {
        schema: {
          shape: 'candle',
          color: [risingFill, fallingFill],
          style: stockStyle,
        },
        yField: Y_FIELD,
        seriesField: TREND_FIELD,
        rawFields: yField,
        tooltip: tooltipOptions,
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
  const { tooltip } = options;

  if (tooltip !== false) {
    chart.tooltip(tooltip);
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
  flow(theme, geometry, meta, axis, tooltip, legend, interaction, animation, annotation(), slider)(params);
}

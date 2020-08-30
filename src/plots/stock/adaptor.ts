import { deepMix, isArray, isObject } from '@antv/util';
import DataSet from '@antv/data-set';
import { Params } from '../../core/adaptor';
import { interaction, animation, theme } from '../../adaptor/common';
import { findGeometry, flow, pick } from '../../utils';
import { AXIS_META_CONFIG_KEYS } from '../../constant';

import { CandleOptions } from './types';
import * as Constant from './constant';

import dayjs from 'dayjs';
/**
 * 图表配置处理
 * @param params
 */
function field(params: Params<CandleOptions>): Params<CandleOptions> {
  const { chart, options } = params;
  const { data, xField, yField, trendColor, xFieldFormat } = options;

  const ds = new DataSet();
  const dv = ds.createView().source(data);

  // 加工处理源数据
  dv.transform({
    type: 'map',
    callback(obj) {
      if (xFieldFormat) {
        obj[xField] = dayjs(obj[xField], xFieldFormat).format('YYYY-MM-DD');
      }
      if (isArray(yField)) {
        const [open, close, high, low] = yField;
        obj[Constant.TREND_FIELD] = obj[open] <= obj[close] ? Constant.TREND_UP : Constant.TREND_DOWN;
        obj[Constant.YFIELD] = [obj[open], obj[close], obj[high], obj[low]];
      }
      return obj;
    },
  });

  chart.data(dv.rows);

  const geometry = chart.schema().position(`${xField}*${Constant.YFIELD}`).shape('candle');

  geometry.color(Constant.TREND_FIELD, (val) => {
    let colors = Constant.TREND_COLOR;
    if (isArray(trendColor)) {
      colors = trendColor;
    }
    if (val === Constant.TREND_UP) {
      return colors[0];
    }

    if (val === Constant.TREND_DOWN) {
      return colors[1];
    }
  });

  return params;
}

/**
 * meta 配置
 * @param params
 */
export function meta(params: Params<CandleOptions>): Params<CandleOptions> {
  const { chart, options } = params;
  const { meta, xAxis, yAxis, xField, isConnectNulls } = options;

  const baseMeta = {
    [xField]: {
      type: isConnectNulls ? 'time' : 'timeCat',
      tickCount: 6,
    },
    [Constant.TREND_FIELD]: {
      values: [Constant.TREND_UP, Constant.TREND_DOWN],
    },
  };

  const scales = deepMix(baseMeta, meta, {
    [xField]: pick(xAxis, AXIS_META_CONFIG_KEYS),
    [Constant.YFIELD]: pick(yAxis, AXIS_META_CONFIG_KEYS),
  });

  chart.scale(scales);

  return params;
}

/**
 * axis 配置
 * @param params
 */
export function axis(params: Params<CandleOptions>): Params<CandleOptions> {
  const { chart, options } = params;
  const { xAxis, yAxis, xField, yField } = options;

  // 为 false 则是不显示轴
  if (xAxis === false) {
    chart.axis(xField, false);
  } else {
    chart.axis(xField, xAxis);
  }

  if (yAxis === false) {
    chart.axis(Constant.YFIELD, false);
  } else {
    chart.axis(Constant.YFIELD, yAxis);
  }

  return params;
}

/**
 * tooltip 配置
 * @param params
 */
export function tooltip(params: Params<CandleOptions>): Params<CandleOptions> {
  const { chart, options } = params;
  const { tooltip = false } = options;
  const geometry = findGeometry(chart, 'schema');

  const baseGeomTooltipOptions = Constant.DEFAULT_GEOM_TOOLTIP_OPTIONS(params);

  if (tooltip) {
    if (isObject(tooltip)) {
      chart.tooltip(tooltip);
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
export function adaptor(params: Params<CandleOptions>) {
  // flow 的方式处理所有的配置到 G2 API
  flow(field, meta, theme, axis, tooltip, interaction, animation)(params);
}

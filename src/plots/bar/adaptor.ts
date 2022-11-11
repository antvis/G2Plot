import { tooltip } from '../../adaptor/common';
import { Params } from '../../core/adaptor';
import { Axis } from '../../types';
import { deepAssign, flow } from '../../utils';
import { adaptor as columnAdaptor } from '../column/adaptor';
import { BarOptions } from './types';
export { meta } from '../column/adaptor';

/**
 * 处理默认配置项
 * 1. switch xField、 yField
 * 2. switch xAxis、 yAxis and adjust axis.position configuration
 */
function defaultOptions(params: Params<BarOptions>): Params<BarOptions> {
  const { options } = params;
  const { xField, yField, xAxis, yAxis } = options;

  const position = {
    left: 'bottom',
    right: 'top',
    top: 'left',
    bottom: 'right',
  };

  const verticalAxis =
    yAxis !== false
      ? {
          position: position[yAxis?.position || 'left'],
          ...yAxis,
        }
      : false;
  const horizontalAxis =
    xAxis !== false
      ? {
          position: position[xAxis?.position || 'bottom'],
          ...xAxis,
        }
      : false;

  return {
    ...params,
    options: {
      ...options,
      xField: yField,
      yField: xField,
      // 条形图 xAxis，yAxis 不可以做 deepAssign
      xAxis: verticalAxis as Axis,
      yAxis: horizontalAxis as Axis,
    },
  };
}

/**
 * label 适配器
 * @param params
 */
function label(params: Params<BarOptions>): Params<BarOptions> {
  const { options } = params;
  const { label } = options;
  // label of bar charts default position is left, if plot has label
  if (label && !label.position) {
    label.position = 'left';
    // 配置默认的 label layout： 如果用户没有指定 layout 和 position， 则自动配置 layout
    if (!label.layout) {
      label.layout = [
        { type: 'interval-adjust-position' },
        { type: 'interval-hide-overlap' },
        { type: 'adjust-color' },
        { type: 'limit-in-plot', cfg: { action: 'hide' } },
      ];
    }
  }

  return deepAssign({}, params, { options: { label } });
}

/**
 * legend 适配器
 * @param params
 */
function legend(params: Params<BarOptions>): Params<BarOptions> {
  const { options } = params;

  // 默认 legend 位置
  const { seriesField, isStack } = options;
  let { legend } = options;
  if (seriesField) {
    if (legend !== false) {
      legend = {
        position: isStack ? 'top-left' : 'right-top',
        ...(legend || {}),
      };
    }
  } else {
    legend = false;
  }

  return deepAssign({}, params, { options: { legend } });
}

/**
 * coordinate 适配器
 * @param params
 */
function coordinate(params: Params<BarOptions>): Params<BarOptions> {
  // transpose column to bar 对角变换 & y 方向镜像变换
  const { options } = params;
  const coordinateOptions = [{ type: 'transpose' }, { type: 'reflectY' }].concat(options.coordinate || []);
  return deepAssign({}, params, { options: { coordinate: coordinateOptions } });
}

/**
 * 柱形图适配器
 * @param params
 */
export function geometry(params: Params<BarOptions>) {
  const { chart, options } = params;

  const { barStyle, barWidthRatio, minBarWidth, maxBarWidth, barBackground } = options;

  return columnAdaptor(
    {
      chart,
      options: {
        ...options,
        // rename attrs as column
        columnStyle: barStyle,
        columnWidthRatio: barWidthRatio,
        minColumnWidth: minBarWidth,
        maxColumnWidth: maxBarWidth,
        columnBackground: barBackground,
      },
    },
    true
  ) as Params<BarOptions>;
}

/**
 * @param chart
 * @param options
 */
export function adaptor(params: Params<BarOptions>): Params<BarOptions> {
  // flow 的方式处理所有的配置到 G2 API
  return flow<Params<BarOptions>>(defaultOptions, label, legend, tooltip, coordinate, geometry)(params);
}

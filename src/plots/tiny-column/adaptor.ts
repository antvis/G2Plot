import { isFunction } from '@antv/util';
import { Params } from '../../core/adaptor';
import { flow } from '../../utils';
import { TinyColumnOptions } from './types';

/**
 * 字段
 * @param params
 */
function field(params: Params<TinyColumnOptions>): Params<TinyColumnOptions> {
  const { chart, options } = params;
  const { data } = options;

  const seriesData = data.map((y: number, x: number) => {
    return { x, y };
  });

  chart.data(seriesData);

  chart.interval().position('x*y');

  return params;
}

/**
 * meta 配置
 * @param params
 */
function meta(params: Params<TinyColumnOptions>): Params<TinyColumnOptions> {
  const { chart, options } = params;
  const { meta } = options;

  chart.scale(meta);

  return params;
}

/**
 * axis 配置
 * @param params
 */
function axis(params: Params<TinyColumnOptions>): Params<TinyColumnOptions> {
  const { chart } = params;

  chart.axis(false);

  return params;
}

/**
 * legend 配置
 * @param params
 */
function legend(params: Params<TinyColumnOptions>): Params<TinyColumnOptions> {
  const { chart } = params;

  chart.legend(false);

  return params;
}

/**
 * tooltip 配置
 * @param params
 */
export function tooltip(params: Params<TinyColumnOptions>): Params<TinyColumnOptions> {
  const { chart, options } = params;
  const { tooltip = false } = options;

  const DEFAULT_TOOLTIP_OPTIONS = {
    showTitle: false,
    shared: true,
    showMarkers: false,
    containerTpl: '<div class="g2-tooltip"><div class="g2-tooltip-list"></div></div>',
    itemTpl: '<span>{value}</span>',
    domStyles: {
      'g2-tooltip': {
        padding: '2px',
        fontSize: '10px',
      },
    },
  };

  if (tooltip) {
    if (typeof tooltip === 'object') {
      const { formatter, domStyles, position, offset, showCrosshairs } = tooltip;
      chart.tooltip({
        ...DEFAULT_TOOLTIP_OPTIONS,
        showCrosshairs,
        domStyles,
        position,
        offset,
      });
      const geometry = chart.geometries[0];
      geometry.tooltip('x*y', (x, y) => {
        return {
          value: formatter(x, y),
        };
      });
    } else {
      chart.tooltip(DEFAULT_TOOLTIP_OPTIONS);
    }
  } else {
    chart.tooltip(false);
  }

  return params;
}

/**
 * 样式
 * @param params
 */
function style(params: Params<TinyColumnOptions>): Params<TinyColumnOptions> {
  const { chart, options } = params;
  const { columnStyle } = options;

  const geometry = chart.geometries[0];
  if (columnStyle && geometry) {
    if (isFunction(columnStyle)) {
      geometry.style('x*y', columnStyle);
    } else {
      geometry.style(columnStyle);
    }
  }
  return params;
}

/**
 * 迷你柱形图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<TinyColumnOptions>) {
  flow(field, meta, axis, legend, tooltip, style)(params);
}

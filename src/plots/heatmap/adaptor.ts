import { get } from '@antv/util';
import { Params } from '../../core/adaptor';
import { deepAssign, findGeometry } from '../../utils';
import { flow, transformLabel } from '../../utils';
import { tooltip, interaction, animation, theme, scale, annotation, state, pattern } from '../../adaptor/common';
import { geometry as geometryAdaptor } from '../../adaptor/geometries/base';
import { getTooltipMapping } from '../../utils/tooltip';
import { HeatmapOptions } from './types';

function geometry(params: Params<HeatmapOptions>): Params<HeatmapOptions> {
  const { chart, options } = params;
  const { data, type, xField, yField, colorField, sizeField, sizeRatio, shape, color, tooltip, heatmapStyle } = options;

  chart.data(data);
  let geometryType = 'polygon';
  if (type === 'density') {
    geometryType = 'heatmap';
  }

  const { fields, formatter } = getTooltipMapping(tooltip, [xField, yField, colorField]);

  /**
   * The ratio between the actual size and the max available size, must be in range `[0,1]`.
   *
   * If the `sizeRatio` attribute is undefined or it exceeds the range,
   * `checkedSizeRatio` would be set to 1 as default.
   */
  let checkedSizeRatio = 1;
  if (sizeRatio || sizeRatio === 0) {
    if (!shape && !sizeField) {
      console.warn('sizeRatio is not in effect: Must define shape or sizeField first');
    } else if (sizeRatio < 0 || sizeRatio > 1) {
      console.warn('sizeRatio is not in effect: It must be a number in [0,1]');
    } else {
      checkedSizeRatio = sizeRatio;
    }
  }

  geometryAdaptor(
    deepAssign({}, params, {
      options: {
        type: geometryType,
        colorField,
        tooltipFields: fields,
        shapeField: sizeField || '',
        label: undefined,
        mapping: {
          tooltip: formatter,
          shape:
            shape &&
            (sizeField
              ? (dautm) => {
                  const field = data.map((row) => row[sizeField]);
                  const min = Math.min(...field);
                  const max = Math.max(...field);
                  return [shape, (get(dautm, sizeField) - min) / (max - min), checkedSizeRatio];
                }
              : () => [shape, 1, checkedSizeRatio]),
          color: color || (colorField && chart.getTheme().sequenceColors.join('-')),
          style: heatmapStyle,
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
function meta(params: Params<HeatmapOptions>): Params<HeatmapOptions> {
  const { options } = params;
  const { xAxis, yAxis, xField, yField } = options;

  return flow(
    scale({
      [xField]: xAxis,
      [yField]: yAxis,
    })
  )(params);
}

/**
 * axis 配置
 * @param params
 */
function axis(params: Params<HeatmapOptions>): Params<HeatmapOptions> {
  const { chart, options } = params;
  const { xAxis, yAxis, xField, yField } = options;

  // 为 false 则是不显示轴
  if (xAxis === false) {
    chart.axis(xField, false);
  } else {
    chart.axis(xField, xAxis);
  }

  if (yAxis === false) {
    chart.axis(yField, false);
  } else {
    chart.axis(yField, yAxis);
  }

  return params;
}

/**
 * legend 配置
 * @param params
 */
function legend(params: Params<HeatmapOptions>): Params<HeatmapOptions> {
  const { chart, options } = params;
  const { legend, colorField, sizeField, sizeLegend } = options;

  /** legend 不为 false, 则展示图例, 优先展示 color 分类图例 */
  const showLegend = legend !== false;

  if (colorField) {
    chart.legend(colorField, showLegend ? legend : false);
  }

  // 旧版本: 有 sizeField 就有 sizeLegend. 这里默认继承下 legend 配置
  if (sizeField) {
    chart.legend(sizeField, sizeLegend === undefined ? legend : sizeLegend);
  }

  /** 默认没有 sizeField，则隐藏连续图例 */
  if (!showLegend && !sizeLegend) {
    chart.legend(false);
  }

  return params;
}

/**
 * fixme 后续确认下，数据标签的逻辑为啥和通用的不一致
 * 数据标签
 * @param params
 */
function label(params: Params<HeatmapOptions>): Params<HeatmapOptions> {
  const { chart, options } = params;
  const { label, colorField, type } = options;

  const geometry = findGeometry(chart, type === 'density' ? 'heatmap' : 'polygon');

  if (!label) {
    geometry.label(false);
  } else if (colorField) {
    const { callback, ...cfg } = label;
    geometry.label({
      fields: [colorField],
      callback,
      cfg: transformLabel(cfg),
    });
  }

  return params;
}

/**
 * 极坐标
 * @param params
 */
function coordinate(params: Params<HeatmapOptions>): Params<HeatmapOptions> {
  const { chart, options } = params;
  const { coordinate, reflect } = options;

  if (coordinate) {
    chart.coordinate({
      type: coordinate.type || 'rect',
      cfg: coordinate.cfg,
    });
  }

  if (reflect) {
    chart.coordinate().reflect(reflect);
  }

  return params;
}

/**
 * 热力图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<HeatmapOptions>) {
  // flow 的方式处理所有的配置到 G2 API
  return flow(
    theme,
    pattern('heatmapStyle'),
    meta,
    coordinate,
    geometry,
    axis,
    legend,
    tooltip,
    label,
    annotation(),
    interaction,
    animation,
    state
  )(params);
}

import { deepMix, isFunction } from '@antv/util';
import { Params } from '../../core/adaptor';
import { flow, pick } from '../../utils';
import { ScatterOptions } from './types';
import { tooltip, interaction, animation, theme } from '../../common/adaptor';
import { findGeometry } from '../../common/helper';
import { AXIS_META_CONFIG_KEYS } from '../../constant';
import { REFLECTS } from './reflect';

/**
 * 字段
 * @param params
 */
function field(params: Params<ScatterOptions>): Params<ScatterOptions> {
  const { chart, options } = params;
  const { data, xField, yField, type } = options;

  // 散点图操作逻辑
  chart.data(data);
  const geometry = chart.point().position(`${xField}*${yField}`);

  // 数据调整
  if (type) {
    geometry.adjust(type);
  }

  // 统一处理 color、 size、 shape
  const reflectKeys = Object.keys(REFLECTS);
  reflectKeys.forEach((key: string) => {
    if (options[key] || options[REFLECTS[key].field]) {
      let validateRules = false;
      (REFLECTS[key].rules || []).forEach((fn: (arg: any) => boolean) => {
        // 满足任一规则即可
        if (fn && fn(options[key])) {
          validateRules = true;
        }
      });
      if (validateRules) {
        if (!options[REFLECTS[key].field]) {
          console.warn(`***\n  为了准确映射，请指定 ${REFLECTS[key].field} \n  ***`);
        }
        geometry[REFLECTS[key].action](options[REFLECTS[key].field] || xField, options[key]);
      } else {
        geometry[REFLECTS[key].action](options[key] || options[REFLECTS[key].field]);
      }
    }
  });

  return params;
}

/**
 * meta 配置
 * @param params
 */
function meta(params: Params<ScatterOptions>): Params<ScatterOptions> {
  const { chart, options } = params;
  const { meta, xAxis, yAxis, xField, yField } = options;

  // meta 直接是 scale 的信息
  const scales = deepMix({}, meta, {
    [xField]: pick(xAxis, AXIS_META_CONFIG_KEYS),
    [yField]: pick(yAxis, AXIS_META_CONFIG_KEYS),
  });

  chart.scale(scales);

  return params;
}

/**
 * axis 配置
 * @param params
 */
function axis(params: Params<ScatterOptions>): Params<ScatterOptions> {
  const { chart, options } = params;
  const { xAxis, yAxis, xField, yField } = options;

  chart.axis(xField, xAxis);
  chart.axis(yField, yAxis);

  return params;
}

/**
 * legend 配置
 * @param params
 */
function legend(params: Params<ScatterOptions>): Params<ScatterOptions> {
  const { chart, options } = params;
  const { legend, colorField } = options;

  if (legend && colorField) {
    chart.legend(colorField, legend);
  }

  return params;
}

/**
 * 样式
 * @param params
 */
function style(params: Params<ScatterOptions>): Params<ScatterOptions> {
  const { chart, options } = params;
  const { xField, yField, pointStyle, colorField } = options;

  const geometry = chart.geometries[0];

  if (pointStyle && geometry) {
    if (isFunction(pointStyle)) {
      geometry.style(`${xField}*${yField}*${colorField}`, pointStyle);
    } else {
      geometry.style(pointStyle);
    }
  }

  return params;
}

/**
 * 数据标签
 * @param params
 */
function label(params: Params<ScatterOptions>): Params<ScatterOptions> {
  const { chart, options } = params;
  const { label, yField } = options;

  const scatterGeometry = findGeometry(chart, 'point');

  // label 为 false, 空 则不显示 label
  if (!label) {
    scatterGeometry.label(false);
  } else {
    const { callback, ...cfg } = label;
    scatterGeometry.label({
      fields: [yField],
      callback,
      cfg,
    });
  }

  return params;
}

/**
 * 散点图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<ScatterOptions>) {
  // flow 的方式处理所有的配置到 G2 API
  flow(field, meta, axis, legend, tooltip, style, label, interaction, animation, theme)(params);
}

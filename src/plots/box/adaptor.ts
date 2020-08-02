import { deepMix, isFunction, isNil } from '@antv/util';
import DataSet from '@antv/data-set';
import { Params } from '../../core/adaptor';
import { findGeometry } from '../../common/helper';
import { BoxOptions } from './types';
import { flow, pick } from '../../utils';
import { AXIS_META_CONFIG_KEYS } from '../../constant';

const RANGE = '@@__range';

/**
 * 字段
 * @param params
 */
function field(params: Params<BoxOptions>): Params<BoxOptions> {
  const { chart, options } = params;
  const { xField, yField, data } = options;
  const [low, q1, median, q3, high] = yField;

  const ds = new DataSet();
  const dv = ds.createView().source(data);

  // dataset 处理数据
  dv.transform({
    type: 'map',
    callback: (obj) => {
      obj[RANGE] = [obj[low], obj[q1], obj[median], obj[q3], obj[high]];
      return obj;
    },
  });

  chart.schema().position(`${xField}*${RANGE}`).shape('box');
  chart.data(dv.rows);

  return params;
}

/**
 * meta 配置
 * @param params
 */
function meta(params: Params<BoxOptions>): Params<BoxOptions> {
  const { chart, options } = params;
  const { meta, xAxis, yAxis, xField } = options;

  const scales = deepMix(
    {
      // 箱线图默认 range 从0 开始
      [RANGE]: { min: 0 },
    },
    meta,
    {
      [xField]: pick(xAxis, AXIS_META_CONFIG_KEYS),
      [RANGE]: pick(yAxis, AXIS_META_CONFIG_KEYS),
    }
  );

  chart.scale(scales);

  return params;
}

/**
 * axis 配置
 * @param params
 */
function axis(params: Params<BoxOptions>): Params<BoxOptions> {
  const { chart, options } = params;
  const { xAxis, yAxis, xField } = options;

  // 为 false 则是不显示轴
  if (xAxis === false) {
    chart.axis(xField, false);
  } else {
    chart.axis(xField, xAxis);
  }

  if (yAxis === false) {
    chart.axis(RANGE, false);
  } else {
    chart.axis(RANGE, yAxis);
  }

  return params;
}

/**
 * legend 配置
 * @param params
 */
// function legend(params: Params<BoxOptions>): Params<BoxOptions> {
//   const { chart, options } = params;
//   const { legend, colorField } = options;

//   if (legend && colorField) {
//     chart.legend(colorField, legend);
//   }

//   return params;
// }

/**
 * 样式
 * @param params
 */
function style(params: Params<BoxOptions>): Params<BoxOptions> {
  const { chart, options } = params;
  const { xField, yField, boxStyle } = options;

  const geometry = findGeometry(chart, 'schema');
  if (boxStyle && geometry) {
    if (isFunction(boxStyle)) {
      // geometry.style(`${xField}*${yField}*${colorField}`, columnStyle);
    } else {
      geometry.style(boxStyle);
    }
  }
  return params;
}

/**
 * 箱线图适配器
 * @param params
 */
export function adaptor(params: Params<BoxOptions>) {
  return flow(field, meta, axis, style)(params);
}

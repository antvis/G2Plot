import { get, isFunction } from '@antv/util';
import { animation, interaction, scale, theme, tooltip } from '../../adaptor/common';
import { interval, point } from '../../adaptor/geometries';
import { Params } from '../../core/adaptor';
import { Datum } from '../../types';
import { deepAssign, flow, transformLabel } from '../../utils';
import { BulletOptions } from './types';
import { transformData } from './utils';

/**
 * geometry 处理
 * @param params
 */
function geometry(params: Params<BulletOptions>): Params<BulletOptions> {
  const { chart, options } = params;
  const { bulletStyle, targetField, rangeField, measureField, xField, color, layout, size, label } = options;
  // 处理数据
  const { min, max, ds } = transformData(options);
  chart.data(ds);

  // rangeGeometry
  const r = deepAssign({}, params, {
    options: {
      xField: xField,
      yField: rangeField,
      seriesField: 'rKey',
      isStack: true,
      label: get(label, 'range'),
      interval: {
        color: get(color, 'range'),
        style: get(bulletStyle, 'range'),
        size: get(size, 'range'),
      },
    },
  });
  interval(r);
  // 范围值的 tooltip 隐藏掉
  chart.geometries[0].tooltip(false);

  // measureGeometry
  const m = deepAssign({}, params, {
    options: {
      xField: xField,
      yField: measureField,
      seriesField: 'mKey',
      isStack: true,
      label: get(label, 'measure'),
      interval: {
        color: get(color, 'measure'),
        style: get(bulletStyle, 'measure'),
        size: get(size, 'measure'),
      },
    },
  });
  interval(m);

  // targetGeometry
  const t = deepAssign({}, params, {
    options: {
      xField: xField,
      yField: targetField,
      seriesField: 'tKey',
      label: get(label, 'target'),
      point: {
        color: get(color, 'target'),
        style: get(bulletStyle, 'target'),
        size: isFunction(get(size, 'target'))
          ? (data: Datum) => get(size, 'target')(data) / 2
          : get(size, 'target') / 2,
        shape: layout === 'horizontal' ? 'line' : 'hyphen',
      },
    },
  });
  point(t);

  // 水平的时候，要转换坐标轴
  if (layout === 'horizontal') {
    chart.coordinate().transpose();
  }

  return { ...params, ext: { data: { min, max } } };
}

/**
 * meta 配置
 * @param params
 */
export function meta(params: Params<BulletOptions>): Params<BulletOptions> {
  const { options, ext } = params;
  const { xAxis, yAxis, targetField, rangeField, measureField, xField } = options;

  const extData = ext.data;
  return flow(
    scale(
      {
        [xField]: xAxis,
        [measureField]: yAxis,
      },
      // 额外的 meta
      {
        [measureField]: { min: extData?.min, max: extData?.max, sync: true },
        [targetField]: {
          sync: `${measureField}`,
        },
        [rangeField]: {
          sync: `${measureField}`,
        },
      }
    )
  )(params);
}

/**
 * axis 配置
 * @param params
 */
function axis(params: Params<BulletOptions>): Params<BulletOptions> {
  const { chart, options } = params;
  const { xAxis, yAxis, xField, measureField, rangeField, targetField } = options;

  chart.axis(`${rangeField}`, false);
  chart.axis(`${targetField}`, false);

  // 为 false 则是不显示轴
  if (xAxis === false) {
    chart.axis(`${xField}`, false);
  } else {
    chart.axis(`${xField}`, xAxis);
  }

  if (yAxis === false) {
    chart.axis(`${measureField}`, false);
  } else {
    chart.axis(`${measureField}`, yAxis);
  }

  return params;
}

/**
 * legend 配置
 * @param params
 */
function legend(params: Params<BulletOptions>): Params<BulletOptions> {
  const { chart, options } = params;
  const { legend } = options;
  chart.removeInteraction('legend-filter');
  // @TODO 后续看是否内部自定义一个 legend
  chart.legend(legend);

  // 默认关闭掉所在 color 字段的 legend, 从而不影响自定义的legend
  chart.legend('rKey', false);
  chart.legend('mKey', false);
  chart.legend('tKey', false);

  return params;
}

/**
 * label 配置
 * @param params
 */
function label(params: Params<BulletOptions>): Params<BulletOptions> {
  const { chart, options } = params;
  const { label, measureField, targetField, rangeField } = options;
  const [rangeGeometry, measureGeometry, targetGeometry] = chart.geometries;

  if (get(label, 'range')) {
    rangeGeometry.label(`${rangeField}`, {
      layout: [{ type: 'limit-in-plot' }],
      ...transformLabel(label.range),
    });
  } else {
    rangeGeometry.label(false);
  }
  if (get(label, 'measure')) {
    measureGeometry.label(`${measureField}`, {
      layout: [{ type: 'limit-in-plot' }],
      ...transformLabel(label.measure),
    });
  } else {
    measureGeometry.label(false);
  }
  if (get(label, 'target')) {
    targetGeometry.label(`${targetField}`, {
      layout: [{ type: 'limit-in-plot' }],
      ...transformLabel(label.target),
    });
  } else {
    targetGeometry.label(false);
  }

  return params;
}

/**
 * 子弹图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<BulletOptions>) {
  // flow 的方式处理所有的配置到 G2 API
  flow(geometry, meta, axis, legend, theme, label, tooltip, interaction, animation)(params);
}

import { Types } from '@antv/g2';
import { isArray } from '@antv/util';
import { animation, annotation, interaction, theme, tooltip } from '../../adaptor/common';
import { point, schema } from '../../adaptor/geometries';
import { AXIS_META_CONFIG_KEYS } from '../../constant';
import { Params } from '../../core/adaptor';
import { deepAssign, flow, pick } from '../../utils';
import { BOX_RANGE, BOX_SYNC_NAME, OUTLIERS_VIEW_ID } from './constant';
import { BoxOptions } from './types';
import { transformData } from './utils';

/**
 * 字段
 * @param params
 */
function field(params: Params<BoxOptions>): Params<BoxOptions> {
  const { chart, options } = params;
  const { xField, yField, groupField, color, tooltip, boxStyle } = options;

  chart.data(transformData(options.data, yField));

  const yFieldName = isArray(yField) ? BOX_RANGE : yField;
  const rawFields = yField ? (isArray(yField) ? yField : [yField]) : [];

  let tooltipOptions = tooltip;
  if (tooltipOptions !== false) {
    tooltipOptions = deepAssign({}, { fields: isArray(yField) ? yField : [] }, tooltipOptions);
  }

  const { ext } = schema(
    deepAssign({}, params, {
      options: {
        xField,
        yField: yFieldName,
        seriesField: groupField,
        tooltip: tooltipOptions,
        rawFields,
        // 只有异常点视图展示 label
        label: false,
        schema: {
          shape: 'box',
          color,
          style: boxStyle,
        },
      },
    })
  );

  if (groupField) {
    ext.geometry.adjust('dodge');
  }

  return params;
}

/**
 * 创建异常点 view
 */
function outliersPoint(params: Params<BoxOptions>): Params<BoxOptions> {
  const { chart, options } = params;
  const { xField, data, outliersField, outliersStyle, padding, label } = options;

  if (!outliersField) return params;

  const outliersView = chart.createView({ padding, id: OUTLIERS_VIEW_ID });
  const outliersViewData = data.reduce((ret, datum) => {
    const outliersData = datum[outliersField];
    outliersData.forEach((d) => ret.push({ ...datum, [outliersField]: d }));
    return ret;
  }, []) as Types.Datum[];

  outliersView.data(outliersViewData);
  point({
    chart: outliersView,
    options: {
      xField,
      yField: outliersField,
      point: { shape: 'circle', style: outliersStyle },
      label,
    },
  });

  outliersView.axis(false);

  return params;
}

/**
 * meta 配置
 * @param params
 */
function meta(params: Params<BoxOptions>): Params<BoxOptions> {
  const { chart, options } = params;
  const { meta, xAxis, yAxis, xField, yField, outliersField } = options;
  const yFieldName = Array.isArray(yField) ? BOX_RANGE : yField;

  let baseMeta = {};

  // make yField and outliersField share y mate
  if (outliersField) {
    const syncName = BOX_SYNC_NAME;
    baseMeta = {
      [outliersField]: { sync: syncName, nice: true },
      [yFieldName]: { sync: syncName, nice: true },
    };
  }

  const scales = deepAssign(baseMeta, meta, {
    [xField]: pick(xAxis, AXIS_META_CONFIG_KEYS),
    [yFieldName]: pick(yAxis, AXIS_META_CONFIG_KEYS),
  });

  chart.scale(scales);

  return params;
}

/**
 * axis 配置
 * @param params
 */
function axis(params: Params<BoxOptions>): Params<BoxOptions> {
  const { chart, options } = params;
  const { xAxis, yAxis, xField, yField } = options;
  const yFieldName = Array.isArray(yField) ? BOX_RANGE : yField;

  // 为 false 则是不显示轴
  if (xAxis === false) {
    chart.axis(xField, false);
  } else {
    chart.axis(xField, xAxis);
  }

  if (yAxis === false) {
    chart.axis(BOX_RANGE, false);
  } else {
    chart.axis(yFieldName, yAxis);
  }

  return params;
}

/**
 * legend 配置
 * @param params
 */
export function legend(params: Params<BoxOptions>): Params<BoxOptions> {
  const { chart, options } = params;
  const { legend, groupField } = options;

  if (groupField) {
    if (legend) {
      chart.legend(groupField, legend);
    } else {
      // Grouped Box Chart default has legend, and it's position is `bottom`
      chart.legend(groupField, { position: 'bottom' });
    }
  } else {
    chart.legend(false);
  }

  return params;
}

/**
 * 箱型图适配器
 * @param params
 */
export function adaptor(params: Params<BoxOptions>) {
  return flow(field, outliersPoint, meta, axis, legend, tooltip, annotation(), interaction, animation, theme)(params);
}

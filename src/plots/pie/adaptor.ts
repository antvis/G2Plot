import { isFunction, isString, isNil, get, isArray, isNumber } from '@antv/util';
import { Params } from '../../core/adaptor';
import { legend, interaction, animation, theme, state, annotation } from '../../adaptor/common';
import { getMappingFunction } from '../../adaptor/geometries/base';
import { interval } from '../../adaptor/geometries';
import { flow, template, transformLabel, deepAssign, renderStatistic } from '../../utils';
import { DEFAULT_OPTIONS } from './contants';
import { adaptOffset, getTotalValue, processIllegalData, isAllZero } from './utils';
import { PieOptions } from './types';

/**
 * 字段
 * @param params
 */
function geometry(params: Params<PieOptions>): Params<PieOptions> {
  const { chart, options } = params;
  const { data, angleField, colorField, color, pieStyle } = options;

  // 处理不合法的数据
  let processData = processIllegalData(data, angleField);

  if (isAllZero(processData, angleField)) {
    // 数据全 0 处理，调整 position 映射
    const percentageField = '$$percentage$$';
    processData = processData.map((d) => ({ ...d, [percentageField]: 1 / processData.length }));
    chart.data(processData);

    const p = deepAssign({}, params, {
      options: {
        xField: '1',
        yField: percentageField,
        seriesField: colorField,
        isStack: true,
        interval: {
          color,
          style: pieStyle,
        },
        args: {
          zIndexReversed: true,
        },
      },
    });

    interval(p);
  } else {
    chart.data(processData);

    const p = deepAssign({}, params, {
      options: {
        xField: '1',
        yField: angleField,
        seriesField: colorField,
        isStack: true,
        interval: {
          color,
          style: pieStyle,
        },
        args: {
          zIndexReversed: true,
        },
      },
    });

    interval(p);
  }

  return params;
}

/**
 * meta 配置
 * @param params
 */
function meta(params: Params<PieOptions>): Params<PieOptions> {
  const { chart, options } = params;
  const { meta, colorField } = options;

  // meta 直接是 scale 的信息
  const scales = deepAssign({}, meta);
  chart.scale(scales, {
    [colorField]: { type: 'cat' },
  });

  return params;
}

/**
 * coord 配置
 * @param params
 */
function coordinate(params: Params<PieOptions>): Params<PieOptions> {
  const { chart, options } = params;
  const { radius, innerRadius, startAngle, endAngle } = options;

  chart.coordinate({
    type: 'theta',
    cfg: {
      radius,
      innerRadius,
      startAngle,
      endAngle,
    },
  });

  return params;
}

/**
 * label 配置
 * @param params
 */
function label(params: Params<PieOptions>): Params<PieOptions> {
  const { chart, options } = params;
  const { label, colorField, angleField } = options;

  const geometry = chart.geometries[0];
  // label 为 false, 空 则不显示 label
  if (!label) {
    geometry.label(false);
  } else {
    const { callback, ...cfg } = label;
    const labelCfg = transformLabel(cfg);

    // ① 提供模板字符串的 label content 配置
    if (labelCfg.content) {
      const { content } = labelCfg;
      labelCfg.content = (data: object, dataum: any, index: number) => {
        const name = data[colorField];
        const value = data[angleField];
        // dymatic get scale, scale is ready this time
        const angleScale = chart.getScaleByField(angleField);
        const percent = angleScale?.scale(value);
        return isFunction(content)
          ? // append pecent (number) to data, users can get origin data from `dataum._origin`
            content({ ...data, percent }, dataum, index)
          : isString(content)
          ? template(content as string, {
              value,
              name,
              // percentage (string), default keep 2
              percentage: isNumber(percent) && !isNil(value) ? `${(percent * 100).toFixed(2)}%` : null,
            })
          : content;
      };
    }

    const LABEL_LAYOUT_TYPE_MAP = {
      inner: '',
      outer: 'pie-outer',
      spider: 'pie-spider',
    };
    const labelLayoutType = labelCfg.type ? LABEL_LAYOUT_TYPE_MAP[labelCfg.type] : 'pie-outer';
    const labelLayoutCfg = labelCfg.layout ? (!isArray(labelCfg.layout) ? [labelCfg.layout] : labelCfg.layout) : [];
    labelCfg.layout = (labelLayoutType ? [{ type: labelLayoutType }] : []).concat(labelLayoutCfg);

    geometry.label({
      // fix: could not create scale, when field is undefined（attributes 中的 fields 定义都会被用来创建 scale）
      fields: colorField ? [angleField, colorField] : [angleField],
      callback,
      cfg: {
        ...labelCfg,
        offset: adaptOffset(labelCfg.type, labelCfg.offset),
        type: 'pie',
      },
    });
  }
  return params;
}

/**
 * statistic 中心文本配置
 * @param params
 */
export function pieAnnotation(params: Params<PieOptions>): Params<PieOptions> {
  const { chart, options } = params;
  const { innerRadius, statistic, angleField, colorField, meta } = options;
  // 先清空标注，再重新渲染
  chart.getController('annotation').clear(true);

  // 先进行其他 annotations，再去渲染统计文本
  flow(annotation())(params);

  /** 中心文本 指标卡 */
  if (innerRadius && statistic) {
    let { title, content } = deepAssign({}, DEFAULT_OPTIONS.statistic, statistic);
    if (title !== false) {
      title = deepAssign({}, { formatter: (datum) => (datum ? datum[colorField] : '总计') }, title);
    }
    if (content !== false) {
      content = deepAssign(
        {},
        {
          formatter: (datum, data) => {
            const metaFormatter = get(meta, [angleField, 'formatter']);
            const dataValue = datum ? datum[angleField] : getTotalValue(data, angleField);
            return metaFormatter ? metaFormatter(dataValue) : dataValue;
          },
        },
        content
      );
    }
    renderStatistic(chart, { statistic: { title, content }, plotType: 'pie' });
  }

  return params;
}

/**
 * 饼图 tooltip 配置
 * 1. 强制 tooltip.shared 为 false
 * @param params
 */
function tooltip(params: Params<PieOptions>): Params<PieOptions> {
  const { chart, options } = params;
  const { tooltip, colorField, angleField } = options;

  if (tooltip === false) {
    chart.tooltip(tooltip);
  } else {
    chart.tooltip(deepAssign({}, tooltip, { shared: false }));

    const fields = get(tooltip, 'fields') || [colorField, angleField];
    let formatter = get(tooltip, 'formatter');

    if (!formatter) {
      // 主要解决 all zero， 对于非 all zero 也适用
      formatter = (datum) => ({ name: datum[colorField], value: datum[angleField] });
    }
    chart.geometries[0].tooltip(fields.join('*'), getMappingFunction(fields, formatter));
  }

  return params;
}

/**
 * 饼图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<PieOptions>) {
  // flow 的方式处理所有的配置到 G2 API
  return flow<Params<PieOptions>>(
    geometry,
    meta,
    theme,
    coordinate,
    legend,
    tooltip,
    label,
    state,
    /** 指标卡中心文本 放在下层 */
    pieAnnotation,
    interaction,
    animation
  )(params);
}

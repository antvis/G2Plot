import { isFunction, isString, isNil, get, isArray, isNumber, each, toString, isEmpty } from '@antv/util';
import { Params } from '../../core/adaptor';
import { legend, animation, theme, state, annotation } from '../../adaptor/common';
import { getMappingFunction } from '../../adaptor/geometries/base';
import { interval } from '../../adaptor/geometries';
import { pattern } from '../../adaptor/pattern';
import { getLocale } from '../../core/locale';
import { Interaction } from '../../types/interaction';
import { flow, template, transformLabel, deepAssign, renderStatistic, processIllegalData } from '../../utils';
import { Data, Datum } from '../../types';
import { DEFAULT_OPTIONS } from './contants';
import { adaptOffset, getTotalValue, isAllZero } from './utils';
import { PIE_STATISTIC } from './interactions';
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
          sortZIndex: true,
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
          sortZIndex: true,
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
          ? // append percent (number) to data, users can get origin data from `dataum._origin`
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
 * statistic options 处理
 * 1. 默认继承 default options 的样式
 * 2. 默认使用 meta 的 formatter
 */
export function transformStatisticOptions(options: PieOptions): PieOptions {
  const { innerRadius, statistic, angleField, colorField, meta, locale } = options;

  const i18n = getLocale(locale);

  if (innerRadius && statistic) {
    let { title: titleOpt, content: contentOpt } = deepAssign({}, DEFAULT_OPTIONS.statistic, statistic);
    if (titleOpt !== false) {
      titleOpt = deepAssign(
        {},
        {
          formatter: (datum: Datum) => {
            // 交互中, datum existed.
            const text = datum
              ? datum[colorField]
              : !isNil(titleOpt.content)
              ? titleOpt.content
              : i18n.get(['statistic', 'total']);
            const metaFormatter = get(meta, [colorField, 'formatter']) || ((v) => v);
            return metaFormatter(text);
          },
        },
        titleOpt
      );
    }
    if (contentOpt !== false) {
      contentOpt = deepAssign(
        {},
        {
          formatter: (datum: Datum, data: Data) => {
            const dataValue = datum ? datum[angleField] : getTotalValue(data, angleField);
            const metaFormatter = get(meta, [angleField, 'formatter']) || ((v) => v);
            // 交互中
            if (datum) {
              return metaFormatter(dataValue);
            }
            return !isNil(contentOpt.content) ? contentOpt.content : metaFormatter(dataValue);
          },
        },
        contentOpt
      );
    }

    return deepAssign({}, { statistic: { title: titleOpt, content: contentOpt } }, options);
  }
  return options;
}

/**
 * statistic 中心文本配置
 * @param params
 */
export function pieAnnotation(params: Params<PieOptions>): Params<PieOptions> {
  const { chart, options } = params;
  const { innerRadius, statistic } = transformStatisticOptions(options);
  // 先清空标注，再重新渲染
  chart.getController('annotation').clear(true);

  // 先进行其他 annotations，再去渲染统计文本
  flow(annotation())(params);

  /** 中心文本 指标卡 */
  if (innerRadius && statistic) {
    renderStatistic(chart, { statistic, plotType: 'pie' });
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
  const { tooltip, colorField, angleField, data } = options;

  if (tooltip === false) {
    chart.tooltip(tooltip);
  } else {
    chart.tooltip(deepAssign({}, tooltip, { shared: false }));

    // 主要解决 all zero， 对于非 all zero 不再适用
    if (isAllZero(data, angleField)) {
      let fields = get(tooltip, 'fields');
      let formatter = get(tooltip, 'formatter');

      if (isEmpty(get(tooltip, 'fields'))) {
        fields = [colorField, angleField];
        formatter = formatter || ((datum) => ({ name: datum[colorField], value: toString(datum[angleField]) }));
      }
      chart.geometries[0].tooltip(fields.join('*'), getMappingFunction(fields, formatter));
    }
  }

  return params;
}

/**
 * Interaction 配置 (饼图特殊的 interaction, 中心文本变更的时候，需要将一些配置参数传进去）
 * @param params
 */
export function interaction(params: Params<PieOptions>): Params<PieOptions> {
  const { chart, options } = params;
  const { interactions, statistic, annotations } = transformStatisticOptions(options);

  each(interactions, (i: Interaction) => {
    if (i.enable === false) {
      chart.removeInteraction(i.type);
    } else if (i.type === 'pie-statistic-active') {
      // 只针对 start 阶段的配置，进行添加参数信息
      let startStages = [];
      if (!i.cfg?.start) {
        startStages = [
          {
            trigger: 'element:mouseenter',
            action: `${PIE_STATISTIC}:change`,
            arg: { statistic, annotations },
          },
        ];
      }
      each(i.cfg?.start, (stage) => {
        startStages.push({ ...stage, arg: { statistic, annotations } });
      });
      chart.interaction(i.type, deepAssign({}, i.cfg, { start: startStages }));
    } else {
      chart.interaction(i.type, i.cfg || {});
    }
  });

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
    pattern('pieStyle'),
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

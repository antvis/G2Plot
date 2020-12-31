import { every, filter, isFunction, isString, isNil, get, isArray, isNumber } from '@antv/util';
import { Params } from '../../core/adaptor';
import { legend, tooltip, interaction, animation, theme, state, annotation } from '../../adaptor/common';
import { interval } from '../../adaptor/geometries';
import { flow, LEVEL, log, template, transformLabel, deepAssign, renderStatistic } from '../../utils';
import { adaptOffset, getTotalValue } from './utils';
import { PieOptions } from './types';

/**
 * 字段
 * @param params
 */
function geometry(params: Params<PieOptions>): Params<PieOptions> {
  const { chart, options } = params;
  const { data, angleField, colorField, color, pieStyle } = options;

  // 处理不合法的数据
  let processData = filter(data, (d) => typeof d[angleField] === 'number' || isNil(d[angleField]));

  // 打印异常数据情况
  log(LEVEL.WARN, processData.length === data.length, 'illegal data existed in chart data.');

  const allZero = every(processData, (d) => d[angleField] === 0);
  if (allZero) {
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
      },
    });

    interval(p);

    // all zero 额外处理
    chart.geometries[0].tooltip(`${colorField}*${angleField}`);
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
function statistic(params: Params<PieOptions>): Params<PieOptions> {
  const { chart, options } = params;
  const { innerRadius, statistic, angleField, colorField, meta } = options;

  /** 中心文本 指标卡 */
  if (innerRadius && statistic) {
    let { title, content } = statistic;
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
 * 饼图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<PieOptions>) {
  // flow 的方式处理所有的配置到 G2 API
  return flow(
    geometry,
    meta,
    theme,
    coordinate,
    legend,
    tooltip,
    label,
    state,
    annotation(),
    /** 指标卡中心文本 放在下层 */
    statistic,
    interaction,
    animation
  )(params);
}

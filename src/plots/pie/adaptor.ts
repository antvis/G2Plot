import { deepMix, every, filter, get, isFunction, isString, isNil } from '@antv/util';
import { Params } from '../../core/adaptor';
import { legend, tooltip, interaction, animation, theme, state, annotation } from '../../adaptor/common';
import { Data } from '../../types';
import { flow, LEVEL, log, template } from '../../utils';
import { Annotation } from '../../types/annotation';
import { interval } from '../../adaptor/geometries';
import { PieOptions } from './types';
import { getTotalValue } from './utils';

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

    const p = deepMix({}, params, {
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

    const p = deepMix({}, params, {
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
  const scales = deepMix({}, meta);
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
  const { radius, innerRadius } = options;

  chart.coordinate({
    type: 'theta',
    cfg: {
      radius,
      innerRadius,
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
    const labelCfg = cfg;

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
              percentage: percent ? `${(percent * 100).toFixed(2)}%` : null,
            })
          : content;
      };
    }

    // ② 转换 label type 和 layout type
    const LABEL_TYPE_MAP = {
      inner: 'pie-inner',
      outer: 'pie',
    };
    const LABEL_LAYOUT_TYPE_MAP = {
      inner: '',
      outer: 'pie-outer',
    };
    const labelType = LABEL_TYPE_MAP[labelCfg.type] || 'pie';
    const labelLayoutType = LABEL_LAYOUT_TYPE_MAP[labelCfg.type] || 'pie-outer';
    labelCfg.type = labelType;
    labelCfg.layout = deepMix({}, labelCfg.layout, { type: labelLayoutType });

    geometry.label({
      // fix: could not create scale, when field is undefined（attributes 中的 fields 定义都会被用来创建 scale）
      fields: colorField ? [angleField, colorField] : [angleField],
      callback,
      cfg: labelCfg,
    });
  }
  return params;
}

/**
 * annotation 配置
 * 内置标注：
 *   1. 中心文本
 * @param params
 */
function pieAnnotation(params: Params<PieOptions>): Params<PieOptions> {
  const { options } = params;
  const { innerRadius, statistic, angleField } = options;

  const annotationOptions = [];

  /** 中心文本 指标卡 */
  if (innerRadius && statistic) {
    const { title, content } = statistic;

    let statisticTitle: Annotation = {
      type: 'text',
      content: '',
      position: ['50%', '50%'],
    };
    let statisticContent: Annotation = {
      type: 'text',
      content: '',
      position: ['50%', '50%'],
    };

    const getStatisticData = (data: Data) => ({
      title: '总计',
      value: getTotalValue(data, angleField),
    });

    if (title !== false) {
      let titleLineHeight = get(title, 'style.lineHeight');
      if (!titleLineHeight) {
        titleLineHeight = get(title, 'style.fontSize', 20);
      }
      const titleFormatter = get(title, 'formatter');

      statisticTitle = {
        type: 'text',
        position: ['50%', '50%'],
        content: (filterData: Data) => {
          const statisticData = getStatisticData(filterData);
          return titleFormatter ? titleFormatter(statisticData, filterData) : statisticData.title;
        },
        ...deepMix(
          {},
          {
            offsetY: content === false ? 0 : -titleLineHeight,
            // append-info
            key: 'statistic',
            style: {
              textAlign: 'center',
            },
          },
          title
        ),
      };
    }

    if (content !== false) {
      let valueLineHeight = get(content, 'style.lineHeight');
      if (!valueLineHeight) {
        valueLineHeight = get(content, 'style.fontSize', 20);
      }
      const contentFormatter = get(content, 'formatter');

      statisticContent = {
        type: 'text',
        position: ['50%', '50%'],
        content: (filterData: Data) => {
          const statisticData = getStatisticData(filterData);
          return contentFormatter ? contentFormatter(statisticData, filterData) : statisticData.value;
        },
        ...deepMix(
          {},
          {
            // 居中
            offsetY: title === false ? 0 : valueLineHeight,
            // append-info
            key: 'statistic',
            style: {
              textAlign: 'center',
            },
          },
          content
        ),
      };
    }

    annotationOptions.push(statisticTitle, statisticContent);
  }

  return flow(annotation(annotationOptions))(params);
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
    pieAnnotation,
    interaction,
    animation
  )(params);
}

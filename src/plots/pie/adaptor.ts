import { deepMix, each, every, get, isFunction } from '@antv/util';
import { Params } from '../../core/adaptor';
import { tooltip, interaction, animation, theme } from '../../common/adaptor';
import { flow } from '../../utils';
import { StatisticContentStyle, StatisticTitleStyle } from './constants';
import { PieOptions } from './types';
import { getStatisticData } from './utils';

/**
 * 字段
 * @param params
 */
function field(params: Params<PieOptions>): Params<PieOptions> {
  const { chart, options } = params;
  const { data, angleField, colorField, color } = options;

  const geometry = chart.interval();

  const allZero = every(data, (d) => d[angleField] === 0);
  if (allZero) {
    // 数据全 0 处理，调整 position 映射
    const percentageField = '$$percentage$$';
    chart.data(data.map((d) => ({ ...d, [percentageField]: 1 / data.length })));
    geometry.position(`1*${percentageField}`).adjust({ type: 'stack' }).tooltip(`${colorField}*${angleField}`);
  } else {
    chart.data(data);
    geometry.position(`1*${angleField}`).adjust({ type: 'stack' });
  }

  if (colorField) {
    geometry.color(colorField, color);
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
function coord(params: Params<PieOptions>): Params<PieOptions> {
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
 * legend 配置
 * @param params
 */
function legend(params: Params<PieOptions>): Params<PieOptions> {
  const { chart, options } = params;
  const { legend, colorField } = options;

  if (legend && colorField) {
    chart.legend(colorField, legend);
  }

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
    geometry.label({
      fields: [angleField, colorField],
      callback,
      cfg,
    });
  }
  return params;
}

/**
 * style 配置
 * @param params
 */
function style(params: Params<PieOptions>): Params<PieOptions> {
  const { chart, options } = params;
  const { pieStyle, angleField, colorField } = options;

  const geometry = chart.geometries[0];
  if (pieStyle && geometry) {
    if (isFunction(pieStyle)) {
      geometry.style(`${angleField}*${colorField}`, pieStyle);
    } else {
      geometry.style(pieStyle);
    }
  }

  return params;
}

/**
 * annotation 配置
 * 1. 中心文本
 * @param params
 */
function annotation(params: Params<PieOptions>): Params<PieOptions> {
  const { chart, options } = params;
  const { innerRadius, statistic, angleField, colorField } = options;

  const annotationController = chart.getController('annotation');
  // todo remove ignore
  // @ts-ignore
  annotationController.clear(true);

  const annotationOptions = [];

  /** 中心文本 指标卡 */
  if (innerRadius && statistic) {
    const { title, content } = statistic;

    let titleLineHeight = get(title, 'style.lineHeight');
    if (!titleLineHeight) {
      titleLineHeight = get(title, 'style.fontSize', 20);
    }

    let valueLineHeight = get(content, 'style.lineHeight');
    if (!valueLineHeight) {
      valueLineHeight = get(content, 'style.fontSize', 20);
    }

    const filterData = chart.getData();

    const angleScale = chart.getScaleByField(angleField);
    const colorScale = chart.getScaleByField(colorField);
    const statisticData = getStatisticData(filterData, angleScale, colorScale);
    const titleFormatter = get(title, 'formatter');
    const contentFormatter = get(content, 'formatter');

    annotationOptions.push(
      {
        type: 'text',
        position: ['50%', '50%'],
        content: titleFormatter ? titleFormatter(statisticData, filterData) : statisticData.title,
        ...deepMix(
          {},
          {
            // default config
            style: StatisticTitleStyle,
            offsetY: -titleLineHeight,
            // append-info
            key: 'statistic',
          },
          title
        ),
      },
      {
        type: 'text',
        position: ['50%', '50%'],
        content: contentFormatter ? contentFormatter(statisticData, filterData) : statisticData.value,
        ...deepMix(
          {},
          {
            // default config
            style: StatisticContentStyle,
            offsetY: valueLineHeight,
            // append-info
            key: 'statistic',
          },
          content
        ),
      }
    );

    chart.render();
  }

  /** 自定义 annotation */
  each(annotationOptions, (annotationOption) => {
    // @ts-ignore
    annotationController.annotation(annotationOption);
  });

  return params;
}

/**
 * 折线图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<PieOptions>) {
  // flow 的方式处理所有的配置到 G2 API
  flow(field, meta, theme, coord, legend, tooltip, label, style, annotation, interaction, animation)(params);
}

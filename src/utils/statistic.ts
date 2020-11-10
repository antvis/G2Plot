import { View } from '@antv/g2';
import { each, get, isNumber } from '@antv/util';
import { Datum, Meta, ShapeStyle, StatisticText } from '../types';
import { PieOptions } from '../plots/pie/types';
import { getTotalValue } from '../plots/pie/utils';
import { pick, kebabCase } from '.';

export type TextStyle = {
  fontSize?: number;
  lineHeight?: number;
  [k: string]: string | number;
};

/**
 * @desc 生成 html-statistic 的 style 字符串 (兼容 canvas 的 shapeStyle 到 css样式上)
 *
 * @param width
 * @param style
 */
export function adapteStyle(style?: StatisticText['style']): object {
  const styleObject = {
    overflow: 'hidden',
    'white-space': 'nowrap',
    'text-overflow': 'ellipsis',
  };

  const shapeStyleKeys = [
    'stroke',
    'lineWidth',
    'shadowColor',
    'strokeOpacity',
    'shadowBlur',
    'shadowOffsetX',
    'shadowOffsetY',
  ];

  each(style, (v, k) => {
    if (['fontSize', 'width', 'height'].includes(k) && isNumber(v)) {
      styleObject[kebabCase(k)] = `${v}px`;
    } else if (k === 'fill') {
      styleObject['color'] = v;
    } else if (k && !shapeStyleKeys.includes(k)) {
      styleObject[kebabCase(k)] = `${v}`;
    }
  });

  const { stroke, lineWidth = 0, shadowColor, shadowBlur = 0, shadowOffsetX = 0, shadowOffsetY = 0 } = pick(
    style,
    shapeStyleKeys
  ) as ShapeStyle;

  styleObject['text-shadow'] = `${[shadowColor, `${shadowOffsetX}px`, `${shadowOffsetY}px`, `${shadowBlur}px`].join(
    ' '
  )}`;
  styleObject['-webkit-text-stroke'] = `${[`${lineWidth}px`, stroke].join(' ')}`;

  return styleObject;
}

/**
 * @desc 设置 html-statistic 容器的默认样式
 *
 * - 默认事件穿透
 */
export function setStatisticContainerStyle(container: HTMLElement, style: Partial<CSSStyleDeclaration>) {
  container.style['pointer-events'] = 'none';
  each(style, (v, k) => {
    if (k && v) {
      container.style[k] = v;
    }
  });
}

/**
 * 渲染 html-annotation
 * @param chart
 * @param options
 * @param meta 字段元信息
 * @param {optional} datum 当前的元数据
 */
export const renderStatistic = (
  chart: View,
  options: Pick<PieOptions, 'radius' | 'innerRadius' | 'statistic'>,
  meta: { content: Meta & { field: string } },
  datum?: Datum
) => {
  const { statistic } = options;
  const { title: titleOpt, content: contentOpt } = statistic;

  if (titleOpt) {
    const cfgOffsetY = titleOpt.offsetY || 0;

    chart.annotation().html({
      position: ['50%', '50%'],
      html: (container, view) => {
        const coordinate = view.getCoordinate();
        const containerWidth = coordinate.getRadius() * coordinate.innerRadius * 2;
        setStatisticContainerStyle(container, {
          transform: contentOpt ? 'translate(-50%, -100%)' : 'translate(-50%, -50%)',
          width: `${containerWidth}px`,
          // user's style setting has high priority
          ...adapteStyle(titleOpt.style),
        });

        const filteredData = view.getData();
        if (titleOpt.customHtml) {
          return titleOpt.customHtml(container, view, datum, filteredData);
        }
        let text = '总计';
        if (titleOpt.formatter) {
          text = titleOpt.formatter(datum, filteredData);
        }
        // todo G2 层修复可以返回空字符串
        return text ? text : '<div></div>';
      },
      offsetY: cfgOffsetY,
      // @ts-ignore
      key: 'top-statistic',
      // 透传配置
      ...pick(titleOpt, ['position', 'offsetX', 'rotate', 'style', 'formatter']),
    });
  }

  if (contentOpt) {
    const cfgOffsetY = contentOpt.offsetY || 0;

    chart.annotation().html({
      position: ['50%', '50%'],
      html: (container, view) => {
        const coordinate = view.getCoordinate();
        const containerWidth = coordinate.getRadius() * coordinate.innerRadius * 2;

        setStatisticContainerStyle(container, {
          transform: titleOpt ? 'translate(-50%, 0)' : 'translate(-50%, -50%)',
          width: `${containerWidth}px`,
          // user's style setting has high priority
          ...adapteStyle(contentOpt.style),
        });

        const filteredData = view.getData();
        if (contentOpt.customHtml) {
          return contentOpt.customHtml(container, view, datum, filteredData);
        }

        const formatter = get(contentOpt, 'formatter');
        const metaFormatter = get(meta, 'formatter');
        const totalValue = getTotalValue(filteredData, meta.content.field);

        let text = metaFormatter ? metaFormatter(totalValue) : totalValue ? `${totalValue}` : '';

        if (formatter) {
          text = formatter(datum, filteredData);
        }

        return text ? text : '<div></div>';
      },
      offsetY: cfgOffsetY,
      // @ts-ignore
      key: 'bottom-statistic',
      // 透传配置
      ...pick(contentOpt, ['position', 'offsetX', 'rotate', 'style', 'formatter']),
    });
  }
};

/**
 * 渲染 html-annotation for gauge (等不规则 plot)
 * @param chart
 * @param options
 * @param meta 字段元信息
 * @param {optional} datum 当前的元数据
 */
export const renderGaugeStatistic = (
  chart: View,
  options: Pick<PieOptions, 'radius' | 'innerRadius' | 'statistic'>,
  datum?: Datum
) => {
  const { statistic } = options;
  const { title: titleOpt, content: contentOpt } = statistic;

  if (titleOpt) {
    const cfgOffsetY = titleOpt.offsetY || 0;
    let transformY = '0';
    // @ts-ignore 兼容 shapeStyle 设置
    if (titleOpt.style?.textBaseline === 'bottom') {
      transformY = '-100%';
    }
    chart.annotation().html({
      position: ['50%', '100%'],
      html: (container, view) => {
        const coordinate = view.getCoordinate();
        const containerWidth = coordinate.getRadius() * coordinate.innerRadius * 2;
        setStatisticContainerStyle(container, {
          transform: contentOpt ? 'translate(-50%, -100%)' : `translate(-50%, ${transformY})`,
          width: `${containerWidth}px`,
          // user's style setting has high priority
          ...adapteStyle(titleOpt.style),
        });

        const filteredData = view.getData();
        if (titleOpt.customHtml) {
          return titleOpt.customHtml(container, view, datum, filteredData);
        }
        let text = '';
        if (titleOpt.formatter) {
          text = titleOpt.formatter(datum);
        }
        return text ? text : '<div></div>';
      },
      offsetY: cfgOffsetY,
      // 透传配置
      ...pick(titleOpt, ['offsetX', 'rotate', 'style', 'formatter']),
    });
  }

  if (contentOpt) {
    const cfgOffsetY = contentOpt.offsetY || 0;

    chart.annotation().html({
      position: ['50%', '100%'],
      html: (container, view) => {
        const coordinate = view.getCoordinate();
        const containerWidth = coordinate.getRadius() * coordinate.innerRadius * 2;

        setStatisticContainerStyle(container, {
          transform: 'translate(-50%, -100%)',
          width: `${containerWidth}px`,
          // user's style setting has high priority
          ...adapteStyle(contentOpt.style),
        });

        const filteredData = view.getData();
        const formatter = get(contentOpt, 'formatter');
        let text = '';
        if (contentOpt.customHtml) {
          return contentOpt.customHtml(container, view, datum, filteredData);
        }
        if (formatter) {
          text = formatter(datum);
        }

        return text ? text : '<div></div>';
      },
      offsetY: cfgOffsetY,
      // 透传配置
      ...pick(contentOpt, ['offsetX', 'rotate', 'style', 'formatter']),
    });
  }
};

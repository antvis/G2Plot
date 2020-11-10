import { View } from '@antv/g2';
import { each, get, isNumber } from '@antv/util';
import { ShapeStyle } from '../../../types';
import { pick } from '../../../utils';
import { PieOptions } from '../types';
import { kebabCase } from './kebab-case';
import { getTotalValue } from '.';

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
export function adapteStyle(style?: CSSStyleDeclaration): object {
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
 * 渲染 html-annotation
 * @param chart
 * @param options
 */
export const renderStatistic = (
  chart: View,
  options: Pick<PieOptions, 'radius' | 'innerRadius' | 'angleField' | 'colorField' | 'statistic' | 'meta'>
) => {
  const { angleField, statistic, meta } = options;
  const { title: titleOpt, content: contentOpt } = statistic;

  if (titleOpt) {
    const cfgOffsetY = titleOpt.offsetY || 0;

    chart.annotation().html({
      position: ['50%', '50%'],
      html: (container, view) => {
        const filteredData = view.getData();

        container.style['pointer-events'] = 'none';
        container.style.transform = contentOpt ? 'translate(-50%, -100%)' : 'translate(-50%, -50%)';
        each(adapteStyle(titleOpt.style), (v, k) => {
          container.style[k] = v;
        });

        if (titleOpt.customHtml) {
          return titleOpt.customHtml(container, view, null, filteredData);
        }
        return (titleOpt.formatter && titleOpt.formatter(null, filteredData)) || '总计';
      },
      offsetX: titleOpt.offsetX,
      offsetY: cfgOffsetY,
      // @ts-ignore
      key: 'top-statistic',
      // 透传配置
      ...pick(titleOpt, ['style', 'formatter']),
    });
  }

  if (contentOpt) {
    const cfgOffsetY = contentOpt.offsetY || 0;

    chart.annotation().html({
      position: ['50%', '50%'],
      html: (container, view) => {
        const filteredData = view.getData();
        container.style['pointer-events'] = 'none';
        container.style.transform = titleOpt ? 'translate(-50%, 0)' : 'translate(-50%, -50%)';
        each(adapteStyle(contentOpt.style), (v, k) => {
          container.style[k] = v;
        });
        if (contentOpt.customHtml) {
          return contentOpt.customHtml(container, view, null, filteredData);
        }

        const formatter = get(contentOpt, 'formatter');
        const metaFormatter = get(meta, [angleField, 'formatter']);
        const totalValue = getTotalValue(filteredData, angleField);

        return (
          (formatter && formatter(null, filteredData)) ||
          (metaFormatter && metaFormatter(totalValue)) ||
          `${totalValue}`
        );
      },
      offsetX: contentOpt.offsetX,
      offsetY: cfgOffsetY,
      // @ts-ignore
      key: 'bottom-statistic',
      // 透传配置
      ...pick(contentOpt, ['style', 'formatter']),
    });
  }
  chart.render(true);
};

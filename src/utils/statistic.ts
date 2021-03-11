import { View, IGroup } from '@antv/g2';
import { each, get, isNumber, isFunction, isString } from '@antv/util';
import { Datum, ShapeStyle, Statistic, StatisticText } from '../types';
import { pick, kebabCase } from '.';

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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const shapeStyleKeys = [
    'stroke',
    'lineWidth',
    'shadowColor',
    'strokeOpacity',
    'shadowBlur',
    'shadowOffsetX',
    'shadowOffsetY',
    'fill',
  ];

  // 兼容 shapeStyle 设置 · start
  if (get(style, 'fill')) {
    styleObject['color'] = style['fill'];
  }
  const { shadowColor, shadowBlur = 0, shadowOffsetX = 0, shadowOffsetY = 0 } = pick(
    style,
    shapeStyleKeys
  ) as ShapeStyle;
  styleObject['text-shadow'] = `${[shadowColor, `${shadowOffsetX}px`, `${shadowOffsetY}px`, `${shadowBlur}px`].join(
    ' '
  )}`;

  const { stroke, lineWidth = 0 } = pick(style, shapeStyleKeys) as ShapeStyle;
  styleObject['-webkit-text-stroke'] = `${[`${lineWidth}px`, stroke].join(' ')}`;
  // 兼容 shapeStyle 设置 · end

  each(style, (v, k) => {
    //  兼容 shapeStyle 的 fontSize 没有单位
    if (['fontSize'].includes(k) && isNumber(v)) {
      styleObject[kebabCase(k)] = `${v}px`;
    } else if (k && !shapeStyleKeys.includes(k)) {
      styleObject[kebabCase(k)] = `${v}`;
    }
  });

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
 * 渲染环图 html-annotation（默认 position 居中 [50%, 50%]）
 * @param chart
 * @param options
 * @param meta 字段元信息
 * @param {optional} datum 当前的元数据
 */
export const renderStatistic = (chart: View, options: { statistic: Statistic; plotType: string }, datum?: Datum) => {
  const { statistic, plotType } = options;
  const { title: titleOpt, content: contentOpt } = statistic;

  [titleOpt, contentOpt].forEach((option, idx) => {
    if (!option) {
      return;
    }
    let text = '';
    let transform = '';
    if (idx === 0) {
      transform = contentOpt ? 'translate(-50%, -100%)' : 'translate(-50%, -50%)';
    } else {
      transform = titleOpt ? 'translate(-50%, 0)' : 'translate(-50%, -50%)';
    }
    const style = isFunction(option.style) ? option.style(datum) : option.style;

    chart.annotation().html({
      position: ['50%', '50%'],
      html: (container, view) => {
        const coordinate = view.getCoordinate();
        let containerW = 0;
        if (plotType === 'pie' || plotType === 'ring-progress') {
          containerW = coordinate.getRadius() * coordinate.innerRadius * 2;
        } else if (plotType === 'liquid') {
          const liquidShape = get(view.geometries, [0, 'elements', 0, 'shape']);
          if (liquidShape) {
            // 获取到水波图边框大小
            const path = (liquidShape as IGroup).find((t) => t.get('name') === 'wrap');
            const { width } = path.getCanvasBBox();
            containerW = width;
          }
        } else if (!containerW) {
          // 保底方案
          containerW = coordinate.getWidth();
        }
        setStatisticContainerStyle(container, {
          width: `${containerW}px`,
          transform,
          // user's style setting has high priority
          ...adapteStyle(style),
        });

        const filteredData = view.getData();
        if (option.customHtml) {
          return option.customHtml(container, view, datum, filteredData);
        }
        if (option.formatter) {
          text = option.formatter(datum, filteredData);
        }
        // todo G2 层修复可以返回空字符串 & G2 层修复允许返回非字符串的内容，比如数值 number
        return text ? (isString(text) ? text : `${text}`) : '<div></div>';
      },
      // @ts-ignore
      key: `${idx === 0 ? 'top' : 'bottom'}-statistic`,
      ...pick(option, ['offsetX', 'offsetY', 'rotate', 'style', 'formatter']) /** 透传配置 */,
    });
  });
};

/**
 * 渲染 html-annotation for gauge (等不规则 plot), 默认 position 居中居底 [50%, 100%]）
 * @param chart
 * @param options
 * @param meta 字段元信息
 * @param {optional} datum 当前的元数据
 */
export const renderGaugeStatistic = (chart: View, options: { statistic: Statistic }, datum?: Datum) => {
  const { statistic } = options;
  const { title: titleOpt, content: contentOpt } = statistic;

  [titleOpt, contentOpt].forEach((option) => {
    if (!option) {
      return;
    }
    let text = '';
    const style = isFunction(option.style) ? option.style(datum) : option.style;
    chart.annotation().html({
      position: ['50%', '100%'],
      html: (container, view) => {
        const coordinate = view.getCoordinate();
        // 弧形的坐标
        const polarCoord = view.views[0].getCoordinate();
        const polarCenter = polarCoord.getCenter();
        const polarRadius = polarCoord.getRadius();
        const polarMaxY = Math.max(Math.sin(polarCoord.startAngle), Math.sin(polarCoord.endAngle)) * polarRadius;
        const offsetY = polarCenter.y + polarMaxY - coordinate.y.start - parseFloat(get(style, 'fontSize', 0));

        const containerWidth = coordinate.getRadius() * coordinate.innerRadius * 2;
        setStatisticContainerStyle(container, {
          width: `${containerWidth}px`,
          transform: `translate(-50%, ${offsetY}px)`,
          // user's style setting has high priority
          ...adapteStyle(style),
        });

        const filteredData = view.getData();
        if (option.customHtml) {
          return option.customHtml(container, view, datum, filteredData);
        }
        if (option.formatter) {
          text = option.formatter(datum, filteredData);
        }

        // todo G2 层修复可以返回空字符串 & G2 层修复允许返回非字符串的内容，比如数值 number
        return text ? (isString(text) ? text : `${text}`) : '<div></div>';
      },
      ...pick(option, ['offsetX', 'offsetY', 'rotate', 'style', 'formatter']) /** 透传配置 */,
    });
  });
};

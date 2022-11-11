import { Coordinate, Element, Geometry, getTheme, IGroup, ShapeAttrs, View } from '@antv/g2';
import { each, find, isObject, map } from '@antv/util';
import { Params } from '../core/adaptor';
import { Options } from '../types';
import { deepAssign } from '../utils';
import { conversionTagFormatter } from '../utils/conversion';

/** 转化率组件配置选项 */
export interface ConversionTagOptions {
  /** tag 高度 */
  size?: number;
  /** tag 对柱子间距 */
  spacing?: number;
  /** tag 距离轴线距离 */
  offset?: number;
  /** 箭头形状配置 */
  arrow?:
    | {
        /** 箭头宽度 */
        headSize?: number;
        /** 箭头样式 */
        style?: ShapeAttrs;
      }
    | false;
  /** 文本配置 */
  text?:
    | {
        /** 文字大小 */
        size?: number;
        /** 文字样式 */
        style?: ShapeAttrs;
        /** 文本格式化 */
        formatter?: (prev: number, next: number) => string;
      }
    | false;
}

export interface OptionWithConversionTag {
  conversionTag?: ConversionTagOptions | false;
}

/** 控制转化率组件绘制的选项 */
type TagRenderConfig = {
  /** 所在的 View */
  view: View;
  /** 所属的 geometry */
  geometry: Geometry;
  /** 转化率组件的 group */
  group: IGroup;
  /** 转化率配置 */
  options: ConversionTagOptions;
  /** 用于转化率计算的字段 */
  field: string;
  /** 水平/垂直 */
  horizontal: boolean;
};

function getConversionTagOptionsWithDefaults(options: ConversionTagOptions, horizontal: boolean): ConversionTagOptions {
  return deepAssign(
    {
      size: horizontal ? 32 : 80,
      spacing: horizontal ? 8 : 12,
      offset: horizontal ? 32 : 0,
      arrow: options.arrow !== false && {
        headSize: 12,
        style: {
          fill: 'rgba(0, 0, 0, 0.05)',
        },
      },
      text: options.text !== false && {
        style: {
          fontSize: 12,
          fill: 'rgba(0, 0, 0, 0.85)',
          textAlign: 'center',
          textBaseline: 'middle',
        },
        formatter: conversionTagFormatter,
      },
    },
    options
  );
}

function parsePoints(coordinate: Coordinate, element: Element): { x: number; y: number }[] {
  // @ts-ignore
  return map(element.getModel().points, (point) => coordinate.convertPoint(point));
}

function renderArrowTag(config: TagRenderConfig, elemPrev: Element, elemNext: Element): void {
  const { view, geometry, group, options, horizontal } = config;
  const { offset, size, arrow } = options;
  const coordinate = view.getCoordinate();
  const pointPrev = parsePoints(coordinate, elemPrev)[3];
  const pointNext = parsePoints(coordinate, elemNext)[0];
  const totalHeight = pointNext.y - pointPrev.y;
  const totalWidth = pointNext.x - pointPrev.x;

  if (typeof arrow === 'boolean') {
    return;
  }
  const { headSize } = arrow;
  let spacing = options.spacing;
  let points;

  if (horizontal) {
    if ((totalWidth - headSize) / 2 < spacing) {
      // 当柱间距不足容纳箭头尖与间隔时，画三角并挤占间隔
      spacing = Math.max(1, (totalWidth - headSize) / 2);
      points = [
        [pointPrev.x + spacing, pointPrev.y - offset],
        [pointPrev.x + spacing, pointPrev.y - offset - size],
        [pointNext.x - spacing, pointNext.y - offset - size / 2],
      ];
    } else {
      // 当柱间距足够时，画完整图形并留出间隔。
      points = [
        [pointPrev.x + spacing, pointPrev.y - offset],
        [pointPrev.x + spacing, pointPrev.y - offset - size],
        [pointNext.x - spacing - headSize, pointNext.y - offset - size],
        [pointNext.x - spacing, pointNext.y - offset - size / 2],
        [pointNext.x - spacing - headSize, pointNext.y - offset],
      ];
    }
  } else {
    if ((totalHeight - headSize) / 2 < spacing) {
      // 当柱间距不足容纳箭头尖与间隔时，画三角并挤占间隔
      spacing = Math.max(1, (totalHeight - headSize) / 2);
      points = [
        [pointPrev.x + offset, pointPrev.y + spacing],
        [pointPrev.x + offset + size, pointPrev.y + spacing],
        [pointNext.x + offset + size / 2, pointNext.y - spacing],
      ];
    } else {
      // 当柱间距足够时，画完整图形并留出间隔。
      points = [
        [pointPrev.x + offset, pointPrev.y + spacing],
        [pointPrev.x + offset + size, pointPrev.y + spacing],
        [pointNext.x + offset + size, pointNext.y - spacing - headSize],
        [pointNext.x + offset + size / 2, pointNext.y - spacing],
        [pointNext.x + offset, pointNext.y - spacing - headSize],
      ];
    }
  }

  group.addShape('polygon', {
    id: `${view.id}-conversion-tag-arrow-${geometry.getElementId(elemPrev.getModel().mappingData)}`,
    name: 'conversion-tag-arrow',
    origin: {
      element: elemPrev,
      nextElement: elemNext,
    },
    attrs: {
      ...(arrow.style || {}),
      points,
    },
  });
}

function renderTextTag(config: TagRenderConfig, elemPrev: Element, elemNext: Element): void {
  const { view, geometry, group, options, field, horizontal } = config;
  const { offset, size } = options;
  if (typeof options.text === 'boolean') {
    return;
  }
  const coordinate = view.getCoordinate();
  const text = options.text?.formatter && options.text?.formatter(elemPrev.getData()[field], elemNext.getData()[field]);

  const pointPrev = parsePoints(coordinate, elemPrev)[horizontal ? 3 : 0];
  const pointNext = parsePoints(coordinate, elemNext)[horizontal ? 0 : 3];

  const textShape = group.addShape('text', {
    id: `${view.id}-conversion-tag-text-${geometry.getElementId(elemPrev.getModel().mappingData)}`,
    name: 'conversion-tag-text',
    origin: {
      element: elemPrev,
      nextElement: elemNext,
    },
    attrs: {
      ...(options.text?.style || {}),
      text,
      x: horizontal ? (pointPrev.x + pointNext.x) / 2 : pointPrev.x + offset + size / 2,
      y: horizontal ? pointPrev.y - offset - size / 2 : (pointPrev.y + pointNext.y) / 2,
    },
  });

  if (horizontal) {
    const totalWidth = pointNext.x - pointPrev.x;
    const { width: textWidth } = textShape.getBBox();
    if (textWidth > totalWidth) {
      const cWidth = textWidth / text.length;
      const cEnd = Math.max(1, Math.ceil(totalWidth / cWidth) - 1);
      const textAdjusted = `${text.slice(0, cEnd)}...`;
      textShape.attr('text', textAdjusted);
    }
  }
}

function renderTag(options: TagRenderConfig, elemPrev: Element, elemNext: Element): void {
  renderArrowTag(options, elemPrev, elemNext);
  renderTextTag(options, elemPrev, elemNext);
}

/**
 * 返回支持转化率组件的 adaptor，适用于柱形图/条形图
 * @param field 用户转化率计算的字段
 * @param horizontal 是否水平方向的转化率
 * @param disabled 是否禁用
 */
export function conversionTag<O extends OptionWithConversionTag & Options>(
  field: string,
  horizontal = true,
  disabled = false
) {
  return function (params: Params<O>): Params<O> {
    const { options, chart } = params;
    const { conversionTag, theme } = options;

    if (conversionTag && !disabled) {
      // 有转化率组件时，柱子宽度占比自动为 1/3
      chart.theme(
        deepAssign({}, isObject(theme) ? theme : getTheme(theme), {
          columnWidthRatio: 1 / 3,
        })
      );
      // 使用  shape annotation 绘制转化率组件
      chart.annotation().shape({
        render: (container, view) => {
          const group = container.addGroup({
            id: `${chart.id}-conversion-tag-group`,
            name: 'conversion-tag-group',
          });
          const interval = find(chart.geometries, (geom: Geometry) => geom.type === 'interval');
          const config: TagRenderConfig = {
            view,
            geometry: interval,
            group,
            field,
            horizontal,
            options: getConversionTagOptionsWithDefaults(conversionTag, horizontal),
          };
          const elements = interval.elements;
          each(elements, (elem: Element, idx: number) => {
            if (idx > 0) {
              renderTag(config, elements[idx - 1], elem);
            }
          });
        },
      });
    }

    return params;
  };
}

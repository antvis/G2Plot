import { every, each, groupBy, findIndex, uniq, map, size } from '@antv/util';
import { registerLabelComponent } from '../../../components/label/base';
import { IShape, Geometry, Element, ORIGIN, FIELD_ORIGIN } from '../../../dependents';
import ColumnLabel from './label';
import { getOverlapArea, moveInPanel, checkShapeOverlap } from '../../../util/view';
import BBox from '../../../util/bbox';
import { isContrastColorWhite } from '../../../util/color';
import { IColumnAutoLabel } from '../interface';

/** 自动模式的 Column 数据标签，会根据图形和数据标签自动优化数据标签布局和样式等 */
export default class ColumnAutoLabel extends ColumnLabel<IColumnAutoLabel> {
  protected getPosition(element: Element): { x: number; y: number } {
    const offset = this.getDefaultOffset();
    const value = this.getValue(element);
    const bbox = this.getElementShapeBBox(element);
    const { minX, minY, maxY, width } = bbox;
    const { offsetX, offsetY } = this.options;
    const x = minX + width / 2 + offsetX;
    const dir = value > 0 ? -1 : 1;
    const root = value > 0 ? minY : maxY;
    const y = root + offset * dir + offsetY;

    // 默认全部先设置为 top
    return { x, y };
  }

  /** 默认的 fill 取自用户配置或主题配置 */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected getTextFill(element: Element) {
    const { style } = this.options;

    return style.fill;
  }

  /** 默认不描边 */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected getTextStroke(element: Element) {
    return undefined;
  }

  /** 默认无处理：在 layout 阶段处理 */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected adjustLabel(label: IShape, element: Element): void {
    // empty
  }

  /** 自动布局所有的数据标签 */
  protected layoutLabels(geometry: Geometry, labels: IShape[]): void {
    if (this.shouldInShapeLabels(labels)) {
      this.inShapeLabels(geometry, labels);
    }
    this.autoHideLabels(geometry, labels);
  }

  /** 判断是否可以把数据标签放置在柱子内部 */
  protected shouldInShapeLabels(labels: IShape[]): boolean {
    return every(labels, (label) => {
      const labelBBox = label.getBBox();
      const element: Element = label.get('element');
      const bbox = this.getElementShapeBBox(element);

      return bbox.width >= labelBBox.width;
    });
  }

  /** 内置数据标签，并自动设置颜色描边等属性 */
  protected inShapeLabels(geometry: Geometry, labels: IShape[]) {
    const coordinateBBox = this.getCoordinateBBox();
    const [xField] = geometry.getXYFields();
    const { darkStyle, lightStyle } = this.options;
    const groupedLabels = groupBy(labels, (label) => label.get(ORIGIN)[FIELD_ORIGIN][xField]);
    each(labels, (label: IShape) => {
      const curGroup = groupedLabels[label.get(ORIGIN)[FIELD_ORIGIN][xField]] || [];
      const element: Element = label.get('element');
      const { shape } = element;
      const fillWhite = isContrastColorWhite(shape.attr('fill'));
      const shapeBBox = this.getElementShapeBBox(element);
      const labelBBox = BBox.fromBBoxObject(label.getBBox());

      // 如果 Column 本身就不可见，直接隐藏对应的 label
      if (getOverlapArea(coordinateBBox, shapeBBox) <= 0) {
        label.set('visible', false);
      }
      if (labelBBox.height > shapeBBox.height) {
        // 处理放不下的情况
        const idx = findIndex(curGroup, (item) => item === label);
        if (idx !== 0) {
          label.set('visible', false);
        }
      } else {
        // 数据标签展示在图形中央
        label.attr({
          y: shapeBBox.y + shapeBBox.height / 2,
          textBaseline: 'middle',
        });
        const overflow = labelBBox.width > shapeBBox.width || labelBBox.height > shapeBBox.height;
        if (overflow) {
          // 出现了溢出情况，添加描边
          label.attr({
            stroke: lightStyle?.stroke,
          });
        } else {
          // 放置在柱形内部，颜色取反
          label.attr({
            fill: fillWhite ? lightStyle?.fill : darkStyle?.fill,
            fillOpacity: fillWhite ? lightStyle?.fillOpacity : darkStyle?.fillOpacity,
            stroke: undefined,
          });
        }
      }
    });
  }

  /** 数据标签防重叠抽样 */
  protected autoHideLabels(geometry: Geometry, labels: IShape[]) {
    const coordinateBBox = this.getCoordinateBBox();
    const filteredLabels = this.filterLabels(labels);
    const [xField] = geometry.getXYFields();
    const dones: IShape[] = [];
    const todo: IShape[] = [];
    const groupedLabels = groupBy(filteredLabels, (label) => label.get(ORIGIN)[FIELD_ORIGIN][xField]);
    const xValues = uniq(map(filteredLabels, (label: IShape) => label.get(ORIGIN)[FIELD_ORIGIN][xField]));
    let xValue;

    if (size(xValues) > 0) {
      // 第一组
      xValue = xValues.shift();
      each(groupedLabels[xValue], (label) => todo.push(label));
    }
    if (size(xValues) > 0) {
      // 最后一组
      xValue = xValues.pop();
      each(groupedLabels[xValue], (label) => todo.push(label));
    }
    each(xValues.reverse(), (val) => {
      // 其他组
      each(groupedLabels[val], (label) => todo.push(label));
    });

    while (todo.length > 0) {
      const cur = todo.shift();
      if (cur.get('visible')) {
        moveInPanel(cur, coordinateBBox);
        if (checkShapeOverlap(cur, dones)) {
          cur.set('visible', false);
        } else {
          dones.push(cur);
        }
      }
    }
  }

  /** 抽样数据标签，设置最大数量的数据标签，其他的统一隐藏 */
  private filterLabels(labels: IShape[]): IShape[] {
    const MAX_CNT = 500; // 最多显示 500 个数据标签
    const filteredLabels = [];
    const pages = Math.max(Math.floor(labels.length / MAX_CNT), 1);
    each(labels, (label, idx) => {
      if (idx % pages === 0) {
        filteredLabels.push(label);
      } else {
        label.set('visible', false);
      }
    });

    return filteredLabels;
  }
}

registerLabelComponent('column-auto', ColumnAutoLabel);

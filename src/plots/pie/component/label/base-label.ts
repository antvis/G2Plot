import { IGroup, IShape, BBox } from '../../../../dependents';
import { ext } from '@antv/matrix-util';
import { deepMix, isString } from '@antv/util';
import { getEndPoint, getLabelRotate, getAngleByPoint, getOverlapArea, near } from './utils';
import { Label, TextStyle } from '../../../../interface/config';
import PieLayer from '../../layer';
import { getEllipsisText } from '../../../../util/text';

/** label text和line距离 4px */
export const CROOK_DISTANCE = 4;

export function percent2Number(value: string): number {
  const percentage = Number(value.endsWith('%') ? value.slice(0, -1) : value);
  return percentage / 100;
}

/**
 * 超出panel边界的标签默认隐藏
 */
function checkInPanel(label: IShape, panel: BBox): void {
  const box = label.getBBox();
  //  横向溢出 暂不隐藏
  if (!(panel.y <= box.y && panel.y + panel.height >= box.y + box.height)) {
    label.get('parent').set('visible', false);
  }
}

export interface LabelItem {
  x: number;
  y: number;
  color: string;
  origin: object;
  name: string;
  angle: number;
  textAlign: string;
  textBaseline?: string;
}

export interface PieLabelConfig extends Label {
  visible: boolean;
  formatter?: (text: string | number | undefined | null, item: any, idx: number, ...extras: any[]) => string;
  /** whether */
  adjustPosition?: boolean;
  /** allow label overlap */
  allowOverlap?: boolean;
  autoRotate?: boolean;
  labelHeight?: number;
  offset?: number | string;
  offsetX?: number;
  offsetY?: number;
  /** label leader-line */
  line?: {
    visible?: boolean;
    smooth?: boolean;
    stroke?: string;
    lineWidth?: number;
  };
  style?: TextStyle;
}

export default abstract class PieBaseLabel {
  public options: PieLabelConfig & { offset: number };
  public destroyed: boolean = false;
  protected plot: PieLayer;
  protected coordinateBBox: BBox;
  protected container: IGroup;
  /** 圆弧上的锚点 */
  protected arcPoints: LabelItem[];

  constructor(plot: PieLayer, cfg: PieLabelConfig) {
    this.plot = plot;
    this.coordinateBBox = this.plot.view.coordinateBBox;
    const options = deepMix(this.getDefaultOptions(), cfg, {});
    this.adjustOption(options);
    this.options = options;
    this.init();
  }

  protected abstract getDefaultOptions();
  protected abstract layout(labels: IShape[], shapeInfos: LabelItem[], panelBox: BBox);
  /** 处理标签遮挡问题 */
  protected adjustOverlap(labels: IShape[], panel: BBox): void {
    // clearOverlap;
    for (let i = 1; i < labels.length; i++) {
      const label = labels[i];
      let overlapArea = 0;
      for (let j = i - 1; j >= 0; j--) {
        const prev = labels[j];
        // fix: start draw point.x is error when textAlign is right
        const prevBox = prev.getBBox();
        const currBox = label.getBBox();
        // if the previous one is invisible, skip
        if (prev.get('parent').get('visible')) {
          overlapArea = getOverlapArea(prevBox, currBox);
          if (!near(overlapArea, 0)) {
            label.get('parent').set('visible', false);
            break;
          }
        }
      }
    }
    labels.forEach((label) => checkInPanel(label, panel));
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected adjustItem(item: LabelItem): void {
    return;
  }

  protected init() {
    this.container = this.getGeometry().labelsContainer;
    this.plot.view.on('beforerender', () => {
      this.clear();
      this.plot.canvas.draw();
    });
  }

  public render() {
    // 先清空 再重新渲染（避免双次绘制）
    this.clear();
    this.initArcPoints();
    this.drawTexts();
    this.drawLines();
  }

  public clear() {
    if (this.container) {
      this.container.clear();
    }
  }

  public hide() {
    this.container.set('visible', false);
    this.plot.canvas.draw();
  }

  public show() {
    this.container.set('visible', true);
    this.plot.canvas.draw();
  }

  public destroy() {
    if (this.container) {
      this.container.remove();
    }
    this.destroyed = true;
  }

  private getFilteredSum() {
    const { angleField } = this.plot.options;
    const filteredData = (this.plot.view as any).filteredData || [];
    return filteredData.reduce((pre, filteredDataItem) => {
      return pre + filteredDataItem[angleField];
    }, 0);
  }

  /** 绘制文本 */
  protected drawTexts() {
    const { style, formatter, autoRotate, offsetX, offsetY, adjustPosition, allowOverlap } = this.options;
    const shapeInfos = this.getItems();
    const shapes: IShape[] = [];
    shapeInfos.map((shapeInfo, idx) => {
      const attrs = deepMix({}, shapeInfo, style);
      const filteredSum = this.getFilteredSum();
      const { angleField } = this.plot.options;
      const percent = shapeInfo.origin[angleField] / filteredSum;
      const content = formatter
        ? formatter(
            shapeInfo.name,
            {
              _origin: shapeInfo.origin,
              percent,
            },
            idx
          )
        : shapeInfo.name;
      const itemGroup = this.container.addGroup({
        name: 'itemGroup',
        index: idx,
        capture: false, // 不捕获事件，否则鼠标 hover 到图形会失焦
      });
      const textShape = itemGroup.addShape('text', {
        attrs: deepMix({}, attrs, {
          x: shapeInfo.x + offsetX,
          y: shapeInfo.y + offsetY,
          text: content,
        }),
      });
      textShape.set('id', `text-${shapeInfo.name}-${idx}`);
      shapes.push(textShape);
    });
    shapes.forEach((shape) => {
      const panelBox = this.coordinateBBox;
      this.adjustText(shape, panelBox);
    });
    if (adjustPosition) {
      this.layout(shapes, shapeInfos, this.coordinateBBox);
    }
    if (!allowOverlap) {
      this.adjustOverlap(shapes, this.coordinateBBox);
    }
    shapes.forEach((label, idx) => {
      if (autoRotate) {
        this.rotateLabel(label, getLabelRotate(shapeInfos[idx].angle));
      }
    });
  }

  private adjustText(label: IShape, panelBox: BBox) {
    const box = label.getBBox();
    let width = box.width;
    const deltaWidth = 0;
    if (box.maxX > panelBox.maxX) {
      width = panelBox.maxX - box.minX;
    } else if (box.minX < panelBox.minX) {
      width = box.maxX - panelBox.minX;
    }
    if (label.attr('textAlign') === 'left') {
      label.attr('x', Math.max(box.x - deltaWidth, 0));
    } else if (label.attr('textAlign') === 'right') {
      label.attr('x', Math.max(box.maxX - deltaWidth, 0));
    }
    if (width !== box.width) {
      const font = {};
      ['fontSize', 'fontFamily', 'fontWeight'].forEach((k) => {
        font[k] = label.attr(k);
      });
      const ellipsisTexts = label
        .attr('text')
        .split('\n')
        .map((t) => getEllipsisText(t, width, font));
      label.attr('text', ellipsisTexts.join('\n'));
    }
  }

  /** 绘制拉线 */
  protected drawLines() {
    if (this.options.line.visible) {
      const itemGroups = this.container.get('children');
      const { center } = this.getCoordinate();
      itemGroups.forEach((labelGroup, idx) => {
        const label: IShape = labelGroup.get('children')[0];
        const anchor = this.arcPoints[idx];
        const inLeft = anchor.x < center.x;
        // 拉线 和 label 之间的距离
        const distance = this.options.offset > 4 ? 4 : 0;
        const path = this.getLinePath(label, anchor, distance);
        const style = this.options.line;
        labelGroup.addShape('path', {
          attrs: {
            path,
            stroke: anchor.color,
            ...style,
          },
        });
        // 由于拉线的存在 label 需要进行偏移
        label.attr('x', label.attr('x') + (inLeft ? -distance : distance));
      });
    }
  }

  /** 获取label leader-line, 默认 not smooth */
  private getLinePath(label: IShape, anchor: LabelItem, distance: number): string {
    const smooth = this.options.line ? this.options.line.smooth : false;
    const angle = anchor.angle;
    const { center, radius } = this.getCoordinate();
    let breakAt = getEndPoint(center, angle, radius + distance);
    if (distance < 4) {
      breakAt = anchor;
    }
    const inLeft = anchor.x < center.x;
    const box = label.getBBox();
    const labelPosition = { x: inLeft ? box.maxX : box.minX, y: box.y + box.height / 2 };
    const smoothPath = [
      'C', // soft break
      // 1st control point (of the curve)
      labelPosition.x +
        // 4 gives the connector a little horizontal bend
        (inLeft ? 1 : -1) * (distance < 4 ? distance / 2 : 4),
      labelPosition.y, //
      2 * breakAt.x - anchor.x, // 2nd control point
      2 * breakAt.y - anchor.y, //
      breakAt.x, // end of the curve
      breakAt.y, //
    ];
    const straightPath = ['L', /** pointy break */ breakAt.x, breakAt.y];
    const linePath = smooth ? smoothPath : straightPath;
    const path = ['M', labelPosition.x, labelPosition.y].concat(linePath).concat('L', anchor.x, anchor.y);

    return path.join(',');
  }

  protected getGeometry() {
    return this.plot.view.geometries[0];
  }

  protected getCoordinate() {
    const coordinate = this.getGeometry().coordinate;
    const center = coordinate.getCenter();
    // @ts-ignore
    const radius = coordinate.getRadius();
    const startAngle = coordinate.startAngle;
    return { center, radius, startAngle };
  }

  protected adjustOption(options: PieLabelConfig): void {
    let offset = options.offset;
    const { radius } = this.getCoordinate();
    if (isString(offset)) {
      offset = radius * percent2Number(offset);
    }
    options.offset = offset;
  }

  private rotateLabel(label: IShape, angle): void {
    const x = label.attr('x');
    const y = label.attr('y');
    const matrix = ext.transform(label.getMatrix(), [
      ['t', -x, -y],
      ['r', angle],
      ['t', x, y],
    ]);
    label.setMatrix(matrix);
  }

  private getItems(): LabelItem[] {
    const { offset } = this.options;
    const { center, radius } = this.getCoordinate();
    const items = this.arcPoints.map((anchor) => {
      const point = getEndPoint(center, anchor.angle, radius + offset);
      const item = { ...anchor, ...point };
      this.adjustItem(item);
      return item;
    });
    return items;
  }

  // 初始化圆弧上锚点
  private initArcPoints(): void {
    const { angleField } = this.plot.options;
    const elements = this.getGeometry().elements;
    const coord = this.getCoordinate();
    const { center, radius } = coord;
    let { startAngle } = this.getCoordinate();
    const scale = this.getGeometry().scales[angleField];
    const anchors = elements.map((ele) => {
      const origin = ele.shape.get('origin');
      const color = origin.color;
      const originData = origin.data[0] || origin.data;
      const endAngle = startAngle + Math.PI * 2 * scale.scale(originData[angleField]);
      const angle = (startAngle + endAngle) / 2;
      const point = getEndPoint(center, angle, radius);
      startAngle = endAngle;
      const name = scale.getText(originData[angleField]);
      const textAlign = point.x > center.x ? 'left' : 'right';

      return {
        x: point.x,
        y: point.y,
        color,
        name,
        origin: originData,
        // 实际的角度
        angle: getAngleByPoint(this.getGeometry().coordinate, point),
        textAlign,
      };
    });
    this.arcPoints = anchors;
  }
}

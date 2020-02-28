import { IGroup, IShape } from '@antv/g-base';
import * as matrixUtil from '@antv/matrix-util';
import { deepMix, isString } from '@antv/util';
import { getEndPoint } from './utils';
import { Label } from '../../../../interface/config';
import PieLayer from '../../layer';

/** label text和line距离 4px */
export const CROOK_DISTANCE = 4;

export function percent2Number(value: string): number {
  const percentage = Number(value.endsWith('%') ? value.slice(0, -1) : value);
  return percentage / 100;
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

export interface PieLabelConfig extends Omit<Label, 'offset'> {
  visible: boolean;
  formatter?: (text: string, item: object, idx: number) => string;
  /** allow label overlap */
  allowOverlap?: boolean;
  autoRotate?: boolean;
  labelHeight?: number;
  offset?: string | number;
  offsetX?: number;
  offsetY?: number;
  /** label leader-line */
  line?: {
    smooth?: boolean;
    stroke?: string;
    lineWidth?: number;
  };
  style?: any;
}

export default abstract class PieBaseLabel {
  public options: PieLabelConfig & { offset: number };
  public destroyed: boolean = false;
  protected plot: PieLayer;
  protected container: IGroup;
  /** 圆弧上的锚点 */
  protected anchors: LabelItem[];

  constructor(plot: PieLayer, cfg: PieLabelConfig) {
    this.plot = plot;
    const options = deepMix(this.getDefaultOptions(), cfg, {});
    this.adjustOption(options);
    this.options = options;
    this.init();
  }

  protected abstract getDefaultOptions();
  protected abstract layout(labels: IShape[], shapeInfos: LabelItem[]);
  protected adjustItem(item: LabelItem): void {}

  protected init() {
    this.container = this.getGeometry().labelsContainer;
    this.container.toFront();
    this.plot.view.on('beforerender', () => {
      this.clear();
      this.plot.canvas.draw();
    });
  }

  public render() {
    // 先清空 再重新渲染（避免双次绘制）
    this.clear();
    this.initAnchors();
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

  public destory() {
    if (this.container) {
      this.container.remove();
    }
    this.destroyed = true;
  }

  /** 绘制文本 */
  protected drawTexts() {
    const { style, formatter, autoRotate, offsetX, offsetY } = this.options;
    const shapeInfos = this.getItems();
    const shapes: IShape[] = [];
    shapeInfos.map((shapeInfo, idx) => {
      const content = formatter ? formatter(shapeInfo.name, { _origin: shapeInfo.origin }, idx) : shapeInfo.name;
      const itemGroup = this.container.addGroup({ name: 'itemGroup', index: idx });
      const textShape = itemGroup.addShape('text', {
        attrs: deepMix(
          {},
          {
            ...shapeInfo,
            x: shapeInfo.x + offsetX,
            y: shapeInfo.y + offsetY,
            text: content,
          },
          style
        ),
      });
      textShape.set('id', `text-${shapeInfo.name}-${idx}`);
      this.adjustPosition(textShape);
      shapes.push(textShape);
    });
    this.layout(shapes, shapeInfos);
    shapes.forEach((label, idx) => {
      if (autoRotate) {
        this.rotateLabel(label, shapeInfos[idx].angle);
      }
    });
  }

  /** 绘制拉线 */
  protected drawLines() {
    const labelGroups = this.container.get('children');
    labelGroups.forEach((labelGroup, idx) => {
      const label: IShape = labelGroup.get('children')[0];
      const anchor = this.anchors[idx];
      const path = this.getLinePath(label, anchor);
      const style = this.options.line;
      const pathShape = labelGroup.addShape('path', {
        attrs: {
          path,
          stroke: anchor.color,
          ...style,
        },
      });
      pathShape.set('visible', label.get('visible'));
    });
  }

  /** 获取label leader-line, 默认 not smooth */
  private getLinePath(label: IShape, anchor: LabelItem): string {
    const smooth = this.options.line ? this.options.line.smooth : false;
    const angle = anchor.angle;
    const { center, radius } = this.getCoordinate();
    const distance = this.options.offset > 4 ? 4 : 0;
    const breakAt = getEndPoint(center, angle, radius + 4);
    const inLeft = anchor.x < center.x;
    const box = label.getBBox();
    const labelPosition = { x: inLeft ? box.maxX + distance : box.minX - distance, y: box.y + box.height / 2 };
    const smoothPath = [
      'C', // soft break
      // 1st control point (of the curve)
      labelPosition.x +
        // 4 gives the connector a little horizontal bend
        (inLeft ? 4 : -4),
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

  private adjustPosition(label: IShape): void {
    const box = label.getBBox();
    if (label.attr('textAlign') === 'right') {
      label.attr('x', box.x + box.width);
    } else if (label.attr('textAlign') === 'center') {
      label.attr('x', box.x + box.width / 2);
    }
  }

  private rotateLabel(label: IShape, angle): void {
    const x = label.attr('x');
    const y = label.attr('y');
    const matrix = matrixUtil.transform(label.getMatrix(), [
      ['t', -x, -y],
      ['r', angle],
      ['t', x, y],
    ]);
    label.setMatrix(matrix);
  }

  private getItems(): LabelItem[] {
    const { offset } = this.options;
    const { center, radius } = this.getCoordinate();
    const items = this.anchors.map((anchor) => {
      const point = getEndPoint(center, anchor.angle, radius + offset);
      const item = { ...anchor, ...point };
      this.adjustItem(item);
      return item;
    });
    return items;
  }

  private initAnchors(): void {
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
      const name = `${originData[angleField]}`;
      const textAlign = point.x > center.x ? 'left' : 'right';
      return { x: point.x, y: point.y, color, name, origin: originData, angle, textAlign };
    });
    this.anchors = anchors;
  }
}

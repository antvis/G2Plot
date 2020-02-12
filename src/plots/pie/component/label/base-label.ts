import { IGroup, IShape } from '@antv/g-canvas';
import { View } from '@antv/g2';
import * as matrixUtil from '@antv/matrix-util';
import * as _ from '@antv/util';
import { getEndPoint } from './utils';
import { IPieLabel, PieLabelConfig } from './pie-outer-label';

export function percent2Number(value: string): number {
  const percentage = Number(value.endsWith('%') ? value.slice(0, -1) : value);
  return percentage / 100;
}

export interface ShapeInfo {
  x: number;
  y: number;
  color: string;
  origin: object;
  name: string;
  angle: number;
}

export default abstract class PieBaseLabel {
  public options: PieLabelConfig;
  public destroyed: boolean = false;
  protected plot: any;
  private view: View;
  private container: IGroup;
  /** 圆弧上的锚点 */
  protected anchors: ShapeInfo[];

  constructor(cfg: IPieLabel) {
    this.view = cfg.view;
    this.plot = cfg.plot;
    const defaultOptions = this.getDefaultOptions();
    this.options = _.deepMix(defaultOptions, cfg, {});
    this.init();
  }

  protected init() {
    this.container = this.getGeometry().labelsContainer;
    this.container.toFront();
    this.view.on('beforerender', () => {
      this.clear();
      this.plot.canvas.draw();
    });
  }

  public render() {
    // 先清空 再重新渲染（避免双次绘制）
    this.clear();
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
    const shapeInfos = this.getLabelItems();
    const shapes: IShape[] = [];
    shapeInfos.map((shapeInfo, idx) => {
      const content = formatter ? formatter(shapeInfo.name, shapeInfo.origin, idx) : shapeInfo.name;
      const itemGroup = this.container.addGroup({ name: 'itemGroup', index: idx });
      const textShape = itemGroup.addShape('text', {
        attrs: _.deepMix(
          {},
          style,
          {
            x: shapeInfo.x + offsetX,
            y: shapeInfo.y + offsetY,
            fill: style.fill || shapeInfo.color,
            text: content,
            textBaseline: 'middle',
          }
        ),
      });
      textShape.set('id', `text-${shapeInfo.name}-${idx}`);
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
  protected drawLines() {}

  protected abstract getDefaultOptions();

  protected abstract layout(labels: IShape[], shapeInfos: ShapeInfo[]);

  protected getGeometry() {
    const { geometries } = this.view;
    return geometries[0];
  }

  protected getCoord() {
    const center = this.getGeometry().coordinate.getCenter();
    const startAngle = this.getGeometry().coordinate.startAngle;
    // @ts-ignore
    const radius = this.getGeometry().coordinate.getRadius();
    return { center, radius, startAngle };
  }

  protected getOffsetOption(): number {
    let offset = this.options.offset;
    const { radius } = this.getCoord();
    if (_.isString(offset)) {
      offset = radius * percent2Number(offset);
    }
    return offset;
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

  private getLabelItems(): ShapeInfo[] {
    const { angleField } = this.plot.options;
    const elements = this.getGeometry().elements;
    const offset = this.getOffsetOption();
    let { center, radius, startAngle } = this.getCoord();
    const anchors = elements.map((ele) => {
      const shape = ele.shape;
      const origin = shape.get('origin').data[0] || shape.get('origin').data;
      const color = shape.get('origin').color;
      const scale = this.getGeometry().scales[angleField];
      const endAngle = startAngle + Math.PI * 2 * scale.scale(origin[angleField]);
      const angle = (startAngle + endAngle) / 2;
      const point = getEndPoint(center, angle, radius);
      startAngle = endAngle;
      return { x: point.x, y: point.y, color, name: `${origin[angleField]}`, origin, angle };
    });
    this.anchors = anchors;
    return anchors.map(anchor => {
      const point = getEndPoint(center, anchor.angle, radius + offset)
      const item = { ...anchor, ...point };
      return item;
    });
  }
}

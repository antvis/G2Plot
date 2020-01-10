import { Shape } from '@antv/g';
import { ElementLabels, registerElementLabels } from '@antv/g2';
import * as _ from '@antv/util';
import { rgb2arr } from '../../../../util/color';
import { LooseMap } from '../../../../interface/types';

const RIGHT_MARGIN = 20;

type Point = LooseMap;

export class BarLabels extends ElementLabels {
  // TODO: 先实现功能，待抽象  position这里去掉在条形图场景下不必要的逻辑，位置计算调整
  public setLabelPosition(point, originPoint, index, originPosition) {
    let position = originPosition;
    if (_.isFunction(position)) {
      position = position(originPoint);
    }
    const coord = this.get('coord');
    const point0 = coord.convertPoint(originPoint.points[0]);
    const point1 = coord.convertPoint(originPoint.points[2]);
    const negative = point0.x > point1.x;
    const width = ((point0.x - point1.x) / 2) * -1;
    const height = ((point0.y - point1.y) / 2) * -1;

    switch (position) {
      case 'bottom':
        point.x -= width;
        point.y += height;
        point.textAlign = point.textAlign || 'center';
        break;
      case 'top':
        point.x -= width;
        point.y -= height;
        point.textAlign = point.textAlign || 'center';
        break;
      case 'left':
        point.x -= width * 2;
        point.textAlign = point.textAlign || (negative ? 'right' : 'left');
        break;
      case 'middle':
        point.x -= width;
        point.textAlign = point.textAlign || 'center';
        break;
      case 'right':
        point.textAlign = point.textAlign || (negative ? 'right' : 'left');
        break;
      default:
        break;
    }
  }

  // 针对负数值的label调整
  private adjustOffset(points: any[], shapes: Shape[]) {
    const renderer = this.get('labelsRenderer');
    const items = renderer.get('items');
    const labels = renderer.get('group').get('children');
    const coord = this.get('coord');
    _.each(items, (item, idx) => {
      const label = labels[idx];
      const point0 = coord.convertPoint(points[idx].points[0]);
      const point1 = coord.convertPoint(points[idx].points[2]);
      const negative = point0.x > point1.x;
      if (negative && item.offset) {
        item.x -= item.offset * 2;
        label.attr('x', label.attr('x') - item.offset * 2);
      }
    });
  }

  public showLabels(points: any, shapes: Shape[]) {
    super.showLabels(points, shapes);
    this.adjustOffset(points, shapes);
    const renderer = this.get('labelsRenderer');
    const labels = renderer.get('group').get('children');
    const items = renderer.get('items');
    const view = this.get('element').get('view');
    const { adjustColor, adjustPosition } = this.get('labelOptions');
    _.each(labels, (label, index) => {
      const l = label as Shape;
      const item = items[index];
      const origin = l.get('origin');
      const shapeId = this.get('element').getShapeId(origin);
      const shape = this._getShape(shapeId, shapes);
      if (adjustPosition) {
        this.adjustPosition(l, shape, item);
      }
      if (adjustColor) {
        this.adjustColor(l, shape);
      }
    });
    view.get('canvas').draw();
  }

  public _getShape(shapeId, shapes) {
    let target;
    _.each(shapes, (shape) => {
      const s = shape as Point;
      const id = s.id;
      if (id === shapeId) {
        target = s;
      }
    });
    return target;
  }

  public adjustPosition(label, shape, item) {
    const labelRange = label.getBBox();
    const shapeRange = shape.getBBox();
    if (shapeRange.width <= labelRange.width && item.position !== 'right') {
      const xPosition = shapeRange.maxX + RIGHT_MARGIN;
      label.attr('x', xPosition);
    }
  }

  public adjustColor(label, shape) {
    const labelRange = label.getBBox();
    const shapeRange = shape.getBBox();
    if (labelRange.minX >= shapeRange.minX && labelRange.maxX <= shapeRange.maxX) {
      const shapeColor = shape.attr('fill');
      const shapeOpacity = shape.attr('opacity') ? shape.attr('opacity') : 1;
      const rgb = rgb2arr(shapeColor);
      const gray = Math.round(rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114) / shapeOpacity;
      const colorBand = [
        { from: 0, to: 85, color: 'white' },
        { from: 85, to: 170, color: '#F6F6F6' },
        { from: 170, to: 255, color: 'black' },
      ];
      const reflect = this._mappingColor(colorBand, gray);
      label.attr('fill', reflect);
      label.attr('fill', reflect);
      if (reflect !== 'black') {
        label.attr('stroke', null);
        label.attr('lineWidth', 0);
      } else {
        label.attr('stroke', 'white');
        label.attr('lineWidth', 2);
      }
    } else if (labelRange.maxY < shapeRange.minY) {
      const theme = this.get('theme');
      const labelTextColor = _.get(theme, 'label.textStyle.fill', 'black');
      label.attr('fill', labelTextColor);
    }
  }

  public _mappingColor(band, gray) {
    let reflect;
    _.each(band, (b) => {
      const map = b as Point;
      if (gray >= map.from && gray < map.to) {
        reflect = map.color;
      }
    });
    return reflect;
  }
}
registerElementLabels('barLabel', BarLabels);

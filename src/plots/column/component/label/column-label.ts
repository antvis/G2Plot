import { Shape } from '@antv/g';
import { ElementLabels, registerElementLabels } from '@antv/g2';
import * as _ from '@antv/util';
import { rgb2arr } from '../../../../util/color';

const TOP_MARGIN = 20;

interface Point {
  [key: string]: any;
}

export class ColumnLabels extends ElementLabels {
  public setLabelPosition(point, originPoint, index, originPosition) {
    let position = originPosition;
    if (_.isFunction(position)) {
      position = position(originPoint);
    }
    const coord = this.get('coord');
    const point0 = coord.convertPoint(originPoint.points[0]);
    const point1 = coord.convertPoint(originPoint.points[2]);
    const width = (point0.x - point1.x) / 2;
    const height = (point0.y - point1.y) / 2;

    switch (position) {
      case 'right':
        point.x -= width;
        point.y += height;
        point.textAlign = point.textAlign || 'left';
        break;
      case 'left':
        point.x += width;
        point.y += height;
        point.textAlign = point.textAlign || 'right';
        break;
      case 'bottom':
        point.y += height * 2;
        point.textAlign = point.textAlign || 'center';
        break;
      case 'middle':
        point.y += height;
        point.textAlign = point.textAlign || 'center';
        break;
      case 'top':
        point.textAlign = point.textAlign || 'center';
        break;
      default:
        break;
    }
  }
  public showLabels(points: any, shapes: Shape[]) {
    super.showLabels(points, shapes);
    const renderer = this.get('labelsRenderer');
    const labels = renderer.get('group').get('children');
    const items = renderer.get('items');
    const view = this.get('element').get('view');
    _.each(labels, (label, index) => {
      const l = label as Shape;
      const item = items[index];
      const origin = l.get('origin');
      const shapeId = this.get('element').getShapeId(origin);
      const shape = this._getShape(shapeId, shapes);
      this.adjustPosition(l, shape, item);
      const { adjustColor } = this.get('labelOptions');
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
    if (shapeRange.height <= labelRange.height && item.position !== 'top') {
      const yPosition = shapeRange.minY - TOP_MARGIN;
      label.attr('y', yPosition);
    }
  }

  public adjustColor(label, shape) {
    const labelRange = label.getBBox();
    const shapeRange = shape.getBBox();
    if (labelRange.minY >= shapeRange.minY && labelRange.maxY <= shapeRange.maxY) {
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
      if(reflect !=='black'){
        label.attr('stroke',null);
        label.attr('lineWidth',0);
      }else{
        label.attr("stroke","white");
        label.attr("lineWidth",2);
      }
    } else if (labelRange.maxY < shapeRange.minY) {
      label.attr('fill', 'black');
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

registerElementLabels('columnLabel', ColumnLabels);

import { Shape } from '@antv/g';
import { registerElementLabels, ElementLabels } from '@antv/g2';
import * as _ from '@antv/util';

const TOP_MARGIN = 20;

interface Point {
  [key: string]: any;
}

function rgb2arr(str) {
  const arr = [];
  arr.push(parseInt(str.substr(1, 2), 16));
  arr.push(parseInt(str.substr(3, 2), 16));
  arr.push(parseInt(str.substr(5, 2), 16));
  return arr;
}

function toHex(value) {
  let v;
  v = Math.round(value);
  v = v.toString(16);
  if (v.length === 1) {
    v = `0${value}`;
  }
  return v;
}

function arr2rgb(arr) {
  return `#${toHex(arr[0]) + toHex(arr[1]) + toHex(arr[2])}`;
}

class ColumnLabels extends ElementLabels {
  setLabelPosition(point, originPoint, index, originPosition) {
    let position = originPosition;
    if (_.isFunction(position)) {
      position = position(originPoint);
    }
    const coord = this.get('coord');
    const transposed = coord.isTransposed;
    const point0 = coord.convertPoint(originPoint.points[0]);
    const point1 = coord.convertPoint(originPoint.points[2]);
    const width = (point0.x - point1.x) / 2 * (transposed ? -1 : 1);
    const height = (point0.y - point1.y) / 2 * (transposed ? -1 : 1);

    switch (position) {
      case 'right':
        if (transposed) {
          point.x -= width;
          point.y += height;
          point.textAlign = point.textAlign || 'center';
        } else {
          point.x -= width;
          point.y += height;
          point.textAlign = point.textAlign || 'left';
        }
        break;
      case 'left':
        if (transposed) {
          point.x -= width;
          point.y -= height;
          point.textAlign = point.textAlign || 'center';
        } else {
          point.x += width;
          point.y += height;
          point.textAlign = point.textAlign || 'right';
        }
        break;
      case 'bottom':
        if (transposed) {
          point.x -= (width * 2);
          point.textAlign = point.textAlign || 'left';
        } else {
          point.y += (height * 2);
          point.textAlign = point.textAlign || 'center';
        }

        break;
      case 'middle':
        if (transposed) {
          point.x -= width;
        } else {
          point.y += height;
        }
        point.textAlign = point.textAlign || 'center';
        break;
      case 'top':
        if (transposed) {
          point.textAlign = point.textAlign || 'left';
        } else {
          point.textAlign = point.textAlign || 'center';
        }
        break;
      default:
        break;
    }
  }
  showLabels(points: any, shapes: Shape[]) {
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
      this._adjustPosition(l, shape);
      if (item.adjustColor) this._adjustColor(l, shape);
    });
    view.get('canvas').draw();
  }

  _getShape(shapeId, shapes) {
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

  _adjustPosition(label, shape) {
    const labelRange = label.getBBox();
    const shapeRange = shape.getBBox();
    if (shapeRange.height <= labelRange.height) {
      const yPosition = shapeRange.minY - TOP_MARGIN;
      label.attr('y', yPosition);
    }
  }

  _adjustColor(label, shape) {
    const labelRange = label.getBBox();
    const shapeRange = shape.getBBox();
    if (labelRange.minY >= shapeRange.minY && labelRange.maxY <= shapeRange.maxY) {
      const shapeColor = shape.attr('fill');
      const rgb = rgb2arr(shapeColor);
      const gray = Math.round(rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114);
      const colorBand = [
                { from: 0, to: 85, color: 'white' },
                { from: 85, to: 170, color: '#F6F6F6' },
                { from: 170, to: 255, color: 'black' },
      ];
      const reflect = this._mappingColor(colorBand, gray);
      label.attr('fill', reflect);
    } else if (labelRange.maxY < shapeRange.minY) {
      label.attr('fill', 'black');
    }
  }

  _mappingColor(band, gray) {
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

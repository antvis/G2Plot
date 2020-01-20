import { Shape } from '@antv/g';
import * as _ from '@antv/util';
import { ElementLabels, registerElementLabels } from '@antv/g2';
import { DataPointType } from '@antv/g2/lib/interface';
import { rgb2arr } from '../../../../util/color';
import { LooseMap } from '../../../../interface/types';

type Point = LooseMap;

function avg(arr) {
  let sum = 0;
  _.each(arr, (value) => {
    sum += value as number;
  });
  return sum / arr.length;
}

function lerp(a, b, factor) {
  return (1 - factor) * a + factor * b;
}

export class FunnelLabel extends ElementLabels {
  public setLabelPosition(point, originPoint, index) {
    const coord = this.get('coord');
    const transposed = coord.isTransposed;
    const point0 = coord.convertPoint(originPoint.points[0]);
    const point1 = coord.convertPoint(originPoint.points[2]);

    const width = ((point0.x - point1.x) / 2) * (transposed ? -1 : 1);
    const height = ((point0.y - point1.y) / 2) * (transposed ? -1 : 1);

    if (transposed) {
      point.x -= width;
    } else {
      point.y += height;
    }
    point.textAlign = 'center';
    point.textBaseline = 'middle';
  }

  protected getLabelPoint(labelOptions: DataPointType, point, index): DataPointType {
    const total = labelOptions.text.length;

    function getDimValue(value, idx) {
      let v = value;
      if (_.isArray(v)) {
        if (labelOptions.text.length === 1) {
          // 如果仅一个label,多个值,取最后一个值
          if (v.length <= 2) {
            v = v[value.length - 1];
          } else {
            v = avg(v);
          }
        } else {
          v = v[idx];
        }
      }
      return v;
    }

    const label = {
      text: labelOptions.text[index],
      x: 0,
      y: 0,
      start: { x: 0, y: 0 },
      color: '#fff',
    };
    label.x = getDimValue(point.x, index);
    label.y = getDimValue(point.y, index);

    this.setLabelPosition(label, point, index);

    const offsetPoint = this.getLabelOffset(labelOptions, index, total);
    if (labelOptions.offsetX) {
      offsetPoint.x += labelOptions.offsetX;
    }
    if (labelOptions.offsetY) {
      offsetPoint.y += labelOptions.offsetY;
    }

    this.transLabelPoint(label);
    label.start = { x: label.x, y: label.y };
    label.x += offsetPoint.x;
    label.y += offsetPoint.y;
    label.color = point.color;
    return label;
  }

  public showLabels(points: LooseMap[], shapes: Shape[]) {
    super.showLabels(points, shapes);
    const renderer = this.get('labelsRenderer');
    const labels = renderer.get('group').get('children');
    const view = this.get('element').get('view');
    _.each(labels, (label, index) => {
      const l = label as Shape;
      const origin = l.get('origin');
      const shapeId = this.get('element').getShapeId(origin);
      const shape = this._getShape(shapeId, shapes);
      const { adjustColor } = this.get('labelOptions');
      if (adjustColor) {
        this.adjustColor(l, shape);
      }
    });
    view.get('canvas').draw();
  }

  public adjustColor(label, shape) {
    const shapeColor = shape.attr('fill');
    const shapeOpacity = _.isNumber(shape.attr('opacity')) ? Math.min(Math.max(0, shape.attr('opacity')), 1) : 1;

    const rgb = rgb2arr(shapeColor);
    const gray = Math.round(rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114) / shapeOpacity;

    const fill = gray < 156 ? '#f6f6f6' : '#303030';
    label.attr('fill', fill);

    const coord = this.get('coord');

    const shapeBBox = shape.getBBox();
    const [shapeStartX, shapeStartY] = coord.invertMatrix(shapeBBox.x, shapeBBox.y, 1);
    const [shapeSizeX, shapeSizeY] = coord.invertMatrix(shapeBBox.width, shapeBBox.height, 0);
    const [shapeEndX, shapeEndY] = [shapeStartX + shapeSizeX, shapeStartY + shapeSizeY];

    const shapeMinX = Math.min(shapeStartX, shapeEndX);
    const shapeMaxX = Math.max(shapeStartX, shapeEndX);
    const shapeMinY = Math.min(shapeStartY, shapeEndY);
    const shapeMaxY = Math.max(shapeStartY, shapeEndY);

    const compare = shape.get('__compare__');
    if (compare) {
      const yValues = compare.yValues;
      label.attr({
        x: compare.transpose
          ? (shapeMinX + shapeMaxX) / 2
          : lerp(shapeMinX, shapeMaxX, yValues[0] / (yValues[0] + yValues[1])),
        y: compare.transpose
          ? lerp(shapeMinY, shapeMaxY, yValues[0] / (yValues[0] + yValues[1]))
          : (shapeMinY + shapeMaxY) / 2,
      });
    }
    const labelBBox = label.getBBox();
    const shapeContainsLabel =
      labelBBox.minX >= shapeMinX &&
      labelBBox.maxX <= shapeMaxX &&
      labelBBox.minY >= shapeMinY &&
      labelBBox.maxY <= shapeMaxY;

    label.set('visible', shapeContainsLabel);
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
}

registerElementLabels('funnelLabel', FunnelLabel);

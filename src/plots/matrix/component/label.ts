import { Shape } from '@antv/g';
import { ElementLabels, registerElementLabels } from '@antv/g2';
import * as _ from '@antv/util';
import { rgb2arr } from '../../../util/color';

interface Point {
  [key: string]: any;
}

export class MatrixLabels extends ElementLabels {
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
      const { adjustColor, adjustPosition } = this.get('labelOptions');
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

registerElementLabels('matrixLabel', MatrixLabels);

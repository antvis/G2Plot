import { Shape } from '@antv/g';
import { registerElementLabels, getElementLabels } from '@antv/g2';
import * as _ from '@antv/util';
import { LooseMap } from '../../../../interface/types';
import { getEndPoint } from '../../../pie/component/label/utils';
import { distBetweenPoints } from '../../../../util/math';
import { autoAdjustColor } from './utils';

type Point = LooseMap;

const PolarElementLabels = getElementLabels('polar');

export class RoseLabels extends PolarElementLabels {
  public showLabels(points: LooseMap[], shapes: Shape[]) {
    super.showLabels(points, shapes);
    const renderer = this.get('labelsRenderer');
    const labels = renderer.get('group').get('children');
    const view = this.get('element').get('view');
    const { fields, offset, adjustColor, type } = this.get('labelOptions');
    const { center, startAngle } = view.get('coord');
    const categoryField = fields[0];
    const adjustField = fields[2];
    const scale = view.get('scales')[categoryField];
    if (!adjustField) {
      labels.forEach((label) => {
        const origin = label.get('origin');
        const shapeId = this.get('element').getShapeId(origin);
        const shape = this._getShape(shapeId, shapes);
        const angleValue = scale.scale(origin[categoryField]);
        const angle = startAngle + Math.PI * 2 * angleValue;
        const anchor = shape.get('origin');
        const r = distBetweenPoints(center, anchor) + offset;
        const labelAnchor = getEndPoint(center, angle, r);
        label.attr('x', labelAnchor.x);
        label.attr('y', labelAnchor.y);
        label.attr('textBaseline', 'middle');
        this.adjustTextAlign(label, shape);
        if (adjustColor && type === 'inner') {
          autoAdjustColor(label, shape);
        }
      });
    }
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

  protected adjustTextAlign(label: Shape, shape: Shape) {
    const box = label.getBBox();
    const labelAnchor = { x: box.x + box.width / 2, y: box.y + box.height / 2 };
    const anchor = shape.get('origin');
    const { autoRotate } = this.get('labelOptions');
    label.attr('textAlign', 'center');
    if (!autoRotate) {
      if (labelAnchor.x > anchor.x) {
        label.attr('textAlign', 'left');
      } else if (labelAnchor.x < anchor.x) {
        label.attr('textAlign', 'right');
      }
    }
  }
}

registerElementLabels('roseLabel', RoseLabels);

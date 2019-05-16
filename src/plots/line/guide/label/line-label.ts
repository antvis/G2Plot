import { Shape } from '@antv/g';
import { registerElementLabels, ElementLabels } from '@antv/g2';
import _ from 'lodash';
import verticalShatter from '../../../../util/layout/verticalShatter';
import { last } from '@antv/util';

interface Item {
  /** 位置 */
  x: number;
  y: number;
  /** 点位置 */
  start: { x: number; y: number };
  /** 文本内容 */
  text: string;
}

const MARGIN = 10;

class LineElementLabels extends ElementLabels {
  showLabels(points: any, shapes: Shape[]) {
    const labelPoints = [];
    _.each(shapes, (shape) => {
      const originData = shape.get('origin');
      const lastPoint = _.cloneDeep(originData[originData.length - 1]);
      const bbox = shape.getBBox();
      lastPoint.x = bbox.maxX + MARGIN;
      labelPoints.push(lastPoint);
    });
    super.showLabels(labelPoints, shapes);
    const renderer = this.get('labelsRenderer');
    const field = this.get('labelOptions').fields[0];
    const labels = renderer.get('group').get('children');
    const view = this.get('element').get('view');
    _.each(labels, (label) => {
      label.attr('textAlign', 'left');
      label.attr('textBaseline', 'middle');
      const origin = label.get('origin');
      const shapeId = this.get('element').getShapeId(origin);
      const color  = this._adjustColor(shapeId, shapes);
      label.attr('fill', color);
    });
    verticalShatter(labels, view);
    view.get('canvas').draw();
  }

  _adjustColor(shapeId, shapes) {
    let color;
    _.each(shapes, (shape) => {
      const id = shape.id;
      if (id === shapeId) {
        color = shape.attr('stroke');
      }
    });
    return color;
  }
}

registerElementLabels('line', LineElementLabels);

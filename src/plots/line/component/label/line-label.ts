import { Shape } from '@antv/g';
import { ElementLabels, registerElementLabels } from '@antv/g2';
import _ from 'lodash';

const MARGIN = 10;

class LineElementLabels extends ElementLabels {
  public showLabels(points: any, shapes: Shape[]) {
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
      const color = this._adjustColor(shapeId, shapes);
      label.attr('fill', color);
    });
    view.get('canvas').draw();
  }

  public _adjustColor(shapeId, shapes) {
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

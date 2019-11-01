import { Shape } from '@antv/g';
import { ElementLabels, registerElementLabels } from '@antv/g2';
import { deepMix, each } from '@antv/util';

const MARGIN = 10;

class AreaLineElementLabels extends ElementLabels {
  public showLabels(points: any, shapes: Shape[]) {
    const labelPoints = [];
    each(shapes, (shape) => {
      const originData = shape.get('origin');
      const lastPoint = deepMix({}, originData[originData.length - 1]);
      const bbox = shape.getBBox();
      lastPoint.x = bbox.maxX + MARGIN;
      lastPoint.y = lastPoint.y[1];
      labelPoints.push(lastPoint);
    });
    super.showLabels(labelPoints, shapes);
    const renderer = this.get('labelsRenderer');
    const labels = renderer.get('group').get('children');
    const view = this.get('element').get('view');
    each(labels, (label) => {
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
    each(shapes, (shape) => {
      const id = shape.id;
      if (id === shapeId) {
        color = shape.attr('fill');
      }
    });
    return color;
  }
}

registerElementLabels('areaLine', AreaLineElementLabels);

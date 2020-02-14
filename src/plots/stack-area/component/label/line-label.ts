import * as _ from '@antv/util';
import LineLabel from '../../../line/component/label/line-label';

/**
 * 复用扎线图的 label，并修改取值方式
 */
export default class AreaLineLabel extends LineLabel {
  private getShapeInfo(shape) {
    const originPoints = shape.get('origin').points;
    const lastPoint = originPoints[originPoints.length - 1];
    const color = shape.attr('stroke');
    const { stackField } = this.plot.options;
    const name = shape.get('origin').data[0][stackField];

    const y = _.reduce(lastPoint.y, (r: number, a: number): number => {
      return r + a;
    }, 0) / _.size(lastPoint.y);

    return { x: lastPoint.x, y, color, name };
  }
}

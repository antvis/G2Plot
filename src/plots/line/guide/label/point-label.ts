import { Shape } from '@antv/g';
import { registerElementLabels, ElementLabels } from '@antv/g2';
import _ from 'lodash';
import layout from '../../../../util/layout/annealing';

interface Item {
  /** 位置 */
  x: number;
  y: number;
  /** 点位置 */
  start: { x: number; y: number };
  /** 文本内容 */
  text: string;
}

class LinePointLabels extends ElementLabels {
  showLabels(points: any, shapes: Shape[]) {
    super.showLabels(points, shapes);
    const renderer = this.get('labelsRenderer');
    const labels = renderer.get('group').get('children');
    const view = this.get('element').get('view');
    const anchorsBBox = renderer.get('items').map((item: Item) => {
      return {
        x: item.start.x - 4,
        y: item.start.y - 4,
        width: 8,
        height: 8,
      };
    });
    layout(labels, anchorsBBox, view.get('panelRange'), {
      nsweeps: 10,
    });
    view.get('canvas').draw();
  }
}

registerElementLabels('point', LinePointLabels);

import RectShapeFactory from './shape';
import { registerElement, Element } from '@antv/g2';
import * as _ from '@antv/util';

class Rect extends Element {
  constructor(cfg) {
    super({
      type: 'rect',
      shapeType: 'rect',
      generatePoints: true,
      shareTooltip: false,
      ...cfg,
    });

    this.set('shapeFactory', RectShapeFactory);
  }
}

registerElement('rect', Rect);

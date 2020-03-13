import { clone } from '@antv/util';
import BarLabel from '../../bar/component/label';

const DEFAULT_OFFSET = 8;

export default class StackBarLabel extends BarLabel {
  protected getDefaultOptions() {
    const { theme } = this.plot;
    const labelStyle = theme.label.style;
    return {
      offsetX: DEFAULT_OFFSET,
      offsetY: 0,
      style: clone(labelStyle),
      adjustPosition: true,
    };
  }

  protected adjustLabel(label, shape) {
    if (this.options.adjustPosition) {
      const labelRange = label.getBBox();
      const shapeRange = this.getShapeBbox(shape);
      if (shapeRange.width <= labelRange.width) {
        // const xPosition = shapeRange.maxX + this.options.offsetX;
        label.attr('text', '');
      }
    }
  }
}

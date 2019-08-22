import { Shape } from '@antv/g';

export default function textHide(shape: Shape) {
  shape.attr('text', '');
}

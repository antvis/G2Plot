import { IShape } from '@antv/g-base';

export default function textHide(shape: IShape) {
  shape.attr('text', '');
}

import { IShape } from '@antv/g-base/lib/interfaces';

export default function textHide(shape: IShape) {
  shape.attr('text', '');
}

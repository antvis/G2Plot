import { IShape } from '@antv/g-base/lib/interfaces';

interface TextRotationCfg {
  degree: number;
}

export default function textRotation(shape: IShape, option: TextRotationCfg) {
  shape.resetMatrix();
  shape.attr({
    rotate: 360 - option.degree,
    textAlign: 'right',
    textBaseline: 'middle',
  });
}

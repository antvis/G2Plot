import { Shape } from '@antv/g';

interface TextRotationCfg {
  degree: number;
}

export default function textRotation(shape: Shape, option: TextRotationCfg) {
  shape.resetMatrix();
  shape.attr({
    rotate: 360 - option.degree,
    textAlign: 'right',
    textBaseline: 'middle',
  });
}

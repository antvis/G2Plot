import { Shape } from '@antv/g';

interface TextRotationCfg {
  degree: number;
}

export default function textRotation(shape: Shape, cfg: TextRotationCfg) {
  shape.resetMatrix();
  shape.attr({
    rotate: 360 - cfg.degree,
    textAlign: 'right',
    textBaseline: 'middle',
  });
}

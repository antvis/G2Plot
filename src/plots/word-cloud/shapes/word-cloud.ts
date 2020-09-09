import { registerShape, Util } from '@antv/g2';
import { ShapeInfo } from '@antv/g2/lib/interface';
import { IGroup, ShapeAttrs } from '@antv/g2/lib/dependents';
import { DataItem } from '../types';

type Config = ShapeInfo & { data: DataItem };

registerShape('point', 'word-cloud', {
  draw(cfg: Config, group: IGroup) {
    const cx = cfg.x as number;
    const cy = cfg.y as number;

    const shape = group.addShape('text', {
      attrs: {
        ...getTextAttrs(cfg),
        x: cx,
        y: cy,
      },
    });
    const rotate = cfg.data.rotate;
    if (rotate) {
      Util.rotate(shape, (rotate * Math.PI) / 180);
    }

    return shape;
  },
});

function getTextAttrs(cfg: Config): ShapeAttrs {
  return {
    ...cfg.defaultStyle,
    ...cfg.style,
    fontSize: cfg.data.size,
    text: cfg.data.text,
    textAlign: 'center',
    fontFamily: cfg.data.font,
    fontWeight: cfg.data.weight,
    fill: cfg.color || cfg.defaultStyle?.stroke,
    textBaseline: 'alphabetic',
  };
}

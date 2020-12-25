import { registerShape, Util, Types, IGroup, ShapeAttrs } from '@antv/g2';
import { Tag } from '../types';

type Config = Types.ShapeInfo & { data: Tag };

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
    if (typeof rotate === 'number') {
      Util.rotate(shape, (rotate * Math.PI) / 180);
    }

    return shape;
  },
});

function getTextAttrs(cfg: Config): ShapeAttrs {
  return {
    fontSize: cfg.data.size,
    text: cfg.data.text,
    textAlign: 'center',
    fontFamily: cfg.data.font,
    fontWeight: cfg.data.weight,
    fill: cfg.color || cfg.defaultStyle.stroke,
    textBaseline: 'alphabetic',
  };
}

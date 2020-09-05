import { registerShape, Util } from '@antv/g2';
import { ShapeInfo } from '@antv/g2/lib/interface';
import { IGroup, ShapeAttrs } from '@antv/g2/lib/dependents';

registerShape('point', 'word-cloud', {
  draw(cfg: ShapeInfo, group: IGroup) {
    const cx = cfg.x as number;
    const cy = cfg.y as number;

    const shape = group.addShape('text', {
      attrs: {
        ...getTextAttrs(cfg),
        x: cx,
        y: cy,
      },
    });
    const rotate = (cfg.data as any).rotate;
    if (rotate) {
      Util.rotate(shape, (rotate * Math.PI) / 180);
    }

    return shape;
  },
});

// TODO: 去掉 any
function getTextAttrs(cfg: ShapeInfo): ShapeAttrs {
  return {
    ...cfg.defaultStyle,
    ...cfg.style,
    fontSize: (cfg.data as any).size,
    text: (cfg.data as any).text,
    textAlign: 'center',
    fontFamily: (cfg.data as any).font,
    fontWeight: (cfg.data as any).fontWeight,
    fill: cfg.color || cfg.defaultStyle?.stroke,
    textBaseline: 'alphabetic',
  };
}

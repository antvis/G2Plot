import { registerShape, Types, IGroup } from '@antv/g2';

registerShape('polygon', 'circle', {
  draw(cfg: Types.ShapeInfo, group: IGroup) {
    const cx = cfg.x as number;
    const cy = cfg.y as number;

    const points = this.parsePoints(cfg.points);
    const width = Math.abs(points[2].x - points[1].x);
    const height = Math.abs(points[1].y - points[0].y);
    const maxRadius = Math.min(width, height) / 2;

    const value = Number(cfg.shape[1]);
    const sizeRatio = Number(cfg.shape[2]);
    const radiusRatio = Math.sqrt(sizeRatio);
    const radius = maxRadius * radiusRatio * Math.sqrt(value);
    const fill = cfg.style?.fill || cfg.color || cfg.defaultStyle?.fill;
    const polygon = group.addShape('circle', {
      attrs: {
        x: cx,
        y: cy,
        r: radius,
        ...cfg.defaultStyle,
        ...cfg.style,
        fill,
      },
    });
    return polygon;
  },
});

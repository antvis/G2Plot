import { IGroup, registerShape, Types } from '@antv/g2';

registerShape('polygon', 'square', {
  draw(cfg: Types.ShapeInfo, group: IGroup) {
    const cx = cfg.x as number;
    const cy = cfg.y as number;

    const points = this.parsePoints(cfg.points);
    const width = Math.abs(points[2].x - points[1].x);
    const height = Math.abs(points[1].y - points[0].y);
    const maxSideLength = Math.min(width, height);

    const value = Number(cfg.shape[1]);
    const sizeRatio = Number(cfg.shape[2]);
    const lenRatio = Math.sqrt(sizeRatio);
    const sideLength = maxSideLength * lenRatio * Math.sqrt(value);
    const fill = cfg.style?.fill || cfg.color || cfg.defaultStyle?.fill;
    const polygon = group.addShape('rect', {
      attrs: {
        x: cx - sideLength / 2,
        y: cy - sideLength / 2,
        width: sideLength,
        height: sideLength,
        ...cfg.defaultStyle,
        ...cfg.style,
        fill,
      },
    });
    return polygon;
  },
});

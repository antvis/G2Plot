import { registerShape } from '@antv/g2';
import { ShapeInfo } from '@antv/g2/lib/interface';
import { IGroup } from '@antv/g2/lib/dependents';

registerShape('polygon', 'heatmap-square-size', {
  draw(cfg: ShapeInfo, group: IGroup) {
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

    const polygon = group.addShape('rect', {
      attrs: {
        x: cx - sideLength / 2,
        y: cy - sideLength / 2,
        width: sideLength,
        height: sideLength,
        fill: cfg.color,
        ...cfg.defaultStyle,
      },
    });
    return polygon;
  },
});

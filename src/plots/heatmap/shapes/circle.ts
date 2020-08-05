import { registerShape } from '@antv/g2';
import { ShapeInfo } from '@antv/g2/lib/interface';
import { IGroup } from '@antv/g2/lib/dependents';

const PADDING_FACTOR = 0.96;

registerShape('polygon', 'heatmap-circle-size', {
  draw(cfg: ShapeInfo, group: IGroup) {
    const cx = cfg.x as number;
    const cy = cfg.y as number;

    const points = this.parsePoints(cfg.points);
    const width = Math.abs(points[2].x - points[1].x);
    const height = Math.abs(points[1].y - points[0].y);
    const maxRadius = Math.min(width, height) / 2;

    const value = Number(cfg.shape[1]);
    const radius = maxRadius * PADDING_FACTOR * Math.sqrt(value);

    const polygon = group.addShape('circle', {
      attrs: {
        x: cx,
        y: cy,
        r: radius,
        fill: cfg.color,
        ...cfg.defaultStyle,
      },
    });
    return polygon;
  },
});

registerShape('polygon', 'heatmap-circle', {
  draw(cfg: ShapeInfo, group: IGroup) {
    const cx = cfg.x as number;
    const cy = cfg.y as number;

    const points = this.parsePoints(cfg.points);
    const width = Math.abs(points[2].x - points[1].x);
    const height = Math.abs(points[1].y - points[0].y);
    const maxRadius = Math.min(width, height) / 2;

    const polygon = group.addShape('circle', {
      attrs: {
        x: cx,
        y: cy,
        r: maxRadius * PADDING_FACTOR,
        fill: cfg.color,
        ...cfg.defaultStyle,
      },
    });
    return polygon;
  },
});

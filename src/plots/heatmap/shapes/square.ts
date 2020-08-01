import { registerShape } from '@antv/g2';
import { ShapeInfo } from '@antv/g2/lib/interface';
import { IGroup } from '@antv/g2/lib/dependents';

const PADDING_FACTOR = 0.96;

registerShape('polygon', 'heatmap-square-size', {
  draw(cfg: ShapeInfo, group: IGroup) {
    const cx = cfg.x as number;
    const cy = cfg.y as number;

    const points = this.parsePoints(cfg.points);
    const width = Math.abs(points[2].x - points[1].x);
    const height = Math.abs(points[1].y - points[0].y);
    const maxSideLength = Math.min(width, height);

    const value = Number(cfg.shape[1]);
    const sideLength = maxSideLength * value * PADDING_FACTOR;

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

registerShape('polygon', 'heatmap-square', {
  draw(cfg: ShapeInfo, group: IGroup) {
    const cx = cfg.x as number;
    const cy = cfg.y as number;

    const points = this.parsePoints(cfg.points);
    const width = Math.abs(points[2].x - points[1].x);
    const height = Math.abs(points[1].y - points[0].y);
    const maxSideLength = Math.min(width, height);

    const sideLength = maxSideLength * PADDING_FACTOR;

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

// TODO

//   getMarker(markerCfg: ShapeMarkerCfg) {
//     const { color } = markerCfg;
//     return {
//       symbol: 'square',
//       style: {
//         r: 4,
//         fill: color,
//       },
//     };
//   },

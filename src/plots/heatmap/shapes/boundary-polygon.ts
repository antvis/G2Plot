import { registerShape } from '@antv/g2';
import { isEmpty } from '@antv/util';
import { ShapeInfo } from '@antv/g2/lib/interface';
import { IGroup } from '@antv/g2/lib/dependents';

registerShape('polygon', 'heatmap-polygon-size', {
  draw(cfg: ShapeInfo, container: IGroup) {
    if (!isEmpty(cfg.points)) {
      const group = container.addGroup();
      const attrs = {
        stroke: '#fff',
        lineWidth: 1,
        fill: cfg.color,
        path: [],
      };
      const points = this.parsePoints(cfg.points);
      const path = [
        ['M', points[0].x, points[0].y],
        ['L', points[1].x, points[1].y],
        ['L', points[2].x, points[2].y],
        ['L', points[3].x, points[3].y],
        ['Z'],
      ];
      attrs.path = this.parsePath(path);
      group.addShape('path', {
        attrs,
      });

      return group;
    }
  },
});

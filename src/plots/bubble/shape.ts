import { registerShape } from '@antv/g2';
import { drawPoints } from '@antv/g2/lib/geometry/shape/point/util';
import { ShapeInfo, ShapeMarkerCfg } from '@antv/g2/lib/interface';
import { IGroup } from '@antv/g-base';

registerShape('point', 'bubble-point', {
  draw(cfg: ShapeInfo, container: IGroup) {
    const point = drawPoints(this, cfg, container, 'circle', false);
    // 如果用户未配置 stroke，气泡图 stroke 默认用 fill 颜色
    if (!cfg.style.stroke) {
      const fill = point.attr('fill');
      point.attr('stroke', fill);
    }
    return point;
  },
  getMarker(markerCfg: ShapeMarkerCfg) {
    const { color } = markerCfg;
    return {
      symbol: 'circle',
      style: {
        r: 4.5,
        fill: color,
      },
    };
  },
});

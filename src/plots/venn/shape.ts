import { IGroup } from '@antv/g-base';
import { registerShape, Types, Util } from '@antv/g2';
import { parsePathString } from '@antv/path-util';
import { get } from '@antv/util';
import { deepAssign } from '../../utils';
import { Datum, Point } from '../../types';
import { CustomInfo } from './types';
import { PATH_FIELD } from './constant';

/**
 * 获取填充属性
 * @param cfg 图形绘制数据
 */
function getFillAttrs(cfg: Types.ShapeInfo) {
  // style.fill 优先级更高
  return deepAssign({}, cfg.defaultStyle, { fill: cfg.color }, cfg.style);
}

registerShape('schema', 'venn', {
  draw(cfg: Types.ShapeInfo & { points: Point[]; nextPoints: Point[] }, container: IGroup) {
    const data = cfg.data as Datum;
    const segments = parsePathString(data[PATH_FIELD]);
    const fillAttrs = getFillAttrs(cfg);

    const group = container.addGroup({ name: 'venn-shape' });

    group.addShape('path', {
      attrs: {
        ...fillAttrs,
        path: segments,
      },
      name: 'venn-path',
    });

    const { offsetX, offsetY, label } = cfg.customInfo as CustomInfo;

    if (label !== false) {
      const formatter = get(label, 'formatter');
      const offsetX = get(label, 'offsetX', 0);
      const offsetY = get(label, 'offsetY', 0);
      group.addShape('text', {
        attrs: {
          ...label,
          ...get(label, 'style', { textAlign: 'center', fill: '#fff' }),
          x: data.x + offsetX,
          y: data.y + offsetY,
          text: formatter ? formatter(data) : `${data.id}: ${data.size}`,
        },
        name: 'venn-label',
      });
    }

    const matrix = Util.transform(null, [['t', offsetX, offsetY]]);
    group.setMatrix(matrix);

    return group;
  },
  getMarker(markerCfg: Types.ShapeMarkerCfg) {
    const { color } = markerCfg;
    return {
      symbol: 'circle',
      style: {
        lineWidth: 0,
        stroke: color,
        fill: color,
        r: 4,
      },
    };
  },
});

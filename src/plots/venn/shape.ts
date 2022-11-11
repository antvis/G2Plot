import { IGroup } from '@antv/g-base';
import { registerShape, Types, Util } from '@antv/g2';
import { parsePathString } from '@antv/path-util';
import { Datum, Point } from '../../types';
import { deepAssign } from '../../utils';
import { PATH_FIELD } from './constant';
import { CustomInfo } from './types';

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

    const { offsetX, offsetY } = cfg.customInfo as CustomInfo;

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

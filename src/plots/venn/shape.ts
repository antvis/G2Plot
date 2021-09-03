import { IGroup } from '@antv/g-base';
import { registerShape, Types, Util } from '@antv/g2';
import { parsePathString } from '@antv/path-util';
import { get } from '@antv/util';
import { deepAssign } from '../../utils';
import { Point } from '../../types';
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
    const segments = parsePathString(get(cfg.data, 'path', ''));
    const fillAttrs = getFillAttrs(cfg);

    const pathShape = container.addShape('path', {
      attrs: {
        ...fillAttrs,
        path: segments,
      },
    });

    const { offsetX, offsetY } = cfg.customInfo as CustomInfo;
    const matrix = Util.transform(null, [['t', offsetX, offsetY]]);
    pathShape.setMatrix(matrix);

    return pathShape;
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

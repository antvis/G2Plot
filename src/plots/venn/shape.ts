import { IGroup } from '@antv/g-base';
import { registerShape, Types } from '@antv/g2';
import { parsePathString } from '@antv/path-util';
import { get } from '@antv/util';
import { deepAssign } from '../../utils';
import { Point } from '../../types';

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

    // fix: G 无法识别 小写 m 命令，进行偏移（手动处理下）
    const path = [];
    segments.forEach((segment) => {
      if (segment[0] === 'm') {
        let prev = path.pop();
        if (prev && prev[0] === 'M') {
          const [, x, y] = prev;
          const [, x1, y1] = segment;
          prev = ['M', x + x1, y + y1];
        }
        path.push(prev);
      } else {
        path.push(segment);
      }
    });

    const pathShape = container.addShape('path', {
      attrs: {
        ...fillAttrs,
        path,
      },
    });
    return pathShape;
  },
});

import { IShape } from '@antv/g-base';
import { each } from '@antv/util';
import { isNodeOverlap } from './clear-overlapping';

/** 图形向上抖开并拉线 */
// todo 允许设置offset和拉线样式
export default function nodeJitterUpward(shape: IShape, option, index, cfg) {
  const nodes = cfg.nodes.nodes;
  if (index === 0) {
    return;
  }
  const current = nodes[index];
  const previous = nodes[index - 1];
  if (isNodeOverlap(current, previous)) {
    const element = cfg.plot.view.geometries[0].elements[0];
    const y = previous.top - current.height / 2;
    const offset = 10;
    if (y - offset > cfg.region.top) {
      // 取到label对应的element-shape
      const origin = current.shape.get('origin');
      const shapeId = element.getShapeId(origin);
      const shapes = element.getShapes();
      const shapeBbox = getShapeById(shapeId, shapes).get('box');
      const originX = shapeBbox.left + shapeBbox.width / 2;
      const originY = shapeBbox.top;
      // 拉线
      const container = element.get('labelController').labelsContainer;
      const labelLine = container.addShape('path', {
        attrs: {
          path: [
            ['M', originX, originY],
            ['L', current.shape.attr('x'), y],
          ],
          stroke: '#ccc',
          lineWidth: 1,
        },
      });
      /** 保存labelLine和label初始位置信息 */
      const origin_position = { x: shape.attr('x'), y: shape.attr('y') };
      // 更新标签位置，同步更新node
      current.shape.attr('y', y - offset);
      nodes[index] = cfg.nodes.measure(current.shape);
      nodes[index].line = labelLine;
      nodes[index].origin_position = origin_position;
    }
  }
}

function getShapeById(shapeId, shapes) {
  let target;
  each(shapes, (shape) => {
    const s = shape as IShape;
    const id = s.get('id');
    if (id === shapeId) {
      target = s;
    }
  });
  return target;
}

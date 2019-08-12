import { Shape } from '@antv/g';
import * as _ from '@antv/util';
import { isNodeOverlap } from './clearOverlapping';

/**图形向上抖开并拉线 */
//todo 允许设置offset和拉线样式
export default function nodeJitterUpward(shape: Shape, cfg, index, responsive) {
    const nodes = responsive.nodes.nodes;
    if (index === 0) {
      return;
    }
    const current = nodes[index];
    const previous = nodes[index - 1];
    if (isNodeOverlap(current, previous)) {
      const y = previous.top - current.height / 2;
      const offset = 10;
      if (y - offset > responsive.region.top) {
        //取到label对应的element-shape
        const origin = current.shape.get('origin');
        const shapeId = responsive.cfg.element.getShapeId(origin);
        const shapes = responsive.cfg.element.getShapes();
        const shapeBbox = getShapeById(shapeId, shapes).get('box');
        const originX = shapeBbox.left + shapeBbox.width / 2;
        const originY = shapeBbox.top;
        //拉线
        const container = responsive.cfg.labelsContainer;
        const labelLine = container.addShape('path', {
          attrs: {
            path: [
              ['M', originX, originY],
              ['L', current.shape.attr('x'), y]
            ],
            stroke: '#ccc',
            lineWidth: 1
          }
        });
        /**保存labelLine和label初始位置信息 */
        const origin_position = {x:shape.attr('x'),y:shape.attr('y')};
        //current.origin_position = {x:shape.attr('x'),y:shape.attr('y')};
        //更新标签位置，同步更新node
        current.shape.attr('y', y - offset);
        nodes[index] = responsive.nodes.measure(current.shape);
        nodes[index].line = labelLine;
        nodes[index].origin_position = origin_position;
      }
    }
  }
  
  function getShapeById(shapeId, shapes) {
    let target;
    _.each(shapes, (shape) => {
      const s = shape as Shape;
      const id = s.id;
      if (id === shapeId) {
        target = s;
      }
    });
    return target;
  }

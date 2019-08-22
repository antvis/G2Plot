import { Shape } from '@antv/g';
import { dotProduct2D } from '../../math';

/** 图形在水平或垂直方向抖开 */
export default function nodeJitter(shape: Shape, cfg, index, responsive) {
  const nodes = responsive.nodes.nodes;
  if (index === nodes.length - 1) {
    return;
  }
  const current = nodes[index];
  const next = nodes[index + 1];
  const { dir, distX, distY } = alignDirection(current, next);
  const startPoint = shape.get('startPoint');
  if (dir === 'x') {
    shape.attr('y', startPoint.y + 20);
  }
}

function alignDirection(nodeA, nodeB) {
  let dir;
  /** 计算两个node 中心点向量的角度 */
  const vector = { x: nodeB.centerX - nodeA.centerX, y: nodeB.centerY - nodeA.centerY };
  const mag = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
  const vector_horizontal = { x: 10, y: 0 }; // 水平方向向量
  /*tslint:disable*/
  const mag_horizontal = Math.sqrt(
    vector_horizontal.x * vector_horizontal.x + vector_horizontal.y * vector_horizontal.y
  );
  const dot = dotProduct2D(vector, vector_horizontal);
  let angle = ((dot / (mag * mag_horizontal)) * 180) / Math.PI;
  if (angle < 0) angle = 360 - angle;
  angle = adjustAngle(angle); // 将角度从0-360转换到0-90

  /** 计算两个node在x、y两个方向上的距离 */
  const distX = Math.abs(nodeA.centerX - nodeB.centerX);
  const distY = Math.abs(nodeA.centerY - nodeB.centerY);

  if (angle > 45) {
    dir = 'x';
  } else if (angle < 45) {
    dir = 'y';
  }

  return { dir, distX, distY };
}

function adjustAngle(angle) {
  if (angle > 90 && angle <= 180) {
    return 180 - angle;
  }
  if (angle > 180 && angle < 270) {
    return angle - 180;
  }
  return 360 - angle;
}

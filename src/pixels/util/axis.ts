import { DIRECTION, BBox } from '../type';

/**
 * 获取轴的位置范围
 */
export function getAxisRegion(pixelBBox: BBox, direction: string) {
  let start = null,
    end = null;
  const { x, y, width, height } = pixelBBox;

  // 计算四个顶点
  const corners = {
    leftTop: { x, y },
    rightTop: { x: x + width, y },
    leftBottom: { x, y: y + height },
    rightBottom: { x: x + width, y: y + height },
  };

  switch (direction) {
    case DIRECTION.TOP:
      start = corners.leftTop;
      end = corners.rightTop;
      break;
    case DIRECTION.RIGHT:
      start = corners.rightBottom;
      end = corners.rightTop;
      break;
    case DIRECTION.BOTTOM:
      start = corners.leftBottom;
      end = corners.rightBottom;
      break;
    case DIRECTION.LEFT:
      start = corners.leftBottom;
      end = corners.leftTop;
      break;
  }

  return { start, end };
}

/**
 * 获取轴的平移因子
 */
export function getVerticalFactor(direction: string) {
  let verticalFactor;
  if (direction === DIRECTION.TOP || direction === DIRECTION.LEFT) {
    verticalFactor = 1;
  } else if (direction === DIRECTION.RIGHT || direction === DIRECTION.BOTTOM) {
    verticalFactor = -1;
  }
  return verticalFactor;
}

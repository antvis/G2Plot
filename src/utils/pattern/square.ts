import { SquarePatternCfg } from '../../types/pattern';
import { deepAssign } from '../../utils';
import { drawBackground, initCanvas, getDots } from './dot';

/**
 * squarePattern 的 默认配置
 */
export const defaultSquarePatternCfg = {
  size: 4,
  padding: 4,
  backgroundColor: 'transparent',
  opacity: 1,
  rotation: 0,
  fill: '#FFF',
  fillOpacity: 1,
  stroke: 'transparent',
  lineWidth: 0,
  isStagger: true,
  mode: 'repeat',
};

/**
 * 计算贴图单元大小
 *
 * @param size 正方形的长
 * @param padding 圆点间隔
 * @param isStagger 是否交错
 * @reutrn 返回贴图单元大小
 */
export function getUnitPatternSize(size: number, padding: number, isStagger: boolean): number {
  // 如果交错, unitSize 放大两倍
  const unitSize = size + padding;
  return isStagger ? unitSize * 2 : unitSize;
}

/**
 * 绘制square
 *
 * @param context canvasContext
 * @param cfg squarePattern 的配置
 * @param x和y square的中心位置
 */
function drawSquare(context: CanvasRenderingContext2D, cfg: SquarePatternCfg, x: number, y: number) {
  const { stroke, size, fill, lineWidth, fillOpacity, rotation } = cfg;
  const radians = (rotation % 360) * (Math.PI / 180);

  context.globalAlpha = fillOpacity;
  context.strokeStyle = stroke;
  context.lineWidth = lineWidth;
  context.fillStyle = fill;

  // 控制旋转
  context.translate(x, y);
  context.rotate(radians);
  context.translate(-x, -y);
  context.strokeRect(x - size / 2, y - size / 2, size, size);
  // 因为正方形绘制从左上角开始，所以x，y做个偏移
  context.fillRect(x - size / 2, y - size / 2, size, size);
  // reset to identity matrix 重制成单位矩阵
  context.setTransform(1, 0, 0, 1, 0, 0);
}

/**
 * 创建 squarePattern
 */
export function createSquarePattern(cfg?: SquarePatternCfg): CanvasPattern {
  const squareCfg = deepAssign(defaultSquarePatternCfg, cfg);

  const { size, padding, isStagger } = squareCfg;

  // 计算 画布大小，squares的位置
  const unitSize = getUnitPatternSize(size, padding, isStagger);
  const squares = getDots(unitSize, isStagger); // 计算方法与 dots 一样

  // 初始化 patternCanvas
  const canvas = initCanvas(unitSize, unitSize);
  const ctx = canvas.getContext('2d');

  // 绘制 background，squares
  drawBackground(ctx, squareCfg, unitSize);
  for (const [x, y] of squares) {
    drawSquare(ctx, squareCfg, x, y);
  }

  return ctx.createPattern(canvas, squareCfg.mode);
}

import { SquarePatternCfg } from '../../types/pattern';
import { deepAssign } from '../../utils';
import {
  drawBackground,
  getPixelRatio,
  getSymbolsPosition,
  getUnitPatternSize,
  initCanvas,
  transformMatrix,
} from './util';

/**
 * squarePattern 的 默认配置
 */
export const defaultSquarePatternCfg = {
  size: 6,
  padding: 1,
  isStagger: true,
  backgroundColor: 'transparent',
  opacity: 1,
  rotation: 0,
  fill: '#fff',
  fillOpacity: 0.5,
  stroke: 'transparent',
  lineWidth: 0,
};

/**
 * 绘制square
 *
 * @param context canvasContext
 * @param cfg squarePattern 的配置
 * @param x和y square的中心位置
 */
export function drawSquare(context: CanvasRenderingContext2D, cfg: SquarePatternCfg, x: number, y: number) {
  const { stroke, size, fill, lineWidth, fillOpacity } = cfg;

  context.globalAlpha = fillOpacity;
  context.strokeStyle = stroke;
  context.lineWidth = lineWidth;
  context.fillStyle = fill;
  // 因为正方形绘制从左上角开始，所以x，y做个偏移
  context.strokeRect(x - size / 2, y - size / 2, size, size);
  context.fillRect(x - size / 2, y - size / 2, size, size);
}

/**
 * 创建 squarePattern
 */
export function createSquarePattern(cfg?: SquarePatternCfg): CanvasPattern {
  const squareCfg = deepAssign({}, defaultSquarePatternCfg, cfg);

  const { size, padding, isStagger, rotation } = squareCfg;

  // 计算 画布大小，squares的位置
  const unitSize = getUnitPatternSize(size, padding, isStagger);
  const squares = getSymbolsPosition(unitSize, isStagger); // 计算方法与 dots 一样

  // 初始化 patternCanvas
  const canvas = initCanvas(unitSize, unitSize);
  const ctx = canvas.getContext('2d');

  // 绘制 background，squares
  drawBackground(ctx, squareCfg, unitSize);
  for (const [x, y] of squares) {
    drawSquare(ctx, squareCfg, x, y);
  }

  const pattern = ctx.createPattern(canvas, 'repeat');

  if (pattern) {
    const dpr = getPixelRatio();
    const matrix = transformMatrix(dpr, rotation);
    pattern.setTransform(matrix);
  }

  return pattern;
}

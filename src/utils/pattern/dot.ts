import { DotPatternCfg } from '../../types/pattern';
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
 * dotPattern的默认配置
 */
export const defaultDotPatternCfg = {
  size: 6,
  padding: 2,
  backgroundColor: 'transparent',
  opacity: 1,
  rotation: 0,
  fill: '#fff',
  fillOpacity: 0.5,
  stroke: 'transparent',
  lineWidth: 0,
  isStagger: true,
};

/**
 * 绘制圆点
 *
 * @param context
 * @param cfg
 * @param x 圆点中心坐标x
 * @param y 圆点中心坐标y
 */
export function drawDot(context: CanvasRenderingContext2D, cfg: DotPatternCfg, x: number, y: number) {
  const { size, fill, lineWidth, stroke, fillOpacity } = cfg;

  context.beginPath();
  context.globalAlpha = fillOpacity;
  context.fillStyle = fill;
  context.strokeStyle = stroke;
  context.lineWidth = lineWidth;
  context.arc(x, y, size / 2, 0, 2 * Math.PI, false);
  context.fill();
  if (lineWidth) {
    context.stroke();
  }
  context.closePath();
}

/**
 * 创建 dot pattern，返回 HTMLCanvasElement
 *
 * @param cfg
 * @returns HTMLCanvasElement
 */
export function createDotPattern(cfg?: DotPatternCfg): CanvasPattern {
  const dotCfg = deepAssign({}, defaultDotPatternCfg, cfg);

  const { size, padding, isStagger, rotation } = dotCfg;

  // 计算 画布大小，dots的位置
  const unitSize = getUnitPatternSize(size, padding, isStagger);
  const dots = getSymbolsPosition(unitSize, isStagger);

  // 初始化 patternCanvas
  const canvas = initCanvas(unitSize, unitSize);
  const ctx = canvas.getContext('2d');

  // 绘制 background，dots
  drawBackground(ctx, dotCfg, unitSize);
  for (const [x, y] of dots) {
    drawDot(ctx, dotCfg, x, y);
  }

  const pattern = ctx.createPattern(canvas, 'repeat');

  if (pattern) {
    const dpr = getPixelRatio();
    const matrix = transformMatrix(dpr, rotation);
    pattern.setTransform(matrix);
  }

  return pattern;
}
